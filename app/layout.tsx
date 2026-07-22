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
  description:
    "Transform your business with AI automation, modern websites, and digital solutions. Optiwebx helps businesses grow with cutting-edge technology.",

  keywords: [
    "AI Automation",
    "Web Development",
    "Next.js",
    "Shopify",
    "Digital Marketing",
    "SEO",
    "AI Agents",
    "Optiwebx",
  ],

  authors: [{ name: "Optiwebx" }],

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Optiwebx - AI Automation & Web Development Agency",
    description:
      "Transform your business with AI automation, modern websites, and digital solutions.",
    url: "https://optiwebx-website.vercel.app",
    siteName: "Optiwebx",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Optiwebx Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Optiwebx - AI Automation & Web Development Agency",
    description:
      "Transform your business with AI automation, modern websites, and digital solutions.",
    images: ["/icon.png"],
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
      <body className="min-h-full flex flex-col bg-black">
        {children}
      </body>
    </html>
  );
}