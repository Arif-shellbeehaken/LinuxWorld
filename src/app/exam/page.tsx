"use client";

import { useState } from "react";
import { quizzes } from "@/data/modules";
import { useProgressStore } from "@/store/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExamPage() {
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const completeQuiz = useProgressStore((s) => s.completeQuiz);
  const quizScores = useProgressStore((s) => s.quizScores);

  const quiz = quizzes.find((q) => q.id === activeQuizId);

  const startQuiz = (id: string) => {
    setActiveQuizId(id);
    setCurrentQ(0);
    setAnswers([]);
    setFinished(false);
    setScore(0);
  };

  const selectAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (!quiz) return;
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // calculate score
      let correct = 0;
      let points = 0;
      quiz.questions.forEach((q, i) => {
        if (answers[i] === q.correctIndex) {
          correct++;
          points += q.points;
        }
      });
      const percentage = Math.round((correct / quiz.questions.length) * 100);
      setScore(percentage);
      setFinished(true);
      completeQuiz(quiz.id, percentage, points);
    }
  };

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
                onClick={() => selectAnswer(idx)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  answers[currentQ] === idx
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                }`}
              >
                <span className="mr-3 font-medium text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button onClick={nextQuestion} disabled={answers[currentQ] === undefined}>
            {currentQ === quiz.questions.length - 1 ? "জমা দিন" : "পরবর্তী →"}
          </Button>
        </div>
      </div>
    );
  }

  if (finished && quiz) {
    const passed = score >= quiz.passingScore;
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="text-6xl">{passed ? "🎉" : "😔"}</div>
        <h1 className="mt-4 text-3xl font-bold">{passed ? "অভিনন্দন! পাস করেছেন" : "আবার চেষ্টা করুন"}</h1>
        <p className="mt-2 text-4xl font-bold text-emerald-600">{score}%</p>
        <p className="mt-2 text-slate-600">পাসিং স্কোর: {quiz.passingScore}%</p>
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
        জ্ঞান যাচাই করুন। ভালো স্কোর করলে অতিরিক্ত পয়েন্ট ও ব্যাজ পাবেন।
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {quizzes.map((q) => {
          const prevScore = quizScores[q.id];
          return (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle>{q.title}</CardTitle>
                <CardDescription>
                  {q.questions.length}টি প্রশ্ন · {q.timeLimitMinutes} মিনিট · পাস: {q.passingScore}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prevScore !== undefined && (
                  <p className="mb-3 text-sm">
                    আপনার সেরা স্কোর: <span className="font-bold text-emerald-600">{prevScore}%</span>
                  </p>
                )}
                <Button onClick={() => startQuiz(q.id)}>
                  {prevScore !== undefined ? "আবার দিন" : "পরীক্ষা শুরু করুন"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
