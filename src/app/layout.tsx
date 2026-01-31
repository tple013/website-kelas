import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TPLE013 Class Website",
  description: "Professional landing page for TPLE013 class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen grid grid-rows-[auto_1fr_auto]`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
