/**
 * SERVER-ONLY quiz answers.
 * Never import from client components.
 */
export const QUIZ_ANSWERS: Record<string, number[]> = {
  "quiz-01": [1, 2, 1, 1, 1, 1],
  "quiz-02": [2, 2, 2, 1, 1, 0],
  "quiz-03": [1, 0, 1, 1],
  "quiz-04": [1, 1, 1, 1, 1],
  "quiz-05": [1, 1, 1, 1],
  "quiz-06": [1, 1, 1, 1, 1],
  "quiz-07": [1, 1, 1, 2],
  "quiz-08": [1, 1, 1],
  "quiz-09": [1, 0, 0, 1, 0],
  "quiz-10": [1, 1, 2, 1],
  "quiz-midterm": [1, 2, 1, 1, 1, 1, 1, 1],
  "quiz-final": [1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
};

export const QUIZ_POINTS: Record<string, number[]> = {
  "quiz-01": [10, 10, 10, 10, 10, 10],
  "quiz-02": [10, 10, 10, 10, 10, 10],
  "quiz-03": [10, 10, 10, 10],
  "quiz-04": [10, 10, 10, 10, 10],
  "quiz-05": [10, 10, 10, 10],
  "quiz-06": [10, 10, 10, 10, 10],
  "quiz-07": [10, 10, 10, 10],
  "quiz-08": [10, 10, 10],
  "quiz-09": [10, 10, 10, 10, 10],
  "quiz-10": [10, 10, 10, 10],
  "quiz-midterm": [10, 10, 10, 10, 10, 10, 10, 10],
  "quiz-final": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
};

export const QUIZ_PASSING: Record<string, number> = {
  "quiz-01": 70,
  "quiz-02": 70,
  "quiz-03": 70,
  "quiz-04": 70,
  "quiz-05": 70,
  "quiz-06": 70,
  "quiz-07": 70,
  "quiz-08": 70,
  "quiz-09": 70,
  "quiz-10": 70,
  "quiz-midterm": 75,
  "quiz-final": 80,
};
