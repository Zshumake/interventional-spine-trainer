import { getAllQuizBanks, getQuizBankByTopicId } from "@/lib/content";
import { getDueCards } from "@/lib/fsrs";
import { QuizSession } from "@/components/quiz/quiz-session";
import type { QuizQuestion } from "@/types";

interface QuizSessionPageProps {
  searchParams: Promise<{ topicId?: string; mode?: string }>;
}

export default async function QuizSessionPage({ searchParams }: QuizSessionPageProps) {
  const params = await searchParams;
  const { topicId, mode } = params;

  let questions: QuizQuestion[] = [];
  let sessionTitle = "Quiz Session";

  if (mode === "due") {
    // Review mode: get all due cards and find their questions
    const dueCards = getDueCards();
    const allBanks = getAllQuizBanks();

    const dueQuestionIds = new Set(dueCards.map((c) => c.questionId));
    for (const bank of allBanks) {
      for (const q of bank.questions) {
        if (dueQuestionIds.has(q.id)) {
          questions.push(q);
        }
      }
    }
    sessionTitle = `Review — ${questions.length} due cards`;
  } else if (topicId) {
    // Practice mode: all questions from the selected topic
    const bank = getQuizBankByTopicId(topicId);
    if (bank) {
      questions = bank.questions;
      sessionTitle = `Practice — ${topicId.replace(/-/g, " ")}`;
    }
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-muted-foreground">
        <p className="text-lg">No questions available for this session.</p>
        <p className="text-sm mt-2">
          {mode === "due"
            ? "No cards are due for review. Come back later!"
            : "No quiz bank found for this topic."}
        </p>
      </div>
    );
  }

  // Find topicId for each question (needed for the API call)
  const allBanks = getAllQuizBanks();
  const questionTopicMap: Record<string, string> = {};
  for (const bank of allBanks) {
    for (const q of bank.questions) {
      questionTopicMap[q.id] = bank.topicId;
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <QuizSession
        questions={questions}
        questionTopicMap={questionTopicMap}
        sessionTitle={sessionTitle}
      />
    </div>
  );
}
