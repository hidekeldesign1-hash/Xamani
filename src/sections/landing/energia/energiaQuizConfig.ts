import { questions, type Archetype, type Question } from "./energiaQuestions";
import type { Answer } from "./calculateXamaniResult";

export const ENERGIA_QUIZ_TOTAL = questions.length;

export const QUIZ_MILESTONE_HOLD_MS = 5000;

export interface QuizMilestoneConfig {
  afterQuestion: number;
  title: string;
  subtitle: string;
}

/** Pantallas de transición entre bloques del cuestionario. */
export const QUIZ_MILESTONES: QuizMilestoneConfig[] = [
  {
    afterQuestion: 5,
    title: "Tu energía comienza a tomar forma.",
    subtitle: "La experiencia empieza a revelar un primer patrón.",
  },
  {
    afterQuestion: 10,
    title: "Algunos patrones empiezan a revelarse.",
    subtitle: "Ya podemos percibir cómo se expresa tu energía.",
  },
  {
    afterQuestion: 15,
    title: "Estás cerca de descubrir tu energía.",
    subtitle: "Falta muy poco para revelar tu combinación XAMANI.",
  },
];

export function getQuizMilestoneAfter(questionPosition: number): QuizMilestoneConfig | undefined {
  return QUIZ_MILESTONES.find((milestone) => milestone.afterQuestion === questionPosition);
}

export function shouldShowQuizMilestoneAfter(questionPosition: number) {
  return getQuizMilestoneAfter(questionPosition) !== undefined;
}

export type EnergiaQuizAnswer = "no" | "si";

export type EnergiaQuizQuestion = Question;

export function getEnergiaQuizQuestions(): EnergiaQuizQuestion[] {
  return questions;
}

export const ENERGIA_QUIZ_STORAGE_KEY = "xamani-energia-quiz-answers";
export const ENERGIA_QUIZ_RESULT_STORAGE_KEY = "xamani-energia-quiz-calc-result";

export function saveEnergiaQuizAnswers(answers: Answer[]) {
  sessionStorage.setItem(
    ENERGIA_QUIZ_STORAGE_KEY,
    JSON.stringify({
      answers,
      savedAt: new Date().toISOString(),
    })
  );
}

export function saveEnergiaQuizCalcResult(result: unknown) {
  sessionStorage.setItem(
    ENERGIA_QUIZ_RESULT_STORAGE_KEY,
    JSON.stringify({
      result,
      savedAt: new Date().toISOString(),
    })
  );
}

export type { Answer, Archetype };
