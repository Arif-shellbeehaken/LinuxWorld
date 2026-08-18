"use client";

import { useProgressStore } from "@/store/progress";
import { badges, modules } from "@/data/modules";
import { getLevel } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const {
    totalPoints,
    completedLessons,
    completedQuizzes,
    completedExercises,
    badges: earnedBadges,
    resetProgress,
  } = useProgressStore();

  const level = getLevel(totalPoints);
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">আপনার ড্যাশবোর্ড</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">অগ্রগতি, পয়েন্ট ও অর্জন দেখুন</p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">মোট পয়েন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">{totalPoints}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">লেভেল</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{level.level}</p>
            <p className="text-sm text-slate-500">{level.title}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">সম্পন্ন লেসন</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {completedLessons.length}
              <span className="text-lg text-slate-400">/{totalLessons}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">অগ্রগতি</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{progressPercent}%</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full bg-emerald-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">আপনার অ্যাওয়ার্ড / ব্যাজ</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => {
            const earned = earnedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`flex items-center gap-4 rounded-2xl border p-4 ${
                  earned
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40"
                    : "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <span className="text-3xl">{b.icon}</span>
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-xs text-slate-500">{b.description}</p>
                  {earned && <p className="mt-1 text-xs font-medium text-emerald-600">✓ অর্জিত</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/courses">
          <Button>লেসন চালিয়ে যান</Button>
        </Link>
        <Link href="/practice">
          <Button variant="secondary">প্র্যাকটিস করুন</Button>
        </Link>
        <Link href="/exam">
          <Button variant="outline">পরীক্ষা দিন</Button>
        </Link>
        <Button variant="ghost" onClick={() => { if (confirm("সব অগ্রগতি মুছে ফেলতে চান?")) resetProgress(); }}>
          রিসেট প্রোগ্রেস
        </Button>
      </section>

      <div className="mt-8 rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        <p>
          <strong>সম্পন্ন কুইজ:</strong> {completedQuizzes.length} ·{" "}
          <strong>সম্পন্ন এক্সারসাইজ:</strong> {completedExercises.length}
        </p>
      </div>
    </div>
  );
}
