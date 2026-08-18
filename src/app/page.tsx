import Link from "next/link";
import { modules, exercises, quizzes } from "@/data/modules";

export default function HomePage() {
  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Boot-style hero */}
      <section
        className="rounded-2xl border border-[var(--border)] p-6 sm:p-8"
        style={{
          background: "linear-gradient(135deg, var(--panel), var(--panel-2))",
        }}
      >
        <div className="term-dots mb-4">
          <span /><span /><span />
        </div>
        <pre className="boot-seq">{`$ whoami
learner@linux-zero-to-hero
$ cat welcome.txt
লিনাক্স জিরো টু হিরো — সম্পূর্ণ বাংলা প্ল্যাটফর্ম 🐧
$ echo "শূন্য থেকে হিরো — লেসন · টার্মিনাল · পরীক্ষা"`}</pre>
        <h1 className="mt-4 font-mono text-2xl font-bold text-[var(--text)] sm:text-3xl">
          Linux <span className="text-[var(--amber)]">Zero → Hero</span>
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
          স্টেপ-বাই-স্টেপ মডিউল, লাইভ টার্মিনাল প্লেগ্রাউন্ড, প্র্যাকটিস ল্যাব, টাইমড কুইজ,
          পয়েন্ট, র‍্যাংকিং ও অ্যাওয়ার্ড — সব এক সাইটে।
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/courses"
            className="rounded-[10px] bg-[var(--amber)] px-5 py-3 text-sm font-bold text-[#1a1206] no-underline hover:brightness-110"
          >
            মডিউল শুরু করুন →
          </Link>
          <Link
            href="/terminal"
            className="rounded-[10px] border border-[var(--border)] bg-[var(--panel-2)] px-5 py-3 text-sm font-semibold text-[var(--text)] no-underline hover:border-[var(--cyan)]"
          >
            💻 টার্মিনাল খুলুন
          </Link>
          <Link
            href="/register"
            className="rounded-[10px] border border-[var(--border)] px-5 py-3 text-sm text-[var(--muted)] no-underline hover:text-[var(--text)]"
          >
            অ্যাকাউন্ট তৈরি
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { n: modules.length, l: "মডিউল" },
          { n: lessonCount, l: "লেসন" },
          { n: exercises.length, l: "প্র্যাকটিস" },
          { n: quizzes.length, l: "পরীক্ষা" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4 text-center"
          >
            <div className="font-mono text-2xl font-bold text-[var(--cyan)]">{s.n}</div>
            <div className="mt-1 text-xs text-[var(--muted)]">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Outcomes */}
      <h2 className="mt-12 font-mono text-sm text-[var(--text)]">এই কোর্স শেষে আপনি যা পারবেন</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { icon: "🖥️", t: "যেকোনো লিনাক্স সার্ভার/টার্মিনালে confidently কাজ" },
          { icon: "📂", t: "ফাইল সিস্টেম, পারমিশন ও ইউজার ম্যানেজমেন্ট" },
          { icon: "📜", t: "নিজের bash স্ক্রিপ্ট লিখে কাজ অটোমেট" },
          { icon: "🛡️", t: "বেসিক সার্ভার সিকিউরিটি ও ফায়ারওয়াল" },
          { icon: "💻", t: "লাইভ টার্মিনালে নির্ভয়ে কমান্ড প্র্যাকটিস" },
          { icon: "🚀", t: "DevOps / Cloud / Security ফাউন্ডেশন" },
        ].map((o) => (
          <div
            key={o.t}
            className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-sm"
          >
            <span className="text-lg">{o.icon}</span>
            <span className="text-[var(--text)]">{o.t}</span>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <h2 className="mt-12 font-mono text-sm text-[var(--text)]">প্ল্যাটফর্ম ফিচার</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { href: "/courses", icon: "📚", title: "মডিউল ও লেসন", desc: "বিগিনার থেকে অ্যাডভান্সড — গভীর বাংলা কন্টেন্ট" },
          { href: "/terminal", icon: "💻", title: "লাইভ টার্মিনাল", desc: "VFS সিমুলেটর — pwd, ls, grep, স্ক্রিপ্ট… রিস্ক ছাড়া" },
          { href: "/exam", icon: "📝", title: "পরীক্ষা ও সার্টিফিকেট", desc: "মডিউল কুইজ, মিডটার্ম, ফাইনাল — সার্ভার-সাইড গ্রেডিং" },
        ].map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5 no-underline transition hover:border-[var(--cyan)]"
          >
            <div className="text-2xl">{f.icon}</div>
            <h3 className="mt-2 font-mono text-[15px] text-[var(--text)]">{f.title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
