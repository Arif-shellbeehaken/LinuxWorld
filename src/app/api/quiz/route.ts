import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { quizSubmitSchema } from "@/lib/validations/auth";
import { submitQuiz } from "@/lib/services/progress";
import { QUIZ_ANSWERS, QUIZ_POINTS, QUIZ_PASSING } from "@/lib/quiz-answers";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Server-side quiz grading — answers never leave the server.
 * Rate limited to prevent abuse.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "অননুমোদিত" }, { status: 401 });
  }

  const ip = getClientIp(req);
  const limited = rateLimit(`quiz:${session.user.id}:${ip}`, {
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });
  if (!limited.success) {
    return NextResponse.json(
      { error: "কুইজ সাবমিট লিমিট শেষ। পরে চেষ্টা করুন।" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000)) },
      }
    );
  }

  try {
    const body = await req.json();
    const parsed = quizSubmitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "অবৈধ ডেটা" }, { status: 400 });
    }

    const { quizId, answers } = parsed.data;
    const correct = QUIZ_ANSWERS[quizId];
    if (!correct) {
      return NextResponse.json({ error: "কুইজ পাওয়া যায়নি" }, { status: 404 });
    }

    if (answers.length !== correct.length) {
      return NextResponse.json({ error: "উত্তর সংখ্যা মিলছে না" }, { status: 400 });
    }

    const result = await submitQuiz(
      session.user.id,
      quizId,
      answers,
      correct,
      QUIZ_POINTS[quizId] ?? correct.map(() => 10),
      QUIZ_PASSING[quizId] ?? 70
    );

    return NextResponse.json(result);
  } catch (e) {
    console.error("[QUIZ]", e);
    return NextResponse.json({ error: "সার্ভার এরর" }, { status: 500 });
  }
}
