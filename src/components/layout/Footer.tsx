import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-emerald-700">
              <span className="text-xl">🐧</span>
              Linux Zero to Hero
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              সম্পূর্ণ বাংলায় লিনাক্স শেখার একমাত্র প্ল্যাটফর্ম। শূন্য থেকে হিরো পর্যন্ত।
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">দ্রুত লিংক</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/courses" className="hover:text-emerald-600">সব কোর্স</Link></li>
              <li><Link href="/practice" className="hover:text-emerald-600">প্র্যাকটিস ল্যাব</Link></li>
              <li><Link href="/exam" className="hover:text-emerald-600">পরীক্ষা দিন</Link></li>
              <li><Link href="/leaderboard" className="hover:text-emerald-600">লিডারবোর্ড</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">বৈশিষ্ট্য</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>✅ স্টেপ-বাই-স্টেপ লেসন</li>
              <li>✅ হ্যান্ডস-অন প্র্যাকটিস</li>
              <li>✅ কুইজ ও পরীক্ষা</li>
              <li>✅ পয়েন্ট, র‍্যাঙ্ক ও অ্যাওয়ার্ড</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800">
          © {new Date().getFullYear()} Linux Zero to Hero · সব অধিকার সংরক্ষিত · সম্পূর্ণ বাংলায়
        </div>
      </div>
    </footer>
  );
}
