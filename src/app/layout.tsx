import type { Metadata } from "next";
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

export const metadata: Metadata = {metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),

  title: "Eid Palm — Celebrate with Meaning",
  description:
    "A customizable Eid Palm with Zena ornaments and warm lighting—where tradition meets design and technology.",
  openGraph: {
    title: "Eid Palm — Celebrate with Meaning",
    description:
      "A customizable Eid Palm with Zena ornaments and warm lighting—where tradition meets design and technology.",
    url: "https://www.eidpalm.com",
    siteName: "Eid Palm",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Eid Palm" }],
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
