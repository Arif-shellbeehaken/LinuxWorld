import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

export const metadata: Metadata = {
  title: "Linux Zero to Hero | সম্পূর্ণ বাংলায় লিনাক্স শিখুন",
  description:
    "শূন্য থেকে হিরো — লেসন, লাইভ টার্মিনাল, প্র্যাকটিস, টাইমড পরীক্ষা, পয়েন্ট, র‍্যাংকিং ও অ্যাওয়ার্ড।",
  keywords: ["লিনাক্স", "Linux", "বাংলা", "টার্মিনাল", "Bash", "DevOps"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className="dark">
      <body className="min-h-screen antialiased">
        <SessionProvider>
          <ErrorBoundary>
            <Navbar />
            <main className="min-h-[70vh]">{children}</main>
            <Footer />
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}
