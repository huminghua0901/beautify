import zhCN from "@/messages/zh-CN.json";
import en from "@/messages/en.json";

export const locales = ["zh-CN", "en"] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  "zh-CN": zhCN,
  en
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries["zh-CN"];
}

export function t(locale: Locale, key: keyof typeof zhCN): string {
  return getDictionary(locale)[key] ?? key;
}
