import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display"
});

export const metadata: Metadata = {
  title: "Aura Global Concierge",
  description: "Ultra-luxury private access to aviation, estates, and lifestyle."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
