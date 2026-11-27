// ORDERX line icon vocabulary; shared by navigation, summaries and empty states.
const paths={
 home:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
 box:<><path d="M3 7 12 3l9 4v10l-9 4-9-4Z M3 7l9 4 9-4M12 11v10"/></>,
 link:<><path d="M10 13a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-2 2M14 11a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l2-2"/></>,
 orders:<><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6m-6 4h6m-6 4h4"/></>,
 people:<><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m3 9v-2a6 6 0 0 0-2-4"/></>,
 truck:<><path d="M2 5h12v12H2Zm12 4h4l4 4v4h-8"/><circle cx="6" cy="18" r="2" fill="currentColor" stroke="none"/><circle cx="18" cy="18" r="2" fill="currentColor" stroke="none"/></>,
 wallet:<><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 8V5l13-3 2 3M21 11h-5a2 2 0 0 0 0 4h5"/></>,
 chart:<><path d="M3 3v18h18M8 16v-5m5 5V7m5 9V4"/></>,
 settings:<><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M5 19l3-3m8-8 3-3"/></>,
 bell:<><path d="M5 10a7 7 0 0 1 14 0v4l2 3H3l2-3Zm5 10a2 2 0 0 0 4 0"/></>,
 task:<><rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 5-6"/></>,
 help:<><circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01"/></>,
 arrow:<><path d="M5 12h14m-6-6 6 6-6 6"/></>,
 chevron:<><path d="m6 9 6 6 6-6"/></>,
 exit:<><path d="M10 4H4v16h6m4-12 4 4-4 4m-6-4h10"/></>,
 clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></>,
 plus:<><path d="M12 5v14M5 12h14"/></>,
 shop:<><path d="M4 9v12h16V9M3 9l2-6h14l2 6M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 21v-7h6v7"/></>,
};
export function Glyph({name,size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]||paths.box}</svg>}
