import type { Metadata, Viewport } from "next";
import { Cormorant, Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { site } from "@/site.config";
import "./globals.css";

/* The wordmark only — AURELIA is always Latin, so we can use the airy
   high-contrast serif from the business card without needing a Greek
   cut. (Greek serifs are all calligraphic; they read literary, not
   clinical, which is exactly wrong for this brand.) */
const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

/* Everything else — headings included. Full Greek cut, set extra-light
   and tight at display sizes. This follows the card's own typographic
   logic: serif logo, clean sans for the rest. */
const inter = Inter({
  subsets: ["latin", "greek"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Ποδολογικό κέντρο στον Περισσό. Θεραπευτικό πεντικιούρ, ονυχοκρύπτωση, ορθονυχία, μυκητίαση νυχιών και καθαρισμός κάλου — με ιατρική ακρίβεια.";

export const metadata: Metadata = {
  title: `${site.name} — ${site.subname.el} | Ποδολογικό Κέντρο Περισσός`,
  description,
  openGraph: {
    title: `${site.name} — ${site.subname.el}`,
    description,
    type: "website",
    locale: "el_GR",
  },
  icons: { icon: "/logo-mark.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1E9CA8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
