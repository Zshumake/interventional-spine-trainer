import { fsrs, createEmptyCard, type Card, type Grade, Rating, State } from "ts-fsrs";
import { db } from "./db";
import { quizCards, quizHistory } from "./schema";
import { eq } from "drizzle-orm";

// Initialize FSRS with default parameters
const f = fsrs();

/**
 * Get or create a card for a question. If the card doesn't exist in the DB,
 * creates a new empty card and inserts it.
 */
export function getOrCreateCard(questionId: string, topicId: string): Card {
  const existing = db
    .select()
    .from(quizCards)
    .where(eq(quizCards.questionId, questionId))
    .get();

  if (existing) {
    return dbRowToCard(existing);
  }

  // Create a new empty card
  const card = createEmptyCard();
  db.insert(quizCards)
    .values({
      questionId,
      topicId,
      due: card.due,
      stability: card.stability,
      difficulty: card.difficulty,
      elapsedDays: card.elapsed_days,
      scheduledDays: card.scheduled_days,
      reps: card.reps,
      lapses: card.lapses,
      state: card.state,
      lastReview: card.last_review ?? null,
    })
    .run();

  return card;
}

/**
 * Review a card with a given rating and persist the result.
 */
export function reviewCard(
  questionId: string,
  topicId: string,
  grade: Grade,
  userAnswer: string,
  correct: boolean
) {
  const card = getOrCreateCard(questionId, topicId);
  const now = new Date();

  // Get scheduling info for this grade
  const schedulingCards = f.repeat(card, now);
  const result = schedulingCards[grade];

  // Update the card in the database
  db.update(quizCards)
    .set({
      due: result.card.due,
      stability: result.card.stability,
      difficulty: result.card.difficulty,
      elapsedDays: result.card.elapsed_days,
      scheduledDays: result.card.scheduled_days,
      reps: result.card.reps,
      lapses: result.card.lapses,
      state: result.card.state,
      lastReview: result.card.last_review ?? null,
    })
    .where(eq(quizCards.questionId, questionId))
    .run();

  // Record the review in history
  db.insert(quizHistory)
    .values({
      questionId,
      topicId,
      userAnswer,
      correct,
      rating: grade,
      answeredAt: now,
    })
    .run();

  return result;
}

/**
 * Get all cards that are due for review (due date <= now).
 */
export function getDueCards(topicId?: string) {
  const now = new Date();
  const allCards = topicId
    ? db.select().from(quizCards).where(eq(quizCards.topicId, topicId)).all()
    : db.select().from(quizCards).all();

  return allCards.filter((card) => {
    const dueDate = card.due instanceof Date ? card.due : new Date(card.due);
    return dueDate <= now;
  });
}

/**
 * Get card counts by state for a topic (or all topics).
 */
export function getCardStats(topicId?: string) {
  const allCards = topicId
    ? db.select().from(quizCards).where(eq(quizCards.topicId, topicId)).all()
    : db.select().from(quizCards).all();

  const now = new Date();
  const dueCount = allCards.filter((c) => {
    const dueDate = c.due instanceof Date ? c.due : new Date(c.due);
    return dueDate <= now;
  }).length;

  return {
    total: allCards.length,
    new: allCards.filter((c) => c.state === State.New).length,
    learning: allCards.filter((c) => c.state === State.Learning).length,
    review: allCards.filter((c) => c.state === State.Review).length,
    relearning: allCards.filter((c) => c.state === State.Relearning).length,
    due: dueCount,
  };
}

/**
 * Initialize cards for all questions in a quiz bank that don't already have cards.
 */
export function initializeCardsForQuiz(
  topicId: string,
  questionIds: string[]
) {
  for (const questionId of questionIds) {
    getOrCreateCard(questionId, topicId);
  }
}

/**
 * Get quiz history for a specific question.
 */
export function getQuestionHistory(questionId: string) {
  return db
    .select()
    .from(quizHistory)
    .where(eq(quizHistory.questionId, questionId))
    .all();
}

/**
 * Get all wrong answers for a topic (for weak-spot highlighting).
 */
export function getWrongAnswers(topicId: string) {
  return db
    .select()
    .from(quizHistory)
    .where(eq(quizHistory.topicId, topicId))
    .all()
    .filter((h) => !h.correct);
}

// Helpers

function dbRowToCard(row: typeof quizCards.$inferSelect): Card {
  return {
    due: row.due instanceof Date ? row.due : new Date(row.due as unknown as string),
    stability: row.stability,
    difficulty: row.difficulty,
    elapsed_days: row.elapsedDays,
    scheduled_days: row.scheduledDays,
    learning_steps: 0,
    reps: row.reps,
    lapses: row.lapses,
    state: row.state as State,
    last_review: row.lastReview
      ? row.lastReview instanceof Date
        ? row.lastReview
        : new Date(row.lastReview as unknown as string)
      : undefined,
  };
}

// Re-export useful types/constants
export { Rating, State };
