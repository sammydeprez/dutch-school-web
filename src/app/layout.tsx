import type { Metadata } from "next";
import { Rubik, Archivo } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
