import { Caveat, Geist, JetBrains_Mono } from "next/font/google";

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

/**
 * Caveat — handwriting, only in the hero's paper sketch (`.cd-hand`). One
 * variable latin file, self-hosted by next/font. Not preloaded: the sketch
 * appears seconds after load, so it never competes with the headline.
 */
export const caveat = Caveat({
  variable: "--font-caveat",
  display: "swap",
  subsets: ["latin"],
  preload: false,
  fallback: ["Segoe Print", "Bradley Hand", "cursive"],
});

/** Convenience for the root layout. */
export const fontVariables = `${geist.variable} ${jetbrainsMono.variable} ${caveat.variable}`;
