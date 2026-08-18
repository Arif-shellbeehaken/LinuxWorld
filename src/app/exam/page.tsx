"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { quizzes } from "@/data/modules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExamPage() {
  const { status } = useSession();
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
    pointsEarned: number;
    correct: number;
    total: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const quiz = quizzes.find((q) => q.id === activeQuizId);

  const startQuiz = (id: string) => {
    if (status !== "authenticated") return;
    setActiveQuizId(id);
    setCurrentQ(0);
    setAnswers([]);
    setFinished(false);
    setResult(null);
    setError("");
  };

  const selectAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const nextQuestion = async () => {
    if (!quiz) return;
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      return;
    }

    // Submit to server — grading happens server-side only
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId: quiz.id, answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "জমা দিতে ব্যর্থ");
        setSubmitting(false);
        return;
      }
      setResult(data);
      setFinished(true);
    } catch {
      setError("নেটওয়ার্ক সমস্যা");
    }
    setSubmitting(false);
  };

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">পরীক্ষা দিতে লগইন প্রয়োজন</h1>
        <p className="mt-2 text-slate-600">স্কোর ও পয়েন্ট সেভ করতে অ্যাকাউন্ট লাগবে।</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login">
            <Button>লগইন</Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary">রেজিস্টার</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (activeQuizId && quiz && !finished) {
    const q = quiz.questions[currentQ];
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">{quiz.title}</h1>
          <span className="text-sm text-slate-500">
            প্রশ্ন {currentQ + 1} / {quiz.questions.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">{q.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectAnswer(idx)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  answers[currentQ] === idx
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                }`}
              >
                <span className="mr-3 font-medium text-slate-400">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            ))}
          </CardContent>
        </Card>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={nextQuestion}
            disabled={answers[currentQ] === undefined || submitting}
          >
            {submitting
              ? "জমা হচ্ছে..."
              : currentQ === quiz.questions.length - 1
              ? "জমা দিন"
              : "পরবর্তী →"}
          </Button>
        </div>
      </div>
    );
  }

  if (finished && result && quiz) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="text-6xl">{result.passed ? "🎉" : "😔"}</div>
        <h1 className="mt-4 text-3xl font-bold">
          {result.passed ? "অভিনন্দন! পাস করেছেন" : "আবার চেষ্টা করুন"}
        </h1>
        <p className="mt-2 text-4xl font-bold text-emerald-600">{result.score}%</p>
        <p className="mt-2 text-slate-600">
          সঠিক: {result.correct}/{result.total} · +{result.pointsEarned} পয়েন্ট
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={() => setActiveQuizId(null)}>সব পরীক্ষা</Button>
          <Button variant="secondary" onClick={() => startQuiz(quiz.id)}>
            আবার দিন
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">পরীক্ষা ও কুইজ</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        সার্ভার-সাইড মার্কিং — উত্তর ক্লায়েন্টে ফাঁস হয় না।
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {quizzes.map((q) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle>{q.title}</CardTitle>
              <CardDescription>
                {q.questions.length}টি প্রশ্ন · পাস: {q.passingScore}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => startQuiz(q.id)} disabled={status !== "authenticated"}>
                পরীক্ষা শুরু করুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
