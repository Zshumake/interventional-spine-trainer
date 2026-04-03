import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const studyProgress = sqliteTable("study_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  topicId: text("topic_id").notNull(),
  sectionId: text("section_id").notNull(),
  studied: integer("studied", { mode: "boolean" }).default(false),
  lastAccessed: integer("last_accessed", { mode: "timestamp" }),
});

export const quizCards = sqliteTable("quiz_cards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: text("question_id").notNull().unique(),
  topicId: text("topic_id").notNull(),
  due: integer("due", { mode: "timestamp" }).notNull(),
  stability: real("stability").notNull(),
  difficulty: real("difficulty").notNull(),
  elapsedDays: integer("elapsed_days").notNull(),
  scheduledDays: integer("scheduled_days").notNull(),
  reps: integer("reps").notNull(),
  lapses: integer("lapses").notNull(),
  state: integer("state").notNull(),
  lastReview: integer("last_review", { mode: "timestamp" }),
});

export const quizHistory = sqliteTable("quiz_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: text("question_id").notNull(),
  topicId: text("topic_id").notNull(),
  userAnswer: text("user_answer").notNull(),
  correct: integer("correct", { mode: "boolean" }).notNull(),
  rating: integer("rating").notNull(),
  answeredAt: integer("answered_at", { mode: "timestamp" }).notNull(),
});

export const caseHistory = sqliteTable("case_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  caseId: text("case_id").notNull(),
  source: text("source").notNull(), // 'prebuilt' | 'ai-generated'
  score: real("score"),
  completedAt: integer("completed_at", { mode: "timestamp" }).notNull(),
  caseData: text("case_data"), // JSON string for AI-generated cases
});
