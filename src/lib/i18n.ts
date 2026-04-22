export type Lang = "en" | "id" | "vi" | "ar" | "th";

export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE_NAME = "jmn-lang";

export const LANGS: Array<{
  code: Lang;
  label: string;
  flag: string;
  dir: "ltr" | "rtl";
}> = [
  { code: "en", label: "English", flag: "", dir: "ltr" },
  { code: "id", label: "Indonesia", flag: "", dir: "ltr" },
  { code: "vi", label: "Tieng Viet", flag: "", dir: "ltr" },
  { code: "ar", label: "Arabic", flag: "", dir: "rtl" },
  { code: "th", label: "Thai", flag: "", dir: "ltr" },
];

export const isLang = (value: string): value is Lang =>
  LANGS.some((item) => item.code === value);

export const getDir = (lang: Lang): "ltr" | "rtl" =>
  LANGS.find((item) => item.code === lang)?.dir ?? "ltr";
