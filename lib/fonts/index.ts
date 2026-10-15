import { Geist, JetBrains_Mono } from "next/font/google";

/** Geist — headings and running text. */
export const geist = Geist({
  variable: "--font-geist",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * JetBrains Mono — labels, tags, metadata, numbers in drawings. Uppercase,
 * never under 11 px, never for sentences.
 */
export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

/** Convenience for the root layout. */
export const fontVariables = `${geist.variable} ${jetbrainsMono.variable}`;
