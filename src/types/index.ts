// Content types for JSON files

export interface TopicReference {
  authors: string;
  title: string;
  journal: string;
  year: number;
}

export interface TopicSection {
  id: string;
  title: string;
  content: string; // markdown
  keyPoints: string[];
  references?: TopicReference[];
}

export interface Topic {
  id: string;
  domain: number;
  title: string;
  slug: string;
  sections: TopicSection[];
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "image-occlusion";
  domain: "procedural" | "clinical-decision-making" | "evidence";
  question: string;
  options?: string[];
  correctAnswer: number | boolean;
  acceptedAnswers?: string[];
  // R3: UWorld-style explanation fields
  explanation: string; // Why the correct answer is correct
  wrongAnswerExplanations?: Record<string, string>; // key = option index or "true"/"false", value = why it's wrong
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  educationalObjective: string; // Single-sentence takeaway
  // R2: Image occlusion fields
  illustrationId?: string; // Reference to topic illustration
  hotspotId?: string; // Which hotspot to quiz on
}

export interface QuizBank {
  topicId: string;
  questions: QuizQuestion[];
}

export interface CaseQuestion {
  id: string;
  prompt: string;
  type: "multiple-choice" | "short-answer";
  options?: string[];
  correctAnswer?: number;
  acceptedAnswers?: string[];
  explanation: string;
}

export interface CasePresentation {
  history: string;
  exam: string;
  imaging: string;
  emg?: string;
}

export interface CaseSimulation {
  id: string;
  topicIds: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  title: string;
  presentation: CasePresentation;
  questions: CaseQuestion[];
}

// Decision pathway types (R7)
export interface DecisionPathway {
  id: string;
  title: string;
  description: string;
  relatedTopics: string[];
  startNode: string;
  nodes: Record<string, DecisionNode>;
}

export interface DecisionNode {
  question: string;
  type: "decision" | "info" | "outcome";
  body?: string;
  options?: DecisionOption[];
  outcome?: string;
  outcomeColor?: "green" | "yellow" | "red";
  evidenceCitation?: string;
}

export interface DecisionOption {
  label: string;
  next: string;
  rationale: string;
}

// User progress types
export interface StudyProgressRecord {
  topicId: string;
  sectionId: string;
  studied: boolean;
  lastAccessed: Date;
}

export interface QuizCardState {
  questionId: string;
  topicId: string;
  due: Date;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: number; // 0=New, 1=Learning, 2=Review, 3=Relearning
  lastReview: Date | null;
}
