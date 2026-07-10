"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import EnergiaIntakeForm from "./EnergiaIntakeForm";
import EnergiaProcessCard, { ENERGIA_PROCESS_CARD_WIDTH } from "./EnergiaProcessCard";
import EnergiaQuiz from "./EnergiaQuiz";
import EnergiaResultado from "./EnergiaResultado";
import { loadEnergiaResult, type EnergiaResult } from "./energiaTypes";

type ProcessPhase = "intake" | "quiz" | "resultado";

interface EnergiaProcessFlowProps {
  onBackToIntro: () => void;
  onResultadoChange?: (isResultado: boolean) => void;
}

export default function EnergiaProcessFlow({
  onBackToIntro,
  onResultadoChange,
}: EnergiaProcessFlowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<ProcessPhase>("intake");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizPhase, setQuizPhase] = useState<"question" | "milestone" | "complete">("question");
  const [quizLocked, setQuizLocked] = useState(false);
  const [cardPulse, setCardPulse] = useState(false);
  const [revelacionBackSignal, setRevelacionBackSignal] = useState(0);
  const [result, setResult] = useState<EnergiaResult | null>(null);
  const [resumeComplete, setResumeComplete] = useState(false);
  const transitionLock = useRef(false);

  const contentTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  const goToPhase = (next: ProcessPhase) => {
    setPhase(next);
    onResultadoChange?.(next === "resultado");
  };

  const handleBack = () => {
    if (phase === "resultado") {
      setResumeComplete(true);
      goToPhase("quiz");
      return;
    }

    if (phase === "quiz" && quizPhase === "milestone") return;
    if (phase === "quiz" && quizLocked && quizPhase !== "complete") return;

    if (phase === "quiz" && quizPhase === "complete") {
      setRevelacionBackSignal((value) => value + 1);
      return;
    }

    if (phase === "quiz") {
      if (quizIndex > 0) {
        setQuizIndex((index) => index - 1);
        return;
      }
      goToPhase("intake");
      return;
    }
    onBackToIntro();
  };

  const triggerCardPulse = useCallback(() => {
    if (prefersReducedMotion || transitionLock.current) return;

    transitionLock.current = true;
    setCardPulse(true);

    window.setTimeout(() => {
      setCardPulse(false);
      transitionLock.current = false;
    }, 580);
  }, [prefersReducedMotion]);

  const openResultado = () => {
    const stored = loadEnergiaResult();
    if (!stored) return;
    setResult(stored);
    setResumeComplete(true);
    goToPhase("resultado");
  };

  const backLabel =
    phase === "resultado"
      ? "Regresar a la revelación"
      : phase === "quiz"
        ? quizPhase === "complete"
          ? "Regresar a la última pregunta"
          : quizIndex > 0
            ? "Regresar a la pregunta anterior"
            : "Regresar al formulario"
        : "Regresar a Descubre tu energía";

  const showResultadoButton = phase === "quiz" && quizPhase === "complete";

  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <AnimatePresence mode="wait" initial={false}>
        {phase === "resultado" && result ? (
          <motion.div
            key="energia-resultado"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            transition={contentTransition}
            className="w-full"
          >
            <EnergiaResultado result={result} onBack={handleBack} />
          </motion.div>
        ) : (
          <motion.div
            key="energia-process-card"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
            transition={contentTransition}
            className="flex w-full flex-col items-center"
          >
            <EnergiaProcessCard
              onBack={handleBack}
              backLabel={backLabel}
              cardPulse={cardPulse}
            >
              <AnimatePresence mode="wait" initial={false}>
                {phase === "intake" ? (
                  <motion.div
                    key="energia-intake"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
                    transition={contentTransition}
                  >
                    <EnergiaIntakeForm
                      onContinue={() => {
                        setQuizIndex(0);
                        setResumeComplete(false);
                        goToPhase("quiz");
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="energia-quiz"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
                    transition={contentTransition}
                  >
                    <EnergiaQuiz
                      questionIndex={quizIndex}
                      onQuestionIndexChange={setQuizIndex}
                      onCardPulse={triggerCardPulse}
                      onPhaseChange={(nextPhase) => {
                        setQuizPhase(nextPhase);
                        if (nextPhase === "question") {
                          setResumeComplete(false);
                        }
                      }}
                      onInteractionLockChange={setQuizLocked}
                      revelacionBackSignal={revelacionBackSignal}
                      startInComplete={resumeComplete}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </EnergiaProcessCard>

            <AnimatePresence>
              {showResultadoButton ? (
                <motion.div
                  key="resultado-cta"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  transition={contentTransition}
                  className={`${ENERGIA_PROCESS_CARD_WIDTH} mt-6 flex justify-center pb-[env(safe-area-inset-bottom)] sm:mt-7`}
                >
                  <div className="rounded-pill bg-gradient-to-r from-xamani-cyan via-xamani-silver/35 to-xamani-wine p-px shadow-[0_0_28px_rgba(110,196,217,0.12)]">
                    <button
                      type="button"
                      onClick={openResultado}
                      className="inline-flex min-h-[48px] min-w-[min(82vw,14rem)] touch-manipulation items-center justify-center gap-3 rounded-pill bg-[#0b1520]/92 px-10 py-3.5 font-ambit text-[0.68rem] uppercase tracking-[0.22em] text-xamani-silver transition-colors duration-300 ease-out-expo hover:bg-[#0f1d2c]/95 active:scale-[0.98] sm:min-w-[16rem] sm:px-12 sm:text-xs sm:tracking-[0.32em]"
                    >
                      Resultado
                      <span aria-hidden="true" className="text-base leading-none">
                        →
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
