"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { exercises } from "@/data/modules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Terminal from "@/components/terminal/Terminal";

export default function PracticePage() {
  const { status } = useSession();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const active = exercises.find((e) => e.id === activeId);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.completedExercises) setCompleted(d.completedExercises);
      })
      .catch(() => {});
  }, [status]);

  const handleComplete = async () => {
    if (!active) return;
    if (status !== "authenticated") {
      setMessage("পয়েন্ট সেভ করতে লগইন করুন");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "completeExercise",
          exerciseId: active.id,
          points: active.pointsReward,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "সেভ ব্যর্থ");
      } else {
        setCompleted((prev) =>
          prev.includes(active.id) ? prev : [...prev, active.id]
        );
        setMessage(
          data.alreadyDone
            ? "ইতিমধ্যে সম্পন্ন"
            : `+${data.pointsAwarded} পয়েন্ট যোগ হয়েছে`
        );
        setTimeout(() => {
          setActiveId(null);
          setMessage("");
        }, 1200);
      }
    } catch {
      setMessage("নেটওয়ার্ক সমস্যা");
    }
    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-mono text-2xl font-bold text-[var(--text)]">🧪 প্র্যাকটিস ল্যাব</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        হ্যান্ডস-অন এক্সারসাইজ — সম্পন্ন করলে সার্ভারে পয়েন্ট সেভ হয়।
      </p>
      <div className="mt-6 mb-8">
        <p className="mb-2 text-sm text-[var(--muted)]">লাইভ টার্মিনাল — এখানেই কমান্ড চেষ্টা করুন</p>
        <Terminal />
      </div>
      {status === "unauthenticated" && (
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
          পয়েন্ট সেভ করতে{" "}
          <Link href="/login" className="underline">
            লগইন
          </Link>{" "}
          করুন।
        </p>
      )}

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
                <p className="text-sm font-medium text-emerald-600">+{ex.pointsReward} পয়েন্ট</p>
                {done ? (
                  <p className="mt-3 text-sm font-medium text-emerald-600">✓ সম্পন্ন হয়েছে</p>
                ) : (
                  <Button
                    className="mt-3"
                    onClick={() => {
                      setActiveId(ex.id);
                      setShowHints(false);
                      setMessage("");
                    }}
                  >
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

            {message && (
              <p className="mt-4 text-sm font-medium text-emerald-600">{message}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setShowHints(true)}>
                হিন্ট দেখুন
              </Button>
              <Button onClick={handleComplete} disabled={saving}>
                {saving ? "সেভ হচ্ছে..." : `সম্পন্ন (+${active.pointsReward})`}
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
