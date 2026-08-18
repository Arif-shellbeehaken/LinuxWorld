export type Difficulty = "সহজ" | "মাঝারি" | "কঠিন";

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string; // Markdown-like content in Bangla
  durationMinutes: number;
  order: number;
  pointsReward: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  lessons: Lesson[];
  totalPoints: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  moduleId: string;
  questions: Question[];
  timeLimitMinutes: number;
  passingScore: number;
}

export interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  difficulty: Difficulty;
  instructions: string[];
  expectedCommands?: string[];
  hints: string[];
  pointsReward: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredPoints?: number;
  requiredLessons?: number;
  requiredQuizzes?: number;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  completedQuizzes: string[];
  completedExercises: string[];
  totalPoints: number;
  badges: string[];
  quizScores: Record<string, number>;
  rank?: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  level: string;
  avatar?: string;
}
