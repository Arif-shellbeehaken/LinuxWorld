"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { modules } from "@/data/modules";
import { Button } from "@/components/ui/button";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { status } = useSession();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  let lesson = null;
  let moduleTitle = "";
  let nextLessonId: string | null = null;

  for (const mod of modules) {
    const found = mod.lessons.find((l) => l.id === id);
    if (found) {
      lesson = found;
      moduleTitle = mod.title;
      const idx = mod.lessons.findIndex((l) => l.id === id);
      if (idx < mod.lessons.length - 1) {
        nextLessonId = mod.lessons[idx + 1].id;
      }
      break;
    }
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.completedLessons) setCompletedLessons(d.completedLessons);
      })
      .catch(() => {});
  }, [status, id]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">লেসন পাওয়া যায়নি</h1>
        <Link href="/courses" className="mt-4 inline-block text-emerald-600">
          কোর্সে ফিরে যান
        </Link>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);

  const handleComplete = async () => {
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
          action: "completeLesson",
          lessonId: lesson!.id,
          points: lesson!.pointsReward,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "সেভ ব্যর্থ");
      } else if (data.alreadyDone) {
        setMessage("ইতিমধ্যে সম্পন্ন");
        setCompletedLessons((prev) =>
          prev.includes(lesson!.id) ? prev : [...prev, lesson!.id]
        );
      } else {
        setCompletedLessons((prev) => [...prev, lesson!.id]);
        setMessage(`+${data.pointsAwarded} পয়েন্ট যোগ হয়েছে`);
      }
    } catch {
      setMessage("নেটওয়ার্ক সমস্যা");
    }
    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 text-sm text-slate-500">
        <Link href="/courses" className="hover:text-emerald-600">
          কোর্স
        </Link>
        <span className="mx-2">/</span>
        <span>{moduleTitle}</span>
      </div>

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{lesson.description}</p>
      <div className="mt-3 flex gap-4 text-sm text-slate-500">
        <span>⏱️ {lesson.durationMinutes} মিনিট</span>
        <span>🎯 +{lesson.pointsReward} পয়েন্ট</span>
        {isCompleted && <span className="font-medium text-emerald-600">✓ সম্পন্ন</span>}
      </div>

      <article className="lesson-content mt-8">
        <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {lesson.content}
        </pre>
      </article>

      {message && (
        <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">{message}</p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link href="/courses">
          <Button variant="outline">← সব কোর্স</Button>
        </Link>
        <div className="flex gap-3">
          {!isCompleted ? (
            <Button onClick={handleComplete} disabled={saving}>
              {saving
                ? "সেভ হচ্ছে..."
                : status === "authenticated"
                ? `লেসন সম্পন্ন করুন (+${lesson.pointsReward})`
                : "লগইন করে সম্পন্ন করুন"}
            </Button>
          ) : (
            <span className="flex items-center font-medium text-emerald-600">✓ পয়েন্ট সেভ হয়েছে</span>
          )}
          {nextLessonId && (
            <Link href={`/lessons/${nextLessonId}`}>
              <Button variant="secondary">পরবর্তী লেসন →</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
