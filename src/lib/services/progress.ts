import { prisma } from "@/lib/db/prisma";
import { badges } from "@/data/modules";

function parseJsonArray(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function parseJsonObject(raw: string): Record<string, number> {
  try {
    const v = JSON.parse(raw);
    return typeof v === "object" && v !== null ? v : {};
  } catch {
    return {};
  }
}

export async function getOrCreateProgress(userId: string) {
  let progress = await prisma.progress.findUnique({ where: { userId } });
  if (!progress) {
    progress = await prisma.progress.create({ data: { userId } });
  }
  return {
    ...progress,
    completedLessons: parseJsonArray(progress.completedLessons),
    completedQuizzes: parseJsonArray(progress.completedQuizzes),
    completedExercises: parseJsonArray(progress.completedExercises),
    badges: parseJsonArray(progress.badges),
    quizScores: parseJsonObject(progress.quizScores),
  };
}

function computeBadges(data: {
  completedLessons: string[];
  completedQuizzes: string[];
  totalPoints: number;
  existing: string[];
}): string[] {
  const earned = new Set(data.existing);
  for (const b of badges) {
    if (earned.has(b.id)) continue;
    if (b.requiredLessons && data.completedLessons.length >= b.requiredLessons) {
      earned.add(b.id);
    }
    if (b.requiredQuizzes && data.completedQuizzes.length >= b.requiredQuizzes) {
      earned.add(b.id);
    }
    if (b.requiredPoints && data.totalPoints >= b.requiredPoints) {
      earned.add(b.id);
    }
  }
  return Array.from(earned);
}

export async function completeLesson(userId: string, lessonId: string, points: number) {
  const progress = await getOrCreateProgress(userId);
  if (progress.completedLessons.includes(lessonId)) {
    return { alreadyDone: true as const, progress };
  }

  const completedLessons = [...progress.completedLessons, lessonId];
  const user = await prisma.user.update({
    where: { id: userId },
    data: { totalPoints: { increment: points } },
  });

  const newBadges = computeBadges({
    completedLessons,
    completedQuizzes: progress.completedQuizzes,
    totalPoints: user.totalPoints,
    existing: progress.badges,
  });

  await prisma.progress.update({
    where: { userId },
    data: {
      completedLessons: JSON.stringify(completedLessons),
      badges: JSON.stringify(newBadges),
    },
  });

  return {
    alreadyDone: false as const,
    pointsAwarded: points,
    totalPoints: user.totalPoints,
    badges: newBadges,
  };
}

export async function completeExercise(userId: string, exerciseId: string, points: number) {
  const existing = await prisma.exerciseCompletion.findUnique({
    where: { userId_exerciseId: { userId, exerciseId } },
  });
  if (existing) return { alreadyDone: true as const };

  await prisma.exerciseCompletion.create({
    data: { userId, exerciseId, points },
  });

  const progress = await getOrCreateProgress(userId);
  const completedExercises = [...progress.completedExercises, exerciseId];
  const user = await prisma.user.update({
    where: { id: userId },
    data: { totalPoints: { increment: points } },
  });

  const newBadges = computeBadges({
    completedLessons: progress.completedLessons,
    completedQuizzes: progress.completedQuizzes,
    totalPoints: user.totalPoints,
    existing: progress.badges,
  });

  await prisma.progress.update({
    where: { userId },
    data: {
      completedExercises: JSON.stringify(completedExercises),
      badges: JSON.stringify(newBadges),
    },
  });

  return {
    alreadyDone: false as const,
    pointsAwarded: points,
    totalPoints: user.totalPoints,
  };
}

export async function submitQuiz(
  userId: string,
  quizId: string,
  answers: number[],
  correctAnswers: number[],
  questionPoints: number[],
  passingScore: number
) {
  let correct = 0;
  let pointsEarned = 0;
  for (let i = 0; i < correctAnswers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      correct++;
      pointsEarned += questionPoints[i] ?? 10;
    }
  }
  const score = correctAnswers.length
    ? Math.round((correct / correctAnswers.length) * 100)
    : 0;
  const passed = score >= passingScore;

  await prisma.quizAttempt.create({
    data: {
      userId,
      quizId,
      score,
      pointsEarned: passed ? pointsEarned : Math.floor(pointsEarned / 2),
      answers: JSON.stringify(answers),
      passed,
    },
  });

  const progress = await getOrCreateProgress(userId);
  const alreadyDone = progress.completedQuizzes.includes(quizId);
  const award = alreadyDone ? Math.floor(pointsEarned / 2) : pointsEarned;

  const completedQuizzes = alreadyDone
    ? progress.completedQuizzes
    : [...progress.completedQuizzes, quizId];
  const quizScores = {
    ...progress.quizScores,
    [quizId]: Math.max(score, progress.quizScores[quizId] ?? 0),
  };

  const user = await prisma.user.update({
    where: { id: userId },
    data: { totalPoints: { increment: award } },
  });

  const newBadges = computeBadges({
    completedLessons: progress.completedLessons,
    completedQuizzes,
    totalPoints: user.totalPoints,
    existing: progress.badges,
  });

  await prisma.progress.update({
    where: { userId },
    data: {
      completedQuizzes: JSON.stringify(completedQuizzes),
      quizScores: JSON.stringify(quizScores),
      badges: JSON.stringify(newBadges),
    },
  });

  return {
    score,
    passed,
    pointsEarned: award,
    totalPoints: user.totalPoints,
    correct,
    total: correctAnswers.length,
  };
}

export async function getLeaderboard(limit = 20) {
  return prisma.user.findMany({
    orderBy: { totalPoints: "desc" },
    take: limit,
    select: { id: true, name: true, totalPoints: true, image: true },
  });
}
