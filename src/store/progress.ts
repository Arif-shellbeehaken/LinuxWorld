"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProgress, Badge } from "@/types";
import { badges } from "@/data/modules";
import { getLevel } from "@/lib/utils";

interface ProgressState extends UserProgress {
  completeLesson: (lessonId: string, points: number) => void;
  completeQuiz: (quizId: string, score: number, pointsEarned: number) => void;
  completeExercise: (exerciseId: string, points: number) => void;
  addBadge: (badgeId: string) => void;
  checkAndAwardBadges: () => void;
  resetProgress: () => void;
}

const initialState: UserProgress = {
  userId: "local-user",
  completedLessons: [],
  completedQuizzes: [],
  completedExercises: [],
  totalPoints: 0,
  badges: [],
  quizScores: {},
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeLesson: (lessonId, points) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;

        set({
          completedLessons: [...state.completedLessons, lessonId],
          totalPoints: state.totalPoints + points,
        });
        get().checkAndAwardBadges();
      },

      completeQuiz: (quizId, score, pointsEarned) => {
        const state = get();
        const alreadyDone = state.completedQuizzes.includes(quizId);

        set({
          completedQuizzes: alreadyDone
            ? state.completedQuizzes
            : [...state.completedQuizzes, quizId],
          totalPoints: state.totalPoints + (alreadyDone ? Math.floor(pointsEarned / 2) : pointsEarned),
          quizScores: { ...state.quizScores, [quizId]: Math.max(score, state.quizScores[quizId] || 0) },
        });
        get().checkAndAwardBadges();
      },

      completeExercise: (exerciseId, points) => {
        const state = get();
        if (state.completedExercises.includes(exerciseId)) return;

        set({
          completedExercises: [...state.completedExercises, exerciseId],
          totalPoints: state.totalPoints + points,
        });
        get().checkAndAwardBadges();
      },

      addBadge: (badgeId) => {
        const state = get();
        if (state.badges.includes(badgeId)) return;
        set({ badges: [...state.badges, badgeId] });
      },

      checkAndAwardBadges: () => {
        const state = get();
        const toAward: string[] = [];

        badges.forEach((badge) => {
          if (state.badges.includes(badge.id)) return;

          if (badge.requiredLessons && state.completedLessons.length >= badge.requiredLessons) {
            toAward.push(badge.id);
          }
          if (badge.requiredPoints && state.totalPoints >= badge.requiredPoints) {
            toAward.push(badge.id);
          }
          if (badge.requiredQuizzes && state.completedQuizzes.length >= badge.requiredQuizzes) {
            toAward.push(badge.id);
          }
        });

        if (toAward.length > 0) {
          set({ badges: [...state.badges, ...toAward] });
        }
      },

      resetProgress: () => set(initialState),
    }),
    {
      name: "linux-hero-progress",
    }
  )
);

export function getUserLevel(points: number) {
  return getLevel(points);
}
