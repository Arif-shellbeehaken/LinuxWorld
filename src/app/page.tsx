import Link from "next/link";
import { modules } from "@/data/modules";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
              ১০০% বাংলায় · সম্পূর্ণ ফ্রি
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Linux Zero to Hero
            </h1>
            <p className="mt-4 text-lg text-emerald-100 sm:text-xl">
              শূন্য থেকে শুরু করে লিনাক্সের হিরো হয়ে উঠুন। স্টেপ-বাই-স্টেপ লেসন, হ্যান্ডস-অন প্র্যাকটিস, পরীক্ষা, পয়েন্ট, র‍্যাঙ্কিং ও অ্যাওয়ার্ড — সব এক ওয়েবসাইটে।
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
              >
                এখনই শুরু করুন →
              </Link>
              <Link
                href="/practice"
                className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-white/40 px-6 font-semibold text-white transition hover:bg-white/10"
              >
                প্র্যাকটিস ল্যাব
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
          কেন এই প্ল্যাটফর্ম?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 dark:text-slate-400">
          এক জায়গায় সবকিছু — অন্য কোথাও যেতে হবে না
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "📚", title: "স্টেপ-বাই-স্টেপ লেসন", desc: "সহজ বাংলায় সাজানো মডিউল ও লেসন" },
            { icon: "💻", title: "হ্যান্ডস-অন প্র্যাকটিস", desc: "রিয়েল কমান্ড অনুশীলন ও গাইডেড এক্সারসাইজ" },
            { icon: "📝", title: "কুইজ ও পরীক্ষা", desc: "মার্কিং, পয়েন্ট ও পাসিং স্কোর সহ" },
            { icon: "🏆", title: "পয়েন্ট · র‍্যাঙ্ক · অ্যাওয়ার্ড", desc: "ব্যাজ, লিডারবোর্ড ও লেভেল সিস্টেম" },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules preview */}
      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">কোর্স মডিউলসমূহ</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">শূন্য থেকে হিরো পর্যন্ত সম্পূর্ণ পাথ</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={`/courses#${mod.id}`}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:shadow-md dark:border-slate-700 dark:hover:border-emerald-700"
              >
                <span className="text-3xl">{mod.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 dark:text-white">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {mod.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-emerald-600">
                    {mod.lessons.length} লেসন · {mod.totalPoints} পয়েন্ট
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/courses"
              className="inline-flex h-11 items-center rounded-xl bg-emerald-600 px-6 font-medium text-white hover:bg-emerald-700"
            >
              সব কোর্স দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">আজই যাত্রা শুরু করুন</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">
            কোনো সাবস্ক্রিপশন নেই। শুধু শিখুন, প্র্যাকটিস করুন, পরীক্ষা দিন এবং হিরো হয়ে উঠুন।
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-flex h-12 items-center rounded-xl bg-white px-8 font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50"
          >
            ফ্রি শুরু করুন
          </Link>
        </div>
      </section>
    </div>
  );
}
