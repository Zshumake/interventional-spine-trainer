import {
  getAllTopics,
  getAllQuizBanks,
  getAllChecklists,
  getAllComplications,
  getAllPathways,
  getAllCases,
} from "./content";
import { db } from "./db";
import { studyProgress, quizCards, quizHistory } from "./schema";
import { eq } from "drizzle-orm";
import { State } from "ts-fsrs";

// ---------------------------------------------------------------------------
// Topic coverage: sections studied vs total
// ---------------------------------------------------------------------------

export function getTopicCoverage(): {
  topicId: string;
  title: string;
  studied: number;
  total: number;
}[] {
  const topics = getAllTopics();

  // Pull all study progress rows once
  let progressRows: { topicId: string; sectionId: string; studied: boolean | null }[] = [];
  try {
    progressRows = db.select().from(studyProgress).all() ?? [];
  } catch {
    progressRows = [];
  }

  return topics.map((topic) => {
    const totalSections = topic.sections.length;
    const studied = progressRows.filter(
      (r) => r.topicId === topic.id && r.studied
    ).length;
    return { topicId: topic.id, title: topic.title, studied, total: totalSections };
  });
}

// ---------------------------------------------------------------------------
// Quiz accuracy per topic
// ---------------------------------------------------------------------------

export function getQuizAccuracy(): {
  topicId: string;
  correct: number;
  total: number;
  accuracy: number;
}[] {
  const quizBanks = getAllQuizBanks();

  let historyRows: { topicId: string; correct: boolean | null }[] = [];
  try {
    historyRows = db.select().from(quizHistory).all() ?? [];
  } catch {
    historyRows = [];
  }

  return quizBanks.map((bank) => {
    const rows = historyRows.filter((r) => r.topicId === bank.topicId);
    const correct = rows.filter((r) => r.correct).length;
    const total = rows.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { topicId: bank.topicId, correct, total, accuracy };
  });
}

// ---------------------------------------------------------------------------
// FSRS maturity: % of cards in Review state vs all tracked cards
// ---------------------------------------------------------------------------

export function getFsrsMaturity(): {
  mature: number;
  total: number;
  percentage: number;
} {
  let cardRows: { state: number }[] = [];
  try {
    cardRows = db.select().from(quizCards).all() ?? [];
  } catch {
    cardRows = [];
  }

  const total = cardRows.length;
  const mature = cardRows.filter((c) => c.state === State.Review).length;
  const percentage = total > 0 ? Math.round((mature / total) * 100) : 0;
  return { mature, total, percentage };
}

// ---------------------------------------------------------------------------
// Overall readiness score (0-100) with weighted breakdown
// ---------------------------------------------------------------------------

export function getReadinessScore(): {
  overall: number;
  breakdown: { category: string; score: number; weight: number }[];
  weakest: string[];
  strongest: string[];
} {
  // 1. Topic coverage (20%)
  const coverage = getTopicCoverage();
  const totalSections = coverage.reduce((s, t) => s + t.total, 0);
  const studiedSections = coverage.reduce((s, t) => s + t.studied, 0);
  const coverageScore =
    totalSections > 0 ? Math.round((studiedSections / totalSections) * 100) : 0;

  // 2. Quiz accuracy (30%)
  const accuracy = getQuizAccuracy();
  const allCorrect = accuracy.reduce((s, a) => s + a.correct, 0);
  const allAttempted = accuracy.reduce((s, a) => s + a.total, 0);
  const accuracyScore =
    allAttempted > 0 ? Math.round((allCorrect / allAttempted) * 100) : 0;

  // 3. FSRS maturity (20%)
  const maturity = getFsrsMaturity();
  const maturityScore = maturity.percentage;

  // 4. Checklist completion (15%) — count checklists available, 0 completed for now
  const checklists = getAllChecklists();
  const checklistScore = 0; // No tracking yet

  // 5. Complication scenarios (10%)
  const complications = getAllComplications();
  const complicationScore = 0; // No tracking yet

  // 6. Study streak (5%) — not tracked yet
  const streakScore = 0;

  const breakdown = [
    { category: "Topic Coverage", score: coverageScore, weight: 0.2 },
    { category: "Quiz Accuracy", score: accuracyScore, weight: 0.3 },
    { category: "FSRS Maturity", score: maturityScore, weight: 0.2 },
    { category: "Checklists", score: checklistScore, weight: 0.15 },
    { category: "Complications", score: complicationScore, weight: 0.1 },
    { category: "Study Streak", score: streakScore, weight: 0.05 },
  ];

  const overall = Math.round(
    breakdown.reduce((sum, b) => sum + b.score * b.weight, 0)
  );

  // Per-topic scores for weakest / strongest
  const topicScores = coverage.map((c) => {
    const acc = accuracy.find((a) => a.topicId === c.topicId);
    const covPct = c.total > 0 ? (c.studied / c.total) * 100 : 0;
    const accPct = acc ? acc.accuracy : 0;
    const combined = Math.round(covPct * 0.4 + accPct * 0.6);
    return { topicId: c.topicId, title: c.title, score: combined };
  });

  const sorted = [...topicScores].sort((a, b) => a.score - b.score);
  const weakest = sorted.slice(0, 3).map((t) => t.title);
  const strongest = sorted
    .slice(-3)
    .reverse()
    .map((t) => t.title);

  return { overall, breakdown, weakest, strongest };
}

// ---------------------------------------------------------------------------
// Daily session recommendations
// ---------------------------------------------------------------------------

export function getDailySession(): {
  dueCards: number;
  suggestedTopics: string[];
  suggestedComplication: string | null;
} {
  // Due cards
  let dueCards = 0;
  try {
    const now = new Date();
    const allCards = db.select().from(quizCards).all() ?? [];
    dueCards = (allCards as any[]).filter((c: any) => {
      const dueDate = c.due instanceof Date ? c.due : new Date(c.due);
      return dueDate <= now;
    }).length;
  } catch {
    dueCards = 0;
  }

  // Suggest weakest topics
  const coverage = getTopicCoverage();
  const leastStudied = [...coverage]
    .sort((a, b) => {
      const pctA = a.total > 0 ? a.studied / a.total : 0;
      const pctB = b.total > 0 ? b.studied / b.total : 0;
      return pctA - pctB;
    })
    .slice(0, 3)
    .map((t) => t.title);

  // Suggest a random complication scenario
  const complications = getAllComplications();
  const suggestedComplication =
    complications.length > 0
      ? complications[Math.floor(Math.random() * complications.length)].title
      : null;

  return {
    dueCards,
    suggestedTopics: leastStudied,
    suggestedComplication,
  };
}

// ---------------------------------------------------------------------------
// Content stats (used by dashboard)
// ---------------------------------------------------------------------------

export function getContentStats() {
  const topics = getAllTopics();
  const quizBanks = getAllQuizBanks();
  const pathways = getAllPathways();
  const checklists = getAllChecklists();
  const cases = getAllCases();
  const complications = getAllComplications();
  const totalQuestions = quizBanks.reduce(
    (sum, b) => sum + b.questions.length,
    0
  );

  return {
    topicCount: topics.length,
    questionCount: totalQuestions,
    pathwayCount: pathways.length,
    checklistCount: checklists.length,
    caseCount: cases.length,
    complicationCount: complications.length,
  };
}
