import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Optiwebx - AI Automation & Web Development Agency",
  description: "Transform your business with AI automation, modern websites, and digital solutions. Optiwebx helps businesses grow with cutting-edge technology.",
  keywords: "AI automation, web development, digital marketing, Shopify, Next.js, AI agents",
  authors: [{ name: "Optiwebx" }],
  openGraph: {
    title: "Optiwebx - AI Automation & Web Development Agency",
    description: "Transform your business with AI automation, modern websites, and digital solutions.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}