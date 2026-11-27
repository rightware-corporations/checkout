"""Run OX-COD-02.E in a clean, disposable checkout; no deployment or paid CI."""
import hashlib
import json
import os
from pathlib import Path
import secrets
import shutil
import signal
import socket
import sqlite3
import subprocess
import sys
import tempfile
import time
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
os.chdir(ROOT)
OUT = Path(tempfile.mkdtemp(prefix="orderx-cod02-evidence-"))
SECRET = secrets.token_hex(24)
ENV = dict(os.environ, SELLER_PASSWORD=SECRET, ORDERX_REVIEW="1",
           ORDERX_EVIDENCE_DIR=str(OUT / "screens"), NEXT_TELEMETRY_DISABLED="1")
ENV.pop("NODE_ENV", None)
ENV.pop("ORDERX_MAQUETA", None)
RESULT = {"status": "IN_PROGRESS", "steps": {}, "head": None}


def command(args, name, timeout=600):
    with (OUT / (name + ".log")).open("w", encoding="utf-8") as log:
        result = subprocess.run(args, env=ENV, stdout=log,
                                stderr=subprocess.STDOUT, timeout=timeout)
    RESULT["steps"][name] = {"exit": result.returncode}
    if result.returncode:
        raise RuntimeError(name + " failed; see log")


def get(url, cookie=None):
    headers = {"Cookie": "seller=" + cookie} if cookie else {}
    try:
        with urlopen(Request(url, headers=headers), timeout=5) as response:
            return response.status, response.read().decode("utf-8", errors="replace")
    except HTTPError as error:
        return error.code, error.read().decode("utf-8", errors="replace")


def run_server(mode, db, work):
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
    base = f"http://127.0.0.1:{port}"
    ENV.update(CHECKOUT_DB=str(db), CHECKOUT_TEST_URL=base)
    with (OUT / (mode + "-server.log")).open("w", encoding="utf-8") as log:
        process = subprocess.Popen([NODE, "node_modules/next/dist/bin/next", mode,
                                    "--hostname", "127.0.0.1", "--port", str(port)],
                                   env=ENV, stdout=log, stderr=subprocess.STDOUT,
                                   start_new_session=os.name != "nt")
        try:
            for _ in range(120):
                if process.poll() is not None:
                    raise RuntimeError(mode + " server exited")
                try:
                    if get(base)[0] == 200:
                        break
                except OSError:
                    pass
                time.sleep(1)
            else:
                raise RuntimeError(mode + " readiness timeout")
            work(base)
        finally:
            if process.poll() is None:
                if os.name == "nt":
                    subprocess.run(["taskkill", "/PID", str(process.pid), "/T", "/F"],
                                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                else:
                    os.killpg(process.pid, signal.SIGTERM)
                try:
                    process.wait(timeout=15)
                except subprocess.TimeoutExpired:
                    if os.name != "nt":
                        os.killpg(process.pid, signal.SIGKILL)
                    else:
                        process.kill()
                    process.wait()


def production_check(base):
    # Seed only a disposable session; verify the real seller session is accepted.
    token = secrets.token_hex(32)
    with sqlite3.connect(ENV["CHECKOUT_DB"]) as conn:
        conn.execute("CREATE TABLE IF NOT EXISTS sessions (digest TEXT PRIMARY KEY, expires INTEGER NOT NULL)")
        conn.execute("INSERT INTO sessions VALUES (?,?)",
                     (hashlib.sha256(token.encode()).hexdigest(), int(time.time()*1000)+600000))
    status, body = get(base + "/gestao", token)
    assert status == 200 and "Visão geral de vendas" in body, "test session not accepted"
    for cookie in (None, token):
        status, body = get(base + "/gestao/revisao/amora/gestora", cookie)
        assert status == 404 and "ENC-1001" not in body, "production review not blocked"
    RESULT["steps"]["production-review-disabled"] = {"status": "PASS", "guest": 404, "seller": 404}


def dev_check(base):
    for name in ("checkout_browser", "review_foundation_browser"):
        command([sys.executable, "tests/" + name + ".py"], name)
    expected = {f"{screen}-{width}.png" for screen in ("C01", "B04", "C04a")
                for width in (390, 820, 1440)}
    actual = {p.name for p in (OUT / "screens").glob("*.png")}
    if actual != expected:
        raise RuntimeError("Expected nine screenshots; got " + str(sorted(actual)))
    RESULT["steps"]["screenshots"] = {"count": len(actual), "status": "CAPTURED_NOT_REVIEWED"}


try:
    NODE = shutil.which("node")
    npm = shutil.which("npm.cmd" if os.name == "nt" else "npm")
    if not NODE or not npm:
        raise RuntimeError("Node and npm are required")
    version = subprocess.check_output([NODE, "--version"], text=True).strip()
    RESULT["node"] = version
    if int(version.lstrip("v").split(".")[0]) < 24:
        raise RuntimeError("Node >=24 required; found " + version)
    RESULT["head"] = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
    if subprocess.check_output(["git", "status", "--porcelain"], text=True).strip():
        raise RuntimeError("Use a clean, dedicated checkout")
    if not (ROOT / "package-lock.json").is_file():
        raise RuntimeError("Missing package-lock.json")
    with tempfile.TemporaryDirectory(prefix="orderx-cod02-db-") as temporary:
        ENV["CHECKOUT_DB"] = str(Path(temporary) / "build.sqlite")
        command([sys.executable, "-c", "import playwright.sync_api"], "playwright-preflight")
        command([npm, "ci"], "npm-ci")
        command([NODE, "--test", "tests/review_foundation.test.mjs"], "unit-tests")
        command([npm, "run", "build"], "build")
        run_server("start", Path(temporary) / "production.sqlite", production_check)
        run_server("dev", Path(temporary) / "development.sqlite", dev_check)
        for name in ("maqueta_browser", "primeiro_link_browser"):
            command([sys.executable, "tests/" + name + ".py"], name)
    RESULT["status"] = "TECHNICAL_PASS_VISUAL_REVIEW_PENDING"
except Exception as error:
    RESULT["status"] = "BLOCKED_OR_FAILED"
    RESULT["error"] = str(error).replace(SECRET, "[redacted]")
finally:
    for log in OUT.glob("*.log"):
        data = log.read_bytes().replace(SECRET.encode(), b"[redacted]")
        log.write_bytes(data)
    RESULT["artifacts"] = {str(p.relative_to(OUT)): hashlib.sha256(p.read_bytes()).hexdigest()
                           for p in OUT.rglob("*") if p.is_file()}
    (OUT / "manifest.json").write_text(json.dumps(RESULT, indent=2), encoding="utf-8")
    bundle = shutil.make_archive(str(OUT), "zip", OUT)
    print(json.dumps(RESULT, indent=2))
    print("Evidence ZIP:", bundle)
sys.exit(0 if RESULT["status"] == "TECHNICAL_PASS_VISUAL_REVIEW_PENDING" else 1)
