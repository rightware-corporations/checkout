import "@/frontend/styles/global.css";
export const metadata = {
  title: "Encomendas",
  robots: { index: false, follow: false },
};
export default function Layout({ children }) {
  return (
    <html lang="pt-MZ">
      <body>{children}</body>
    </html>
  );
}
