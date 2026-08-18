import Terminal from "@/components/terminal/Terminal";

export default function TerminalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-mono text-2xl font-bold text-[var(--text)]">
        💻 টার্মিনাল প্লেগ্রাউন্ড
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        যেকোনো লিনাক্স কমান্ড নির্ভয়ে চেষ্টা করুন — সম্পূর্ণ সিমুলেটেড VFS, কিছু ভাঙার ভয় নেই।
        <span className="ml-2 font-mono text-xs">↑↓ হিস্টরি · help</span>
      </p>
      <div className="mt-6">
        <Terminal />
      </div>
      <div className="mt-6 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
        <p>
          <code className="text-[var(--amber)]">pwd</code>,{" "}
          <code className="text-[var(--amber)]">ls -la</code>,{" "}
          <code className="text-[var(--amber)]">cd</code>,{" "}
          <code className="text-[var(--amber)]">mkdir</code>,{" "}
          <code className="text-[var(--amber)]">cat</code>
        </p>
        <p>
          <code className="text-[var(--amber)]">grep</code>,{" "}
          <code className="text-[var(--amber)]">echo hi &gt; f</code>,{" "}
          <code className="text-[var(--amber)]">tree</code>,{" "}
          <code className="text-[var(--amber)]">uname</code>
        </p>
      </div>
    </div>
  );
}
