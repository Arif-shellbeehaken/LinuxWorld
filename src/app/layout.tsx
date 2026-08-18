import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Linux Zero to Hero | সম্পূর্ণ বাংলায় লিনাক্স শিখুন",
  description:
    "শূন্য থেকে হিরো পর্যন্ত লিনাক্স শেখার সম্পূর্ণ প্ল্যাটফর্ম। লেসন, প্র্যাকটিস, পরীক্ষা, পয়েন্ট, র‍্যাঙ্কিং ও অ্যাওয়ার্ড — সব এক জায়গায়।",
  keywords: ["লিনাক্স", "Linux", "বাংলা", "শেখা", "টার্মিনাল", "Bash", "DevOps"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <SessionProvider>
          <ErrorBoundary>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}
