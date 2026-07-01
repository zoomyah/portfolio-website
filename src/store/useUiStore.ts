import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale, Theme } from "@/shared/types";

interface UiState {
  locale: Locale;
  theme: Theme;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.style.colorScheme = theme;
}

function applyLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "ar" ? "rtl" : "ltr";
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      locale: "en",
      theme: "dark",
      setLocale: (l) => {
        applyLocale(l);
        set({ locale: l });
      },
      toggleLocale: () => {
        const next: Locale = get().locale === "en" ? "ar" : "en";
        applyLocale(next);
        set({ locale: next });
      },
      setTheme: (t) => {
        applyTheme(t);
        set({ theme: t });
      },
      toggleTheme: () => {
        const next: Theme = get().theme === "dark" ? "light" : "dark";
        applyTheme(next);
        set({ theme: next });
      },
    }),
    {
      name: "portfolio-ui",
      partialize: (s) => ({ locale: s.locale, theme: s.theme }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        applyTheme(state.theme);
        applyLocale(state.locale);
      },
    }
  )
);
