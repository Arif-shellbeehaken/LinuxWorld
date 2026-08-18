"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { badges, modules } from "@/data/modules";
import { getLevel } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProgressData {
  totalPoints: number;
  completedLessons: string[];
  completedQuizzes: string[];
  completedExercises: string[];
  badges: string[];
  name?: string;
}

export default function DashboardPage() {
  const { status } = useSession();
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      setLoading(false);
      return;
    }
    if (status !== "authenticated") return;

    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("লোড ব্যর্থ"))
      .finally(() => setLoading(false));
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">ড্যাশবোর্ড দেখতে লগইন করুন</h1>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login"><Button>লগইন</Button></Link>
          <Link href="/register"><Button variant="secondary">রেজিস্টার</Button></Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-20 text-center text-slate-500">লোড হচ্ছে...</div>;
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center text-red-600">
        {error || "ডেটা পাওয়া যায়নি"}
      </div>
    );
  }

  const level = getLevel(data.totalPoints);
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent =
    totalLessons > 0 ? Math.round((data.completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        {data.name ? `${data.name}-এর ড্যাশবোর্ড` : "আপনার ড্যাশবোর্ড"}
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">সার্ভার-সিঙ্কড অগ্রগতি</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">মোট পয়েন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">{data.totalPoints}</p>
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
              {data.completedLessons.length}
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

      <section className="mt-10">
        <h2 className="text-xl font-bold">অ্যাওয়ার্ড / ব্যাজ</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => {
            const earned = data.badges.includes(b.id);
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

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/courses"><Button>লেসন চালিয়ে যান</Button></Link>
        <Link href="/practice"><Button variant="secondary">প্র্যাকটিস</Button></Link>
        <Link href="/exam"><Button variant="outline">পরীক্ষা</Button></Link>
      </section>

      <div className="mt-8 rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        <p>
          <strong>সম্পন্ন কুইজ:</strong> {data.completedQuizzes.length} ·{" "}
          <strong>সম্পন্ন প্র্যাকটিস:</strong> {data.completedExercises.length}
        </p>
      </div>
    </div>
  );
}
