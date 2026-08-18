"use client";

import { useProgressStore } from "@/store/progress";
import { getLevel } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { totalPoints, completedLessons, completedQuizzes, completedExercises, badges, resetProgress } =
    useProgressStore();
  const level = getLevel(totalPoints);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
          আ
        </div>
        <div>
          <h1 className="text-2xl font-bold">আপনার প্রোফাইল</h1>
          <p className="text-slate-500">লেভেল {level.level} · {level.title}</p>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>পরিসংখ্যান</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>মোট পয়েন্ট</span>
            <span className="font-bold text-emerald-600">{totalPoints}</span>
          </div>
          <div className="flex justify-between">
            <span>সম্পন্ন লেসন</span>
            <span className="font-bold">{completedLessons.length}</span>
          </div>
          <div className="flex justify-between">
            <span>সম্পন্ন কুইজ</span>
            <span className="font-bold">{completedQuizzes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>সম্পন্ন প্র্যাকটিস</span>
            <span className="font-bold">{completedExercises.length}</span>
          </div>
          <div className="flex justify-between">
            <span>অর্জিত ব্যাজ</span>
            <span className="font-bold">{badges.length}</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button
          variant="destructive"
          onClick={() => {
            if (confirm("সব ডেটা মুছে ফেলতে চান? এটি ফিরিয়ে আনা যাবে না।")) {
              resetProgress();
            }
          }}
        >
          প্রোগ্রেস রিসেট করুন
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        লোকাল স্টোরেজে সেভ হয়। পরবর্তী ভার্সনে অ্যাকাউন্ট সিস্টেম যোগ করা হবে।
      </p>
    </div>
  );
}
