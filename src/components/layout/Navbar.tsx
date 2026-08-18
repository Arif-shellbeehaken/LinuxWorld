"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "হোম" },
  { href: "/courses", label: "কোর্স" },
  { href: "/practice", label: "প্র্যাকটিস" },
  { href: "/exam", label: "পরীক্ষা" },
  { href: "/dashboard", label: "ড্যাশবোর্ড" },
  { href: "/leaderboard", label: "র‍্যাঙ্কিং" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setPoints(null);
      return;
    }
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.totalPoints !== undefined) setPoints(d.totalPoints);
      })
      .catch(() => {});
  }, [status, pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
          <span className="text-2xl">🐧</span>
          <span className="hidden sm:inline text-lg">Linux Zero to Hero</span>
          <span className="sm:hidden text-lg">LZH</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {status === "authenticated" ? (
            <>
              {points !== null && (
                <div className="hidden sm:flex flex-col items-end text-xs">
                  <span className="font-semibold text-emerald-600">{points} পয়েন্ট</span>
                  <span className="text-slate-500">{session.user?.name}</span>
                </div>
              )}
              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                title={session.user?.name ?? "Profile"}
              >
                {(session.user?.name ?? "আ").charAt(0)}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden sm:inline rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                লগআউট
              </button>
            </>
          ) : status === "loading" ? (
            <span className="text-xs text-slate-400">...</span>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                লগইন
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
              >
                রেজিস্টার
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex md:hidden overflow-x-auto border-t border-slate-100 px-2 py-1 dark:border-slate-800">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium",
              pathname === item.href ? "bg-emerald-50 text-emerald-700" : "text-slate-600"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
