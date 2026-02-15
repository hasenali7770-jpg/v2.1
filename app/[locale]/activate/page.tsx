"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Locale, isLocale, t } from "@/lib/i18n";
import { useParams } from "next/navigation";

export default function ActivatePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;
  const tr = t(locale);
  
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleActivate = async () => {
    if (!code || code.length < 8) {
      alert("الرجاء إدخال كود صحيح");
      return;
    }

    setStatus("loading");
    
    // Simulate API call - replace with actual activation logic
    setTimeout(() => {
      if (code === "ALN-1A2B-3C4D") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  return (
    <Container className="py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-ink dark:text-night-text">{tr.activation.title}</h1>
        <p className="mt-3 text-muted dark:text-night-muted">{tr.activation.subtitle}</p>
      </div>

      <div className="mx-auto mt-10 max-w-md">
        <div className="rounded-3xl border border-stroke bg-white p-8 shadow-soft dark:border-night-stroke dark:bg-night-surface">
          {/* FIXED: Use form.label instead of label */}
          <label className="text-sm font-semibold text-ink dark:text-night-text">
            {tr.activation.form.label}
          </label>
          
          <input 
            value={code} 
            onChange={(e) => setCode(e.target.value.toUpperCase())} 
            placeholder="ALN-1A2B-3C4D"
            className="mt-2 w-full rounded-2xl border border-stroke bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand dark:border-night-stroke dark:bg-brand/10 dark:text-night-text" 
            disabled={status === "loading"}
          />
          
          {/* FIXED: Use form.button instead of button */}
          <button 
            onClick={handleActivate}
            disabled={status === "loading"}
            className={`mt-4 w-full rounded-2xl py-3 font-bold text-white transition ${
              status === "loading" 
                ? "bg-muted cursor-not-allowed" 
                : "bg-brand hover:opacity-90"
            }`}
          >
            {status === "loading" ? tr.activation.form.processing : tr.activation.form.button}
          </button>

          {/* Status messages */}
          {status === "success" && (
            <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
              {tr.activation.form.success}
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              {tr.activation.form.error}
            </div>
          )}

          <p className="mt-4 text-xs text-muted dark:text-night-muted">
            {tr.activation.hint}
          </p>

          <div className="mt-6 border-t border-stroke pt-4 text-center dark:border-night-stroke">
            <a 
              href={`/${locale}/contact`}
              className="text-sm text-brand hover:underline"
            >
              {tr.activation.needHelp}
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
