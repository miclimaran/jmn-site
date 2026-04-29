export type Lang = "en" | "id" | "vi" | "ar" | "th";

export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE_NAME = "jmn-lang";

export const LANGS: Array<{
  code: Lang;
  label: string;
  flag: string;
  flagCode: "gb" | "id" | "vn" | "sa" | "th";
  dir: "ltr" | "rtl";
}> = [
  { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}", flagCode: "gb", dir: "ltr" },
  { code: "id", label: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}", flagCode: "id", dir: "ltr" },
  { code: "vi", label: "Tieng Viet", flag: "\u{1F1FB}\u{1F1F3}", flagCode: "vn", dir: "ltr" },
  { code: "ar", label: "Arabic", flag: "\u{1F1F8}\u{1F1E6}", flagCode: "sa", dir: "rtl" },
  { code: "th", label: "Thai", flag: "\u{1F1F9}\u{1F1ED}", flagCode: "th", dir: "ltr" },
];

export const isLang = (value: string): value is Lang =>
  LANGS.some((item) => item.code === value);

export const getDir = (lang: Lang): "ltr" | "rtl" =>
  LANGS.find((item) => item.code === lang)?.dir ?? "ltr";
