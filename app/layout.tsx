import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
});

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "การ์ดเชิญงานอุปสมบท",
  description: "ขอเรียนเชิญร่วมเป็นเกียรติในงานอุปสมบท",
  openGraph: {
    title: "การ์ดเชิญงานอุปสมบท",
    description: "ขอเรียนเชิญร่วมเป็นเกียรติในงานอุปสมบท",
    type: "website",
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
      className={`${notoSansThai.variable} ${notoSerifThai.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
