"use client";

import { use, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { modules, quizzes, exercises } from "@/data/modules";
import Terminal from "@/components/terminal/Terminal";
import { Button } from "@/components/ui/button";

type Tab = "lesson" | "commands" | "practice" | "quiz";

function levelFromOrder(order: number) {
  if (order <= 5) return { label: "বিগিনার", color: "#5CCFE6" };
  if (order <= 11) return { label: "ইন্টারমিডিয়েট", color: "#FFB454" };
  return { label: "অ্যাডভান্সড", color: "#FF6B6B" };
}

/** Extract shell-like commands from lesson markdown content */
function extractCommands(content: string): { cmd: string; desc: string }[] {
  const found: { cmd: string; desc: string }[] = [];
  const seen = new Set<string>();
  // fenced code blocks
  const blocks = content.matchAll(/```(?:bash|sh)?\n([\s\S]*?)```/g);
  for (const b of blocks) {
    for (const line of b[1].split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#") || t.startsWith("//")) continue;
      const cmd = t.replace(/^\$\s*/, "").slice(0, 80);
      if (cmd.length < 2 || seen.has(cmd)) continue;
      seen.add(cmd);
      found.push({ cmd, desc: "লেসন থেকে" });
      if (found.length >= 12) return found;
    }
  }
  return found;
}

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { status } = useSession();
  const [tab, setTab] = useState<Tab>("lesson");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [quizDraft, setQuizDraft] = useState<Record<number, number>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    correct: number;
    total: number;
    pct: number;
    passed: boolean;
    review: { q: string; ok: boolean; picked: string; right: string }[];
  } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const mod = modules.find((m) => m.id === id);
  const modQuizzes = useMemo(
    () => quizzes.filter((q) => q.moduleId === id),
    [id]
  );
  const quiz = modQuizzes[0] || null;
  const modExercises = useMemo(
    () => exercises.filter((e) => e.moduleId === id),
    [id]
  );

  const commands = useMemo(() => {
    if (!mod) return [];
    const all: { cmd: string; desc: string }[] = [];
    const seen = new Set<string>();
    for (const les of mod.lessons) {
      for (const c of extractCommands(les.content)) {
        if (seen.has(c.cmd)) continue;
        seen.add(c.cmd);
        all.push(c);
      }
    }
    return all.slice(0, 16);
  }, [mod]);

  useEffect(() => {
    if (!timerOn || !quiz || quizDone) return;
    if (secondsLeft <= 0) {
      void handleSubmitQuiz(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerOn, secondsLeft, quizDone]);

  if (!mod) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-mono text-xl text-[var(--text)]">মডিউল পাওয়া যায়নি</h1>
        <Link href="/courses" className="mt-4 inline-block text-[var(--cyan)]">
          ← সব মডিউল
        </Link>
      </div>
    );
  }

  const lvl = levelFromOrder(mod.order);
  const lesson = mod.lessons[lessonIdx];

  async function handleSubmitQuiz(auto = false) {
    if (!quiz || submitting) return;
    setSubmitting(true);
    setTimerOn(false);
    try {
      if (status === "authenticated") {
        const answers = quiz.questions.map((_, i) =>
          quizDraft[i] === undefined ? -1 : quizDraft[i]
        );
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizId: quiz.id, answers }),
        });
        const data = await res.json();
        if (res.ok) {
          const review = quiz.questions.map((q, i) => ({
            q: q.question,
            ok: quizDraft[i] === q.correctIndex,
            picked:
              quizDraft[i] === undefined
                ? "দেননি"
                : q.options[quizDraft[i]] ?? "?",
            right: q.options[q.correctIndex],
          }));
          // Prefer server score if present
          const correct =
            typeof data.correct === "number"
              ? data.correct
              : review.filter((r) => r.ok).length;
          const total = quiz.questions.length;
          const pct = Math.round((correct / total) * 100);
          setQuizResult({
            correct,
            total,
            pct,
            passed: pct >= (quiz.passingScore || 70),
            review,
          });
          setQuizDone(true);
          setMsg(
            data.pointsAwarded
              ? `+${data.pointsAwarded} পয়েন্ট`
              : auto
              ? "সময় শেষ — জমা হয়েছে"
              : ""
          );
          setSubmitting(false);
          return;
        }
      }
      // Offline / unauthenticated local grade (review only; points need login)
      const review = quiz.questions.map((q, i) => ({
        q: q.question,
        ok: quizDraft[i] === q.correctIndex,
        picked:
          quizDraft[i] === undefined ? "দেননি" : q.options[quizDraft[i]] ?? "?",
        right: q.options[q.correctIndex],
      }));
      const correct = review.filter((r) => r.ok).length;
      const total = quiz.questions.length;
      const pct = Math.round((correct / total) * 100);
      setQuizResult({
        correct,
        total,
        pct,
        passed: pct >= (quiz.passingScore || 70),
        review,
      });
      setQuizDone(true);
      setMsg(
        status !== "authenticated"
          ? "পয়েন্ট সেভ করতে লগইন করুন"
          : auto
          ? "সময় শেষ"
          : ""
      );
    } catch {
      setMsg("নেটওয়ার্ক সমস্যা");
    }
    setSubmitting(false);
  }

  function pickOption(qi: number, oi: number) {
    setQuizDraft((d) => {
      const next = { ...d, [qi]: oi };
      return next;
    });
    if (!timerOn && quiz && !quizDone) {
      setSecondsLeft(Math.max(60, quiz.questions.length * 45));
      setTimerOn(true);
    }
  }

  const tabs: { k: Tab; label: string }[] = [
    { k: "lesson", label: "📖 পাঠ" },
    { k: "commands", label: "⌨️ কমান্ড" },
    { k: "practice", label: "🧪 প্র্যাকটিস" },
    { k: "quiz", label: "📝 পরীক্ষা" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/courses"
        className="text-[13px] text-[var(--muted)] no-underline hover:text-[var(--cyan)]"
      >
        ← সব মডিউল
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <span className="text-4xl">{mod.icon}</span>
        <div>
          <h1 className="font-mono text-xl font-bold text-[var(--text)] sm:text-2xl">
            {mod.title}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            {mod.description}
            <span
              className="lvl-pill"
              style={{ ["--lvl-color" as string]: lvl.color }}
            >
              {lvl.label}
            </span>
          </p>
        </div>
      </div>

      <div
        className="mt-5 rounded-[10px] border border-[var(--border)] border-l-[3px] border-l-[var(--amber)] bg-[var(--panel)] px-4 py-3"
      >
        <h4 className="font-mono text-[13px] text-[var(--amber)]">
          🎯 এই মডিউলে যা শিখবেন
        </h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[13.5px] text-[var(--text)]">
          {mod.lessons.slice(0, 4).map((l) => (
            <li key={l.id}>{l.title}</li>
          ))}
          <li>
            {mod.lessons.length} লেসন · {mod.totalPoints} পয়েন্ট সম্ভাব্য
          </li>
        </ul>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-1 border-b border-[var(--border)]">
        {tabs.map((t) => (
          <button
            key={t.k}
            type="button"
            onClick={() => setTab(t.k)}
            className={`border-b-2 px-3 py-2.5 text-[13.5px] transition ${
              tab === t.k
                ? "border-[var(--amber)] text-[var(--amber)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {/* LESSON TAB */}
        {tab === "lesson" && lesson && (
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {mod.lessons.map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLessonIdx(i)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono ${
                    i === lessonIdx
                      ? "bg-[var(--cyan)] text-[var(--ink)]"
                      : "bg-[var(--panel-2)] text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <h2 className="font-mono text-lg text-[var(--cyan)]">{lesson.title}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              ⏱️ {lesson.durationMinutes} মিনিট · 🎯 +{lesson.pointsReward} পয়েন্ট
            </p>
            <article className="lesson-content mt-6 whitespace-pre-wrap text-[14.5px] leading-relaxed">
              {lesson.content}
            </article>
            <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--border)] pt-5">
              <Button
                variant="secondary"
                disabled={lessonIdx === 0}
                onClick={() => setLessonIdx((i) => Math.max(0, i - 1))}
              >
                ← আগের
              </Button>
              <Link href={`/lessons/${lesson.id}`}>
                <Button variant="outline">পূর্ণ লেসন পেজ</Button>
              </Link>
              {lessonIdx < mod.lessons.length - 1 ? (
                <Button onClick={() => setLessonIdx((i) => i + 1)}>
                  পরবর্তী লেসন →
                </Button>
              ) : (
                <Button onClick={() => setTab("quiz")}>পরীক্ষায় যান →</Button>
              )}
            </div>
          </div>
        )}

        {/* COMMANDS TAB */}
        {tab === "commands" && (
          <div>
            <p className="mb-4 text-sm text-[var(--muted)]">
              এই মডিউলের লেসন থেকে নেওয়া কমান্ড — প্র্যাকটিস ট্যাব বা{" "}
              <Link href="/terminal" className="text-[var(--cyan)]">
                টার্মিনাল
              </Link>
              -এ চেষ্টা করুন।
            </p>
            {commands.length === 0 ? (
              <p className="text-[var(--muted)]">কমান্ড তালিকা খালি — লেসন পড়ুন।</p>
            ) : (
              <div className="overflow-x-auto rounded-[12px] border border-[var(--border)]">
                <table className="w-full text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                      <th className="px-3 py-2 font-mono text-xs font-medium">কমান্ড</th>
                      <th className="px-3 py-2 font-mono text-xs font-medium">নোট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commands.map((c) => (
                      <tr key={c.cmd} className="border-b border-[var(--border)]">
                        <td className="px-3 py-2.5">
                          <code className="rounded-md bg-[var(--panel-2)] px-2 py-0.5 font-mono text-[12.5px] text-[var(--amber)]">
                            {c.cmd}
                          </code>
                        </td>
                        <td className="px-3 py-2.5 text-[var(--muted)]">{c.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Button className="mt-4" onClick={() => setTab("practice")}>
              প্র্যাকটিসে যান →
            </Button>
          </div>
        )}

        {/* PRACTICE TAB */}
        {tab === "practice" && (
          <div>
            <p className="mb-3 text-sm text-[var(--muted)]">
              লাইভ টার্মিনালে কমান্ড চালান — সিমুলেটেড ফাইলসিস্টেম, ঝুঁকি নেই।
            </p>
            {modExercises.length > 0 && (
              <ul className="mb-4 space-y-2">
                {modExercises.map((ex) => (
                  <li
                    key={ex.id}
                    className="rounded-[10px] border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-[13.5px]"
                  >
                    <b className="text-[var(--text)]">{ex.title}</b>
                    <span className="ml-2 text-xs text-[var(--amber)]">
                      +{ex.pointsReward}
                    </span>
                    <ol className="mt-1 list-decimal pl-4 text-[var(--muted)]">
                      {ex.instructions.slice(0, 4).map((ins, i) => (
                        <li key={i}>{ins}</li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
            )}
            {commands.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {commands.slice(0, 8).map((c) => (
                  <span
                    key={c.cmd}
                    className="rounded-md border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1 font-mono text-[11px] text-[var(--amber)]"
                  >
                    {c.cmd.split(/\s+/)[0]}
                  </span>
                ))}
              </div>
            )}
            <Terminal />
            <div className="mt-4 flex gap-2">
              <Link href="/terminal">
                <Button variant="secondary">বড় টার্মিনাল</Button>
              </Link>
              <Link href="/practice">
                <Button variant="outline">সব প্র্যাকটিস ল্যাব</Button>
              </Link>
            </div>
          </div>
        )}

        {/* QUIZ TAB */}
        {tab === "quiz" && (
          <div>
            {!quiz ? (
              <div>
                <p className="text-[var(--muted)]">
                  এই মডিউলের আলাদা কুইজ নেই — এক্সাম পেজ থেকে মিডটার্ম/ফাইনাল দিন।
                </p>
                <Link href="/exam" className="mt-3 inline-block text-[var(--cyan)]">
                  পরীক্ষা পেজ →
                </Link>
              </div>
            ) : quizDone && quizResult ? (
              <div
                className={`rounded-[14px] border p-6 text-center ${
                  quizResult.passed
                    ? "border-[var(--green)] bg-[var(--panel)]"
                    : "border-[var(--red)] bg-[var(--panel)]"
                }`}
              >
                <div className="font-mono text-4xl font-bold text-[var(--cyan)]">
                  {quizResult.correct}/{quizResult.total}
                </div>
                <p
                  className={`mt-2 text-lg font-bold ${
                    quizResult.passed ? "text-[var(--green)]" : "text-[var(--red)]"
                  }`}
                >
                  {quizResult.pct}% —{" "}
                  {quizResult.passed ? "পাস ✓" : "ফেল (পাস ৭০%+)"}
                </p>
                {msg && <p className="mt-1 text-sm text-[var(--amber)]">{msg}</p>}
                <div className="mt-4 flex justify-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setQuizDone(false);
                      setQuizResult(null);
                      setQuizDraft({});
                      setTimerOn(false);
                      setMsg("");
                    }}
                  >
                    আবার দিন
                  </Button>
                  <Button onClick={() => setTab("lesson")}>পাঠে ফিরুন</Button>
                </div>
                <h3 className="mt-8 text-left font-mono text-sm text-[var(--text)]">
                  উত্তর রিভিউ
                </h3>
                <div className="mt-3 space-y-2 text-left">
                  {quizResult.review.map((r, i) => (
                    <div
                      key={i}
                      className={`rounded-[10px] border px-3 py-2 text-[13px] ${
                        r.ok ? "border-[var(--green)]" : "border-[var(--red)]"
                      }`}
                    >
                      <b>
                        {i + 1}. {r.q}
                      </b>
                      <div className="mt-1 text-[12px] text-[var(--muted)]">
                        {r.ok ? "✓" : "✗"} আপনি: <b>{r.picked}</b>
                        {!r.ok && (
                          <>
                            {" "}
                            · সঠিক:{" "}
                            <b className="text-[var(--green)]">{r.right}</b>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[var(--muted)]">
                  {quiz.title} · {quiz.questions.length} প্রশ্ন · পাস{" "}
                  {quiz.passingScore}% · প্রথম উত্তরে টাইমার চালু
                </p>
                {timerOn && (
                  <div
                    className={`mt-3 flex items-center justify-between rounded-[10px] border px-3 py-2 font-mono text-[13px] ${
                      secondsLeft <= 20
                        ? "border-[var(--red)] text-[var(--red)]"
                        : secondsLeft <= 60
                        ? "border-[var(--amber)] text-[var(--amber)]"
                        : "border-[var(--border)] text-[var(--text)]"
                    }`}
                  >
                    <span>সময় বাকি</span>
                    <span>
                      {Math.floor(secondsLeft / 60)}:
                      {String(secondsLeft % 60).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className="mt-5 space-y-5">
                  {quiz.questions.map((q, qi) => (
                    <div key={q.id}>
                      <p className="text-[14.5px] font-semibold text-[var(--text)]">
                        {qi + 1}. {q.question}
                      </p>
                      <div className="mt-2 space-y-2">
                        {q.options.map((opt, oi) => (
                          <label
                            key={oi}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-[13.5px] ${
                              quizDraft[qi] === oi
                                ? "border-[var(--cyan)] bg-[var(--panel-2)]"
                                : "border-[var(--border)] bg-[var(--panel)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q${qi}`}
                              checked={quizDraft[qi] === oi}
                              onChange={() => pickOption(qi, oi)}
                              className="accent-[var(--cyan)]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  উত্তর: {Object.keys(quizDraft).length}/{quiz.questions.length}
                </p>
                <Button
                  className="mt-3"
                  disabled={
                    Object.keys(quizDraft).length < quiz.questions.length ||
                    submitting
                  }
                  onClick={() => handleSubmitQuiz(false)}
                >
                  {submitting ? "জমা হচ্ছে..." : "পরীক্ষা জমা দিন ✓"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
