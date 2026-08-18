import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--panel)]">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="font-mono text-sm font-bold text-[var(--text)]">
            🐧 Linux <span className="text-[var(--amber)]">Zero → Hero</span>
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            সম্পূর্ণ বাংলায় লিনাক্স — লেসন, টার্মিনাল, পরীক্ষা, র‍্যাংকিং।
          </p>
        </div>
        <div>
          <h4 className="font-mono text-xs text-[var(--muted)]">লিংক</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/courses" className="text-[var(--muted)] no-underline hover:text-[var(--cyan)]">মডিউল</Link></li>
            <li><Link href="/terminal" className="text-[var(--muted)] no-underline hover:text-[var(--cyan)]">টার্মিনাল</Link></li>
            <li><Link href="/exam" className="text-[var(--muted)] no-underline hover:text-[var(--cyan)]">পরীক্ষা</Link></li>
            <li><Link href="/leaderboard" className="text-[var(--muted)] no-underline hover:text-[var(--cyan)]">র‍্যাংকিং</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs text-[var(--muted)]">বৈশিষ্ট্য</h4>
          <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
            <li>লাইভ VFS টার্মিনাল</li>
            <li>সার্ভার-সাইড কুইজ গ্রেডিং</li>
            <li>পয়েন্ট · ব্যাজ · লিডারবোর্ড</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-4 text-center font-mono text-xs text-[var(--muted)]">
        Linux Zero to Hero · বাংলা লার্নিং প্ল্যাটফর্ম
      </div>
    </footer>
  );
}
