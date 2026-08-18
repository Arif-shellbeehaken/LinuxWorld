"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Entry {
  rank: number;
  id: string;
  name: string;
  points: number;
  level: string;
}

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [board, setBoard] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.leaderboard) setBoard(d.leaderboard);
        else setError(d.error || "লোড ব্যর্থ");
      })
      .catch(() => setError("নেটওয়ার্ক সমস্যা"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">লিডারবোর্ড</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        রিয়েল-টাইম র‍্যাঙ্কিং — ডাটাবেস থেকে
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>টপ লার্নার</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-slate-500">লোড হচ্ছে...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!loading && !error && board.length === 0 && (
            <p className="text-sm text-slate-500">এখনো কেউ পয়েন্ট পায়নি। প্রথম হোন!</p>
          )}
          <div className="space-y-2">
            {board.map((entry) => {
              const isYou = session?.user?.id === entry.id;
              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                    isYou
                      ? "border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
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
                      <p className="font-medium">
                        {entry.name}
                        {isYou && <span className="ml-2 text-xs text-emerald-600">(আপনি)</span>}
                      </p>
                      <p className="text-xs text-slate-500">{entry.level}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-emerald-600">{entry.points} পয়েন্ট</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
