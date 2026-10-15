"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonClasses } from "@/components/ui/button";

/** Below `lg`: the nav links in a sheet under the bar, full-width 44 px rows. */
export function MobileMenu({
  links,
  booking,
  labels,
}: {
  links: { href: string; label: string }[];
  booking: { href: string; label: string };
  labels: { open: string; close: string; nav: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen(!open)}
        className={buttonClasses({ variant: "outline" }, "size-11 px-0")}
      >
        {open ? <X aria-hidden className="size-5" strokeWidth={1.5} /> : <Menu aria-hidden className="size-5" strokeWidth={1.5} />}
      </button>

      <nav
        id="mobile-menu"
        aria-label={labels.nav}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper"
      >
        <ul className="mx-auto max-w-page px-4 py-2 sm:px-6 md:px-8">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line last:border-b-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-[15px] font-medium text-ink hover:text-blueprint"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-auto max-w-page px-4 pb-4 sm:px-6 md:px-8">
          <a href={booking.href} className={buttonClasses({ variant: "outline" }, "w-full")}>
            {booking.label}
          </a>
        </div>
      </nav>
    </div>
  );
}
