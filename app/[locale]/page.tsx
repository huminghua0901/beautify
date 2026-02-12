"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ReportView } from "@/components/report-view";
import { Locale, t } from "@/lib/i18n";

export default function HomePage() {
  const params = useParams<{ locale: Locale }>();
  const locale = (params?.locale || "zh-CN") as Locale;
  const [result, setResult] = useState<{ id: string; partial: string; full: string; unlocked: boolean } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("floorplan") as File;
    const location = String(form.get("location") || "");
    const residents = Number(form.get("residents") || 1);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = String(reader.result).split(",")[1] || "";
      const resp = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, location, residents })
      });
      const json = await resp.json();
      setResult(json);
    };
    reader.readAsDataURL(file);
  }

  return (
    <main className="container">
      <nav>
        <strong>{t(locale, "title")}</strong>
        <LanguageSwitcher label={t(locale, "language")} />
      </nav>
      <p>{t(locale, "subtitle")}</p>
      <form onSubmit={onSubmit} className="card">
        <label>{t(locale, "upload")}</label>
        <input name="floorplan" type="file" accept="image/*" required />
        <label>{t(locale, "location")}</label>
        <input name="location" required />
        <label>{t(locale, "residents")}</label>
        <input name="residents" type="number" min={1} max={20} defaultValue={3} required />
        <button type="submit">{t(locale, "analyze")}</button>
      </form>

      {result && <ReportView partial={result.partial} full={result.full} unlocked={result.unlocked} />}

      {result && (
        <div id="pay" className="card">
          <button
            onClick={async () => {
              const resp = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reportId: result.id })
              });
              const json = await resp.json();
              if (json.url) window.location.href = json.url;
            }}
          >
            {t(locale, "unlock")}
          </button>
        </div>
      )}

      <div className="footer">
        <a href={`/${locale}/legal/terms`}>{t(locale, "terms")}</a>
        <a href={`/${locale}/legal/privacy`}>{t(locale, "privacy")}</a>
        <a href={`/${locale}/legal/faq`}>{t(locale, "faq")}</a>
        <a href={`/${locale}/legal/disclaimer`}>{t(locale, "disclaimer")}</a>
      </div>
    </main>
  );
}
