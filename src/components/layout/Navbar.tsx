"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const items = [
  { href: "/dashboard", icon: "🏠", label: "ড্যাশবোর্ড" },
  { href: "/courses", icon: "📚", label: "মডিউল" },
  { href: "/terminal", icon: "💻", label: "টার্মিনাল" },
  { href: "/practice", icon: "🧪", label: "প্র্যাকটিস" },
  { href: "/exam", icon: "📝", label: "পরীক্ষা" },
  { href: "/leaderboard", icon: "📈", label: "র‍্যাংকিং" },
  { href: "/profile", icon: "🎖️", label: "প্রোফাইল" },
];

export default function Navbar() {
  const path = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-20 border-b border-[var(--border)] px-4 py-3 sm:px-5"
      style={{ background: "rgba(22, 27, 36, 0.92)", backdropFilter: "blur(8px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link href="/" className="font-mono text-sm font-bold tracking-wide text-[var(--text)] no-underline">
          🐧 Linux <span className="text-[var(--amber)]">Zero → Hero</span>
        </Link>
        <div className="flex items-center gap-2">
          {session?.user && (
            <span className="pts-chip hidden sm:inline">⭐ লার্নার</span>
          )}
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-lg border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--text)]"
            >
              লগআউট
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-[var(--amber)] px-3 py-1.5 text-xs font-bold text-[#1a1206] no-underline"
            >
              লগইন
            </Link>
          )}
          <button
            className="rounded-lg border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-1.5 text-sm text-[var(--text)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="মেনু"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <div
        className={`mx-auto mt-2 max-w-6xl flex-wrap gap-1 ${open ? "flex" : "hidden"} md:flex`}
      >
        {items.map((it) => {
          const active = path === it.href || path.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] no-underline transition ${
                active
                  ? "bg-[var(--cyan)] font-semibold text-[var(--ink)]"
                  : "text-[var(--muted)] hover:border-[var(--border)] hover:text-[var(--text)]"
              }`}
            >
              <span>{it.icon}</span>
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
