import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Browse and favorite photos from our collection",
  generator: "react, next.js",
  icons: {
    icon: [
      {
        url: "/gall.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/gall.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/gall.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
