import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai, Cormorant_Garamond } from "next/font/google";
import { invitation } from "@/data/invitation";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
});

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const title = `การ์ดเชิญงานอุปสมบท · ${invitation.nakName}`;
const description = `${invitation.eventDate} ${invitation.templeOrVenue}`;
const ogImage = {
  url: invitation.photo,
  width: 1024,
  height: 1536,
  alt: invitation.nakName,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "th_TH",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [invitation.photo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoSansThai.variable} ${notoSerifThai.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
