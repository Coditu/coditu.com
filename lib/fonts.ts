import { Geist, JetBrains_Mono } from "next/font/google";

/** Geist — headings and running text. */
const geist = Geist({
  variable: "--font-geist",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * JetBrains Mono — labels, tags, metadata, numbers in drawings. Uppercase,
 * never under 11 px, never for sentences.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const fontVariables = `${geist.variable} ${jetbrainsMono.variable}`;
