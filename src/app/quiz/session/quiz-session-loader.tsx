"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { QuizSession } from "@/components/quiz/quiz-session";
import type { QuizBank, QuizQuestion } from "@/types";

interface QuizSessionLoaderProps {
  allBanks: QuizBank[];
}

function QuizSessionLoaderInner({ allBanks }: QuizSessionLoaderProps) {
  const searchParams = useSearchParams();
  const topicId = searchParams?.get("topicId") ?? undefined;
  const mode = searchParams?.get("mode") ?? undefined;

  const { questions, sessionTitle, questionTopicMap } = useMemo(() => {
    const map: Record<string, string> = {};
    for (const bank of allBanks) {
      for (const q of bank.questions) {
        map[q.id] = bank.topicId;
      }
    }

    let qs: QuizQuestion[] = [];
    let title = "Quiz Session";

    if (mode === "due") {
      // No server-side FSRS db in static export — review mode falls back
      // to an empty session with a friendly message.
      qs = [];
      title = "Review — 0 due cards";
    } else if (topicId) {
      const bank = allBanks.find((b) => b.topicId === topicId);
      if (bank) {
        qs = bank.questions;
        title = `Practice — ${topicId.replace(/-/g, " ")}`;
      }
    }

    return { questions: qs, sessionTitle: title, questionTopicMap: map };
  }, [allBanks, topicId, mode]);

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-muted-foreground">
        <p className="text-lg">No questions available for this session.</p>
        <p className="text-sm mt-2">
          {mode === "due"
            ? "Spaced-repetition review requires the dynamic build. Pick a topic from the Quiz page to practice instead."
            : "No quiz bank found for this topic."}
        </p>
      </div>
    );
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

export function QuizSessionLoader(props: QuizSessionLoaderProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto py-12 text-center text-muted-foreground">
          Loading session…
        </div>
      }
    >
      <QuizSessionLoaderInner {...props} />
    </Suspense>
  );
}
