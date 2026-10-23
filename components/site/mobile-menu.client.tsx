"use client";

import { Menu, X } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";

/**
 * Below `lg`: the nav links in a sheet under the 64 px bar, full-width 44 px
 * rows. A native popover: Escape, clicking outside and the button's expanded
 * state come from the browser. A link only jumps within the page, so it closes
 * the sheet itself.
 */
export function MobileMenu({
  links,
  booking,
  label,
}: {
  links: { href: string; label: string }[];
  booking: { href: string; label: string };
  label: string;
}) {
  const close = () => document.getElementById("mobile-menu")?.hidePopover();

  return (
    <div className="group lg:hidden">
      <button
        type="button"
        popoverTarget="mobile-menu"
        aria-label={label}
        className={buttonClasses({ variant: "outline" }, "size-11 px-0")}
      >
        <Menu aria-hidden className="size-5 group-has-[:popover-open]:hidden" strokeWidth={1.5} />
        <X aria-hidden className="hidden size-5 group-has-[:popover-open]:block" strokeWidth={1.5} />
      </button>

      <nav
        id="mobile-menu"
        popover="auto"
        aria-label={label}
        className="inset-x-0 top-16 bottom-auto m-0 h-auto w-full max-w-none border-0 border-b border-line bg-paper p-0 text-ink"
      >
        <ul className="mx-auto max-w-page px-4 py-2 sm:px-6 md:px-8">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line last:border-b-0">
              <a
                href={link.href}
                onClick={close}
                className="flex min-h-11 items-center text-[15px] font-medium text-ink hover:text-blueprint"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-auto max-w-page px-4 pb-4 sm:px-6 md:px-8">
          <a href={booking.href} onClick={close} className={buttonClasses({ variant: "outline" }, "w-full")}>
            {booking.label}
          </a>
        </div>
      </nav>
    </div>
  );
}
