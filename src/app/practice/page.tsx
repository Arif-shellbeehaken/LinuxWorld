"use client";

import { useState } from "react";
import { exercises } from "@/data/modules";
import { useProgressStore } from "@/store/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PracticePage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const completeExercise = useProgressStore((s) => s.completeExercise);
  const completed = useProgressStore((s) => s.completedExercises);

  const active = exercises.find((e) => e.id === activeId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">প্র্যাকটিস ল্যাব</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        হ্যান্ডস-অন এক্সারসাইজ করে দক্ষতা বাড়ান। প্রতিটি সম্পন্ন করলে পয়েন্ট পাবেন।
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {exercises.map((ex) => {
          const done = completed.includes(ex.id);
          return (
            <Card
              key={ex.id}
              className={done ? "border-emerald-300 dark:border-emerald-700" : ""}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{ex.title}</CardTitle>
                    <CardDescription className="mt-1">{ex.description}</CardDescription>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      ex.difficulty === "সহজ"
                        ? "bg-green-100 text-green-700"
                        : ex.difficulty === "মাঝারি"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ex.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600 font-medium">+{ex.pointsReward} পয়েন্ট</p>
                {done ? (
                  <p className="mt-3 text-sm font-medium text-emerald-600">✓ সম্পন্ন হয়েছে</p>
                ) : (
                  <Button className="mt-3" onClick={() => { setActiveId(ex.id); setShowHints(false); }}>
                    শুরু করুন
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h2 className="text-xl font-bold">{active.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{active.description}</p>

            <ol className="mt-6 list-decimal space-y-2 pl-5 text-slate-700 dark:text-slate-300">
              {active.instructions.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ol>

            {showHints && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-950/40">
                <p className="font-medium text-amber-800 dark:text-amber-200">হিন্টস:</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-amber-700 dark:text-amber-300">
                  {active.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setShowHints(true)}>
                হিন্ট দেখুন
              </Button>
              <Button
                onClick={() => {
                  completeExercise(active.id, active.pointsReward);
                  setActiveId(null);
                }}
              >
                সম্পন্ন করেছি (+{active.pointsReward})
              </Button>
              <Button variant="ghost" onClick={() => setActiveId(null)}>
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
