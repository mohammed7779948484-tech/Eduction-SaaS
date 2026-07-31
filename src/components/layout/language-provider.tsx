"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Lang = "ar" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "map-lang";
const CHANGE_EVENT = "map-lang-change";

// --- external store (localStorage) via useSyncExternalStore ---
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "en" || v === "ar" ? v : "ar";
  } catch {
    return "ar";
  }
}

function getServerSnapshot(): Lang {
  return "ar";
}

/**
 * Bilingual provider. Arabic-first (default). Toggling to English flips the
 * document to LTR; Arabic restores RTL. All layout uses logical utilities so
 * the layout mirrors correctly in both directions (true RTL/LTR, per DOCX).
 * Full EN content polish is a documented gap (SOURCE_OF_TRUTH §7).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  // Sync <html lang/dir> — DOM mutation only, no setState (lint-safe).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return { lang: "ar" as Lang, setLang: () => {}, toggle: () => {} };
  }
  return ctx;
}

/** Helper to pick the active language string from a {ar, en} object. */
export function t<T extends { ar: string; en: string }>(obj: T, lang: Lang): string {
  return obj[lang];
}
