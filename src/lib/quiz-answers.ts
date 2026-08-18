/**
 * SERVER-ONLY quiz answers.
 * Never import this file from client components.
 * Correct indices are validated exclusively on the server.
 */
export const QUIZ_ANSWERS: Record<string, number[]> = {
  "quiz-01": [1, 2, 1, 1, 1],
  "quiz-02": [2, 2, 2, 1, 2, 2],
  "quiz-03": [1, 1, 1, 1],
  "quiz-04": [1, 1, 1],
  "quiz-05": [1, 1, 1, 1],
  "quiz-06": [1, 1, 1],
  "quiz-07": [1, 0, 1, 0, 1, 1, 1, 1],
};

export const QUIZ_POINTS: Record<string, number[]> = {
  "quiz-01": [10, 10, 10, 10, 10],
  "quiz-02": [10, 10, 10, 10, 10, 10],
  "quiz-03": [10, 10, 10, 10],
  "quiz-04": [10, 10, 10],
  "quiz-05": [10, 10, 10, 10],
  "quiz-06": [10, 10, 10],
  "quiz-07": [10, 10, 10, 10, 10, 10, 10, 10],
};

export const QUIZ_PASSING: Record<string, number> = {
  "quiz-01": 70,
  "quiz-02": 70,
  "quiz-03": 70,
  "quiz-04": 70,
  "quiz-05": 70,
  "quiz-06": 70,
  "quiz-07": 75,
};
