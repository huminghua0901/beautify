"use client";

import { usePathname } from "next/navigation";

export function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname();
  const nextLocale = pathname.startsWith("/zh-CN") ? "en" : "zh-CN";
  const nextPath = pathname.replace(/^\/(zh-CN|en)/, `/${nextLocale}`);

  return <a href={nextPath || `/${nextLocale}`}>{label}</a>;
}
