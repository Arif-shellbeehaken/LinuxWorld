import Link from "next/link";
import { modules } from "@/data/modules";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">সব কোর্স মডিউল</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          ধাপে ধাপে এগোতে থাকুন। প্রতিটি লেসন শেষে পয়েন্ট পাবেন।
        </p>
      </div>

      <div className="space-y-10">
        {modules.map((mod) => (
          <section
            key={mod.id}
            id={mod.id}
            className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{mod.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{mod.title}</h2>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">{mod.description}</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold text-emerald-600">{mod.totalPoints} পয়েন্ট</p>
                <p className="text-slate-500">{mod.lessons.length} লেসন</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {mod.lessons.map((lesson, idx) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{lesson.title}</p>
                      <p className="text-xs text-slate-500">
                        {lesson.durationMinutes} মিনিট · +{lesson.pointsReward} পয়েন্ট
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-600">→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
