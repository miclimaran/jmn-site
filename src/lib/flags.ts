export type FlagCode =
  | "gb"
  | "id"
  | "vn"
  | "sa"
  | "th"
  | "sg"
  | "my"
  | "ph"
  | "ae"
  | "qa"
  | "eg"
  | "ke"
  | "ng"
  | "za"
  | "in"
  | "lk"
  | "pk"
  | "pe"
  | "cl";

const svgToDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const flagSvgs: Record<FlagCode, string> = {
  gb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#012169" d="M0 0h60v40H0z"/><path stroke="#fff" stroke-width="8" d="m0 0 60 40M60 0 0 40"/><path stroke="#C8102E" stroke-width="4.5" d="m0 0 60 40M60 0 0 40"/><path stroke="#fff" stroke-width="13" d="M30 0v40M0 20h60"/><path stroke="#C8102E" stroke-width="8" d="M30 0v40M0 20h60"/></svg>`,
  id: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#ce1126" d="M0 0h60v20H0z"/><path fill="#fff" d="M0 20h60v20H0z"/></svg>`,
  vn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#da251d" d="M0 0h60v40H0z"/><path fill="#ff0" d="m30 8 3.5 10.8H45l-9.3 6.7 3.6 10.7L30 29.6l-9.3 6.6 3.6-10.7-9.3-6.7h11.5z"/></svg>`,
  sa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#006c35" d="M0 0h60v40H0z"/><path fill="#fff" d="M12 25h36v3H12zM16 14h28v5H16z"/></svg>`,
  th: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#a51931" d="M0 0h60v40H0z"/><path fill="#fff" d="M0 6h60v28H0z"/><path fill="#2d2a4a" d="M0 12h60v16H0z"/></svg>`,
  sg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#ef3340" d="M0 0h60v20H0z"/><path fill="#fff" d="M0 20h60v20H0z"/><circle cx="16" cy="10" r="7" fill="#fff"/><circle cx="19" cy="10" r="6" fill="#ef3340"/><path fill="#fff" d="m28 5 1 2.7h3l-2.4 1.7.9 2.8-2.5-1.7-2.5 1.7.9-2.8L24 7.7h3z"/></svg>`,
  my: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#fff" d="M0 0h60v40H0z"/><path stroke="#cc0001" stroke-width="4" d="M0 2h60M0 10h60M0 18h60M0 26h60M0 34h60"/><path fill="#010066" d="M0 0h30v22H0z"/><circle cx="14" cy="11" r="7" fill="#fc0"/><circle cx="17" cy="11" r="6" fill="#010066"/><path fill="#fc0" d="m23 6 1.2 3.4h3.6L25 11.5l1 3.5-3-2.1-3 2.1 1-3.5-2.8-2.1h3.6z"/></svg>`,
  ph: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#0038a8" d="M0 0h60v20H0z"/><path fill="#ce1126" d="M0 20h60v20H0z"/><path fill="#fff" d="m0 0 28 20L0 40z"/><circle cx="10" cy="20" r="4" fill="#fcd116"/></svg>`,
  ae: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#00732f" d="M0 0h60v13.33H0z"/><path fill="#fff" d="M0 13.33h60v13.34H0z"/><path fill="#000" d="M0 26.67h60V40H0z"/><path fill="#f00" d="M0 0h16v40H0z"/></svg>`,
  qa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#8a1538" d="M0 0h60v40H0z"/><path fill="#fff" d="M0 0h18l-6 2.2 6 2.2-6 2.2 6 2.2-6 2.2 6 2.2-6 2.2 6 2.2-6 2.2 6 2.2-6 2.2 6 2.2-6 2.2 6 2.2-6 2.2 6 2.2-6 2.2 6 2.2H0z"/></svg>`,
  eg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#ce1126" d="M0 0h60v13.33H0z"/><path fill="#fff" d="M0 13.33h60v13.34H0z"/><path fill="#000" d="M0 26.67h60V40H0z"/><circle cx="30" cy="20" r="3" fill="#c09300"/></svg>`,
  ke: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#000" d="M0 0h60v12H0z"/><path fill="#fff" d="M0 12h60v2H0z"/><path fill="#bb0000" d="M0 14h60v12H0z"/><path fill="#fff" d="M0 26h60v2H0z"/><path fill="#006600" d="M0 28h60v12H0z"/><ellipse cx="30" cy="20" rx="5" ry="9" fill="#bb0000" stroke="#fff" stroke-width="1.5"/></svg>`,
  ng: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#008751" d="M0 0h20v40H0zM40 0h20v40H40z"/><path fill="#fff" d="M20 0h20v40H20z"/></svg>`,
  za: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#002395" d="M0 0h60v40H0z"/><path fill="#de3831" d="M0 0h60v18H0z"/><path fill="#fff" d="M0 0 30 20 0 40z"/><path fill="#007a4d" d="M0 4 24 20 0 36z"/><path fill="#ffb612" d="M0 8 18 20 0 32z"/><path fill="#000" d="M0 11 14 20 0 29z"/></svg>`,
  in: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#ff9933" d="M0 0h60v13.33H0z"/><path fill="#fff" d="M0 13.33h60v13.34H0z"/><path fill="#138808" d="M0 26.67h60V40H0z"/><circle cx="30" cy="20" r="5" fill="none" stroke="#000080" stroke-width="1.5"/></svg>`,
  lk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#ffbe29" d="M0 0h60v40H0z"/><path fill="#00534e" d="M5 5h8v30H5z"/><path fill="#eb7400" d="M13 5h8v30h-8z"/><path fill="#8d153a" d="M25 5h30v30H25z"/></svg>`,
  pk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#fff" d="M0 0h15v40H0z"/><path fill="#01411c" d="M15 0h45v40H15z"/><circle cx="36" cy="20" r="9" fill="#fff"/><circle cx="39" cy="18" r="8" fill="#01411c"/><path fill="#fff" d="m45 10 1.4 4.2h4.4l-3.6 2.6 1.4 4.2-3.6-2.6-3.6 2.6 1.4-4.2-3.6-2.6h4.4z"/></svg>`,
  pe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#d91023" d="M0 0h20v40H0zM40 0h20v40H40z"/><path fill="#fff" d="M20 0h20v40H20z"/></svg>`,
  cl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path fill="#fff" d="M0 0h60v20H0z"/><path fill="#d52b1e" d="M0 20h60v20H0z"/><path fill="#0039a6" d="M0 0h24v20H0z"/><path fill="#fff" d="m12 4 1.4 4.3h4.5l-3.6 2.6 1.4 4.3-3.7-2.7-3.7 2.7 1.4-4.3-3.6-2.6h4.5z"/></svg>`,
};

export const getFlagSrc = (code: FlagCode) => svgToDataUri(flagSvgs[code]);
