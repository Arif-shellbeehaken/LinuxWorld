"use client";

import { use } from "react";
import Link from "next/link";
import { modules } from "@/data/modules";
import { useProgressStore } from "@/store/progress";
import { Button } from "@/components/ui/button";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const completedLessons = useProgressStore((s) => s.completedLessons);

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

  const handleComplete = () => {
    completeLesson(lesson!.id, lesson!.pointsReward);
  };

  // Simple markdown-like rendering (basic)
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h1 key={i}>{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <li key={i}>{line.slice(2)}</li>;
      if (line.startsWith("```")) return null; // skip for simplicity in this render
      if (line.trim() === "") return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
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
        {isCompleted && <span className="text-emerald-600 font-medium">✓ সম্পন্ন</span>}
      </div>

      <article className="lesson-content mt-8 prose prose-slate dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {lesson.content}
        </pre>
      </article>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link href="/courses">
          <Button variant="outline">← সব কোর্স</Button>
        </Link>
        <div className="flex gap-3">
          {!isCompleted ? (
            <Button onClick={handleComplete}>লেসন সম্পন্ন করুন (+{lesson.pointsReward})</Button>
          ) : (
            <span className="flex items-center text-emerald-600 font-medium">✓ পয়েন্ট যোগ হয়েছে</span>
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
