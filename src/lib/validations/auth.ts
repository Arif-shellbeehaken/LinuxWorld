import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(80, "নাম খুব বড়")
    .trim(),
  email: z
    .string()
    .email("সঠিক ইমেইল দিন")
    .max(255)
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
    .max(128)
    .regex(/[A-Za-z]/, "পাসওয়ার্ডে অক্ষর থাকতে হবে")
    .regex(/[0-9]/, "পাসওয়ার্ডে সংখ্যা থাকতে হবে"),
});

export const loginSchema = z.object({
  email: z.string().email("সঠিক ইমেইল দিন").toLowerCase().trim(),
  password: z.string().min(1, "পাসওয়ার্ড দিন"),
});

export const quizSubmitSchema = z.object({
  quizId: z.string().min(1),
  answers: z.array(z.number().int().min(0).max(20)),
});

export const lessonCompleteSchema = z.object({
  lessonId: z.string().min(1),
  points: z.number().int().min(0).max(500),
});

export const exerciseCompleteSchema = z.object({
  exerciseId: z.string().min(1),
  points: z.number().int().min(0).max(500),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
