import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted so the build does not depend on Google Fonts being reachable.
const rubik = localFont({
  src: "./fonts/rubik-latin-variable.woff2",
  variable: "--font-rubik",
  weight: "300 700",
});

const archivo = localFont({
  src: "./fonts/archivo-latin-variable.woff2",
  variable: "--font-archivo",
  weight: "300 700",
});

export const metadata: Metadata = {
  title: "Dutch School Nairobi | Bilingual Dutch-English Education in Kenya",
  description: "Dutch School Nairobi offers bilingual Dutch and English education for children ages 1½-18 in Kenya. Recognized by the Dutch Education Abroad Foundation.",
  icons: {
    icon: '/logo-icon-color.png',
    apple: '/logo-icon-color.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${rubik.variable} ${archivo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
