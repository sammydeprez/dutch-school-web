import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dutch School Nairobi | Bilingual Dutch-English Education in Kenya",
  description: "Dutch School Nairobi offers bilingual Dutch and English education for children ages 1½-18 in Kenya. Recognized by the Dutch Education Abroad Foundation.",
  icons: {
    icon: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
};

// Root layout only passes children - locale layout handles html/body with correct lang
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
