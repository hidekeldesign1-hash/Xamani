import type { Archetype } from "./energiaQuestions";

export type Answer = {
  questionId: string;
  archetype: Archetype;
  position: number;
  value: boolean;
};

type RankedArchetype = {
  archetype: Archetype;
  score: number;
  lastAffirmativePosition: number;
};

export type XamaniQuizResult =
  | {
      requiresManualTieBreaker: true;
      scores: Record<string, number>;
    }
  | {
      requiresManualTieBreaker: false;
      dominant: Archetype;
      complementary: Archetype;
      combination: string;
      scores: Record<string, number>;
      ranking: RankedArchetype[];
    };

export function calculateXamaniResult(answers: Answer[]): XamaniQuizResult {
  const archetypes: Archetype[] = ["MEYAJ", "NEPA", "BALAM", "KAN"];

  const ranked: RankedArchetype[] = archetypes.map((archetype) => {
    const archetypeAnswers = answers.filter((answer) => answer.archetype === archetype);

    const affirmativeAnswers = archetypeAnswers.filter((answer) => answer.value);

    return {
      archetype,
      score: affirmativeAnswers.length,
      lastAffirmativePosition:
        affirmativeAnswers.length > 0
          ? Math.max(...affirmativeAnswers.map((answer) => answer.position))
          : -1,
    };
  });

  ranked.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return b.lastAffirmativePosition - a.lastAffirmativePosition;
  });

  const allScoresAreZero = ranked.every((item) => item.score === 0);

  if (allScoresAreZero) {
    return {
      requiresManualTieBreaker: true,
      scores: Object.fromEntries(ranked.map((item) => [item.archetype.toLowerCase(), item.score])),
    };
  }

  const dominant = ranked[0].archetype;
  const complementary = ranked[1].archetype;

  return {
    requiresManualTieBreaker: false,
    dominant,
    complementary,
    combination: `${dominant}_${complementary}`,
    scores: Object.fromEntries(ranked.map((item) => [item.archetype.toLowerCase(), item.score])),
    ranking: ranked,
  };
}
