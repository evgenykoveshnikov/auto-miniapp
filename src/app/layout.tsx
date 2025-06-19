import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const interSans = Inter({
  weight: ['400', '700'],
  variable: "--font-inter",
  subsets: ['cyrillic'],
  style: 'normal',
});

export const metadata: Metadata = {
  title: "Mini auto app",
  description: "Mini app auto sell",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        
      </body>
    </html>
  );
}
