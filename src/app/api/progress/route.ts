import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import {
  getOrCreateProgress,
  completeLesson,
  completeExercise,
} from "@/lib/services/progress";
import {
  lessonCompleteSchema,
  exerciseCompleteSchema,
} from "@/lib/validations/auth";
import { prisma } from "@/lib/db/prisma";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "অননুমোদিত" }, { status: 401 });
  }

  const progress = await getOrCreateProgress(session.user.id);
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { totalPoints: true, name: true },
  });

  return NextResponse.json({
    ...progress,
    totalPoints: user?.totalPoints ?? 0,
    name: user?.name,
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "অননুমোদিত" }, { status: 401 });
  }

  const ip = getClientIp(req);
  const limited = rateLimit(`progress:${session.user.id}:${ip}`, {
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (!limited.success) {
    return NextResponse.json(
      { error: "অনেক রিকোয়েস্ট। একটু অপেক্ষা করুন।" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000)) },
      }
    );
  }

  try {
    const body = await req.json();
    const action = body.action as string;

    if (action === "completeLesson") {
      const parsed = lessonCompleteSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "অবৈধ ডেটা" }, { status: 400 });
      }
      // Validate lesson exists and points match server data (anti-cheat)
      const { modules } = await import("@/data/modules");
      let validPoints: number | null = null;
      for (const mod of modules) {
        const lesson = mod.lessons.find((l) => l.id === parsed.data.lessonId);
        if (lesson) {
          validPoints = lesson.pointsReward;
          break;
        }
      }
      if (validPoints === null) {
        return NextResponse.json({ error: "লেসন পাওয়া যায়নি" }, { status: 404 });
      }
      const result = await completeLesson(
        session.user.id,
        parsed.data.lessonId,
        validPoints // server-authoritative points
      );
      return NextResponse.json(result);
    }

    if (action === "completeExercise") {
      const parsed = exerciseCompleteSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "অবৈধ ডেটা" }, { status: 400 });
      }
      const { exercises } = await import("@/data/modules");
      const exercise = exercises.find((e) => e.id === parsed.data.exerciseId);
      if (!exercise) {
        return NextResponse.json({ error: "এক্সারসাইজ পাওয়া যায়নি" }, { status: 404 });
      }
      const result = await completeExercise(
        session.user.id,
        parsed.data.exerciseId,
        exercise.pointsReward // server-authoritative
      );
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "অজানা অ্যাকশন" }, { status: 400 });
  } catch (e) {
    console.error("[PROGRESS]", e);
    return NextResponse.json({ error: "সার্ভার এরর" }, { status: 500 });
  }
}
