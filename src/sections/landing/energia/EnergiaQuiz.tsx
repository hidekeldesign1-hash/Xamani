"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import Isotipo from "@/components/brand/Isotipo";
import {
  ENERGIA_QUIZ_TOTAL,
  getEnergiaQuizQuestions,
  getQuizMilestoneAfter,
  QUIZ_MILESTONE_HOLD_MS,
  saveEnergiaQuizAnswers,
  saveEnergiaQuizCalcResult,
  type Answer,
  type EnergiaQuizAnswer,
  type QuizMilestoneConfig,
} from "./energiaQuizConfig";
import EnergiaQuizMilestone from "./EnergiaQuizMilestone";
import EnergiaRevelacion from "./EnergiaRevelacion";
import {
  calculateXamaniResult,
  type XamaniQuizResult,
} from "./calculateXamaniResult";
import {
  energiaResultFromCalculation,
  saveEnergiaResult,
  loadEnergiaResult,
  type EnergiaResult,
} from "./energiaTypes";

const TIMING = {
  lineDraw: 420,
  lineOut: 240,
  textIn: 300,
} as const;

export const QUIZ_TRANSITION_TOTAL_MS = TIMING.lineDraw + TIMING.lineOut + TIMING.textIn;

type QuizPhase = "question" | "milestone" | "complete";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

interface EnergiaQuizProps {
  questionIndex: number;
  onQuestionIndexChange: (index: number) => void;
  onCardPulse?: () => void;
  onComplete?: () => void;
  onPhaseChange?: (phase: "question" | "milestone" | "complete") => void;
  onInteractionLockChange?: (locked: boolean) => void;
  revelacionBackSignal?: number;
  startInComplete?: boolean;
}

function formatQuestionNumber(value: number) {
  return String(value).padStart(2, "0");
}

function AnswerButton({
  label,
  variant,
  disabled,
  onClick,
}: {
  label: string;
  variant: EnergiaQuizAnswer;
  disabled: boolean;
  onClick: () => void;
}) {
  const isNo = variant === "no";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-[3.25rem] flex-1 touch-manipulation items-center justify-center rounded-2xl border bg-[#0b1520]/90 px-3 py-4 font-ambit text-[0.62rem] uppercase leading-snug tracking-[0.12em] text-xamani-silver transition-[border-color,box-shadow,opacity,transform] duration-300 ease-out-expo disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[3.75rem] sm:px-5 sm:text-[0.68rem] sm:tracking-[0.18em] md:min-h-[4.25rem] md:text-xs md:tracking-[0.2em] ${
        isNo
          ? "border-xamani-cyan/40 shadow-[0_0_22px_rgba(110,196,217,0.12)] hover:border-xamani-cyan/60 hover:shadow-glow active:border-xamani-cyan/70 active:shadow-[0_0_28px_rgba(110,196,217,0.35)]"
          : "border-xamani-wine/45 shadow-[0_0_22px_rgba(119,19,53,0.14)] hover:border-xamani-wine/65 hover:shadow-glow-wine active:border-xamani-wine/75 active:shadow-[0_0_28px_rgba(119,19,53,0.38)]"
      }`}
    >
      {label}
    </button>
  );
}

function TransitionLine({
  visible,
  centered = "question",
}: {
  visible: boolean;
  centered?: "question" | "panel";
}) {
  const positionClass =
    centered === "panel"
      ? "absolute inset-x-4 top-1/2 z-20 -translate-y-1/2 sm:inset-x-6 md:inset-x-8"
      : "absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-2 sm:px-4";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={`transition-line-${centered}`}
          className={`pointer-events-none ${positionClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="relative h-px w-full bg-gradient-to-r from-xamani-cyan via-xamani-silver/45 to-xamani-wine shadow-[0_0_14px_rgba(110,196,217,0.35)]"
            initial={{ scaleX: 0, opacity: 0.6 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-xamani-silver/80">
            <Isotipo className="h-full w-full" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function EnergiaQuiz({
  questionIndex,
  onQuestionIndexChange,
  onCardPulse,
  onComplete,
  onPhaseChange,
  onInteractionLockChange,
  revelacionBackSignal = 0,
  startInComplete = false,
}: EnergiaQuizProps) {
  const prefersReducedMotion = useReducedMotion();
  const questions = useMemo(() => getEnergiaQuizQuestions(), []);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentStep, setCurrentStep] = useState(questionIndex);
  const [quizResult, setQuizResult] = useState<XamaniQuizResult | null>(null);

  const [phase, setPhase] = useState<QuizPhase>(startInComplete ? "complete" : "question");
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [lineVisible, setLineVisible] = useState(false);
  const [lineScope, setLineScope] = useState<"question" | "panel">("question");
  const [viewVisible, setViewVisible] = useState(true);
  const [activeMilestone, setActiveMilestone] = useState<QuizMilestoneConfig | null>(null);
  const [result, setResult] = useState<EnergiaResult | null>(() =>
    startInComplete ? loadEnergiaResult() : null
  );

  useEffect(() => {
    setCurrentStep(questionIndex);
    setAnswers((current) => current.slice(0, questionIndex));
  }, [questionIndex]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / ENERGIA_QUIZ_TOTAL) * 100;
  const ease = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [onPhaseChange, phase]);

  useEffect(() => {
    onInteractionLockChange?.(isAdvancing || phase === "milestone");
  }, [isAdvancing, onInteractionLockChange, phase]);

  useEffect(() => {
    if (revelacionBackSignal <= 0 || phase !== "complete") return;

    setResult(null);
    setQuizResult(null);
    setActiveMilestone(null);
    setAnswers((current) => current.slice(0, Math.max(0, currentStep)));
    setPhase("question");
    setViewVisible(true);
    setQuestionVisible(true);
    setLineVisible(false);
  }, [currentStep, phase, revelacionBackSignal]);

  const runQuestionTransition = useCallback(
    async (swapQuestion: () => void) => {
      if (prefersReducedMotion) {
        swapQuestion();
        return;
      }

      setLineScope("question");
      setQuestionVisible(false);
      setLineVisible(true);
      await wait(TIMING.lineDraw);

      setLineVisible(false);
      await wait(TIMING.lineOut);

      swapQuestion();
      setQuestionVisible(true);
      await wait(TIMING.textIn);
    },
    [prefersReducedMotion]
  );

  const runViewTransition = useCallback(
    async (swapView: () => void) => {
      if (prefersReducedMotion) {
        swapView();
        return;
      }

      setLineScope("panel");
      setViewVisible(false);
      setLineVisible(true);
      await wait(TIMING.lineDraw);

      setLineVisible(false);
      await wait(TIMING.lineOut);

      swapView();
      setViewVisible(true);
      await wait(TIMING.textIn);
    },
    [prefersReducedMotion]
  );

  const handleAnswer = useCallback(
    async (answer: EnergiaQuizAnswer) => {
      if (isAdvancing || !currentQuestion || phase !== "question") return;

      setIsAdvancing(true);
      onCardPulse?.();

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        archetype: currentQuestion.archetype,
        position: currentQuestion.position,
        value: answer === "si",
      };

      const updatedAnswers = [...answers.slice(0, currentStep), newAnswer];

      const commitAnswers = () => {
        setAnswers(updatedAnswers);
      };

      const isLast = currentStep >= ENERGIA_QUIZ_TOTAL - 1;
      const milestone = getQuizMilestoneAfter(currentQuestion.position);

      if (isLast) {
        await runViewTransition(() => {
          commitAnswers();
          saveEnergiaQuizAnswers(updatedAnswers);

          const calculated = calculateXamaniResult(updatedAnswers);
          setQuizResult(calculated);
          saveEnergiaQuizCalcResult(calculated);

          const nextResult = calculated.requiresManualTieBreaker
            ? energiaResultFromCalculation({
                dominant: "MEYAJ",
                complementary: "NEPA",
                scores: calculated.scores,
                requiresManualTieBreaker: true,
              })
            : energiaResultFromCalculation({
                dominant: calculated.dominant,
                complementary: calculated.complementary,
                combination: calculated.combination,
                scores: calculated.scores,
                requiresManualTieBreaker: false,
              });

          saveEnergiaResult(nextResult);
          setResult(nextResult);
          setPhase("complete");
        });
        onComplete?.();
        setIsAdvancing(false);
        return;
      }

      if (milestone) {
        await runViewTransition(() => {
          commitAnswers();
          setActiveMilestone(milestone);
          setPhase("milestone");
        });

        await wait(QUIZ_MILESTONE_HOLD_MS);

        await runViewTransition(() => {
          setPhase("question");
          setActiveMilestone(null);
          const nextStep = currentStep + 1;
          setCurrentStep(nextStep);
          onQuestionIndexChange(nextStep);
        });

        setIsAdvancing(false);
        return;
      }

      await runQuestionTransition(() => {
        commitAnswers();
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        onQuestionIndexChange(nextStep);
      });

      setIsAdvancing(false);
    },
    [
      answers,
      currentQuestion,
      currentStep,
      isAdvancing,
      onCardPulse,
      onComplete,
      onQuestionIndexChange,
      phase,
      runQuestionTransition,
      runViewTransition,
    ]
  );

  if (!currentQuestion && phase === "question") return null;

  const showQuestionLayout =
    phase === "question" || phase === "milestone" || phase === "complete";
  const questionLayoutHidden = phase === "milestone" || phase === "complete";

  return (
    <div className="relative w-full">
      <TransitionLine visible={lineVisible && lineScope === "panel"} centered="panel" />

      {showQuestionLayout && currentQuestion ? (
        <motion.div
          className={`flex w-full flex-col items-center text-center ${
            questionLayoutHidden ? "invisible" : ""
          }`}
          animate={{ opacity: questionLayoutHidden ? 0 : viewVisible ? 1 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease }}
          aria-hidden={questionLayoutHidden}
        >
          <div className="mb-4 h-5 w-5 text-xamani-silver/75 sm:mb-5 sm:h-6 sm:w-6">
            <Isotipo className="h-full w-full" />
          </div>

          <p className="font-archia text-[0.58rem] uppercase tracking-[0.28em] text-xamani-silver/70 sm:text-micro">
            Pregunta {formatQuestionNumber(currentStep + 1)} / {ENERGIA_QUIZ_TOTAL}
          </p>

          <div className="mt-3 w-full max-w-md sm:mt-4 md:max-w-xl">
            <div
              className="h-1.5 overflow-hidden rounded-pill bg-white/[0.08]"
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={ENERGIA_QUIZ_TOTAL}
              aria-label={`Progreso del cuestionario: pregunta ${currentStep + 1} de ${ENERGIA_QUIZ_TOTAL}`}
            >
              <motion.div
                className="h-full rounded-pill bg-gradient-to-r from-xamani-cyan via-xamani-cyan/85 to-xamani-cyan/70 shadow-[0_0_16px_rgba(110,196,217,0.45)]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease }
                }
              />
            </div>
          </div>

          <div className="relative mt-8 flex w-full min-h-[5.5rem] items-center justify-center sm:mt-10 sm:min-h-[6rem] md:mt-9 md:min-h-[6.5rem]">
            <TransitionLine
              visible={lineVisible && lineScope === "question"}
              centered="question"
            />

            <AnimatePresence mode="wait" initial={false}>
              {questionVisible ? (
                <motion.div
                  key={currentQuestion.id}
                  initial={
                    prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
                  }
                  transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease }}
                  className="mx-auto max-w-2xl px-1 md:max-w-3xl"
                >
                  <h2 className="text-balance font-ambit text-[clamp(1.05rem,4.2vw,1.65rem)] font-light leading-snug tracking-[0.03em] text-xamani-silver sm:text-[clamp(1.25rem,2.8vw,1.85rem)] md:leading-relaxed">
                    {currentQuestion.text}
                  </h2>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4 md:mt-9 md:max-w-3xl">
            <AnswerButton
              label="No me identifica"
              variant="no"
              disabled={isAdvancing}
              onClick={() => handleAnswer("no")}
            />
            <AnswerButton
              label="Sí me identifica"
              variant="si"
              disabled={isAdvancing}
              onClick={() => handleAnswer("si")}
            />
          </div>

          <div className="mt-8 space-y-1 sm:mt-9">
            <p className="font-archia text-xs text-xamani-silver/55 sm:text-sm">
              Selecciona la opción que más te represente.
            </p>
            <p className="font-archia text-xs text-xamani-silver/45 sm:text-sm">
              La experiencia avanza automáticamente con cada respuesta.
            </p>
          </div>
        </motion.div>
      ) : null}

      {phase === "milestone" && activeMilestone ? (
        <motion.div
          className="absolute inset-0 z-10 flex w-full flex-col overflow-hidden"
          animate={{ opacity: viewVisible ? 1 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease }}
        >
          <EnergiaQuizMilestone milestone={activeMilestone} />
        </motion.div>
      ) : null}

      {phase === "complete" && result ? (
        <motion.div
          className="absolute inset-0 z-10 flex w-full flex-col overflow-hidden"
          animate={{ opacity: viewVisible ? 1 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease }}
        >
          <EnergiaRevelacion result={result} />
        </motion.div>
      ) : null}
    </div>
  );
}
