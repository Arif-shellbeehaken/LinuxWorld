"use client";

import { sampleLeaderboard } from "@/data/modules";
import { useProgressStore } from "@/store/progress";
import { getLevel } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeaderboardPage() {
  const totalPoints = useProgressStore((s) => s.totalPoints);
  const level = getLevel(totalPoints);

  // Insert current user into leaderboard for demo
  const board = [...sampleLeaderboard]
    .map((e) => (e.name === "আপনি" ? { ...e, points: totalPoints, level: level.title } : e))
    .sort((a, b) => b.points - a.points)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">লিডারবোর্ড</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        সেরা লার্নারদের র‍্যাঙ্কিং। পয়েন্ট বাড়িয়ে উপরে উঠুন!
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>টপ ১০ লার্নার</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {board.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  entry.name === "আপনি"
                    ? "bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800"
                    : "bg-slate-50 dark:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      entry.rank === 1
                        ? "bg-yellow-400 text-yellow-900"
                        : entry.rank === 2
                        ? "bg-slate-300 text-slate-700"
                        : entry.rank === 3
                        ? "bg-amber-600 text-white"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {entry.rank}
                  </span>
                  <div>
                    <p className="font-medium">{entry.name}</p>
                    <p className="text-xs text-slate-500">{entry.level}</p>
                  </div>
                </div>
                <p className="font-semibold text-emerald-600">{entry.points} পয়েন্ট</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-slate-500">
        * ডেমো লিডারবোর্ড। রিয়েল ইউজার ডেটা ব্যাকএন্ড যোগ করার পর আপডেট হবে।
      </p>
    </div>
  );
}
