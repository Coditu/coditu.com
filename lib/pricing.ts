import { getMessages, type Locale } from "@/lib/i18n";
import { PRICES, SHOW_PRICES } from "@/lib/site-config";

/**
 * Replaces `{{price:webPart}}` / `{{price:change}}` tokens in `text` with our
 * starting prices, or the locale's „Preis auf Anfrage“ / "Price on request"
 * while `SHOW_PRICES` is off. The one place that formats a price, so the blog
 * and the FAQ (or anything else that prices) read the same number the same way.
 */
export function withPrices(locale: Locale, text: string): string {
  const t = getMessages(locale).blog;
  const euro = (amount: number) =>
    new Intl.NumberFormat(getMessages(locale).locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);

  return text.replace(/\{\{price:(webPart|change)\}\}/g, (_, key: keyof typeof PRICES) =>
    SHOW_PRICES ? t.prices[key].replace("{price}", euro(PRICES[key])) : t.prices.onRequest
  );
}
