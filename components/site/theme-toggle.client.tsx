"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Light ↔ dark. The theme lives on `<html data-theme>` (set before paint by the
 * script in `app/[lang]/layout.tsx`), so the icons switch with CSS and this
 * component holds no state. The choice is saved; until then the system decides.
 */
export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center text-ink-muted transition-colors duration-150 hover:text-blueprint"
    >
      <Moon aria-hidden="true" size={20} strokeWidth={1.5} className="dark:hidden" />
      <Sun aria-hidden="true" size={20} strokeWidth={1.5} className="hidden dark:block" />
    </button>
  );
}
