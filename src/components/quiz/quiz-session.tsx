"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./question-card";
import { ExplanationPanel } from "./explanation-panel";
import { FsrsRating } from "./fsrs-rating";
import type { QuizQuestion } from "@/types";

interface QuizSessionProps {
  questions: QuizQuestion[];
  questionTopicMap: Record<string, string>;
  sessionTitle: string;
}

type SessionState = "answering" | "reviewing" | "complete";

export function QuizSession({
  questions,
  questionTopicMap,
  sessionTitle,
}: QuizSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<SessionState>("answering");
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<Array<{ questionId: string; correct: boolean }>>([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + (state === "complete" ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = useCallback(
    (answer: string | number | boolean) => {
      setSelectedAnswer(answer);

      // Evaluate correctness
      let correct = false;
      if (currentQuestion.type === "multiple-choice") {
        correct = answer === currentQuestion.correctAnswer;
      } else if (currentQuestion.type === "true-false") {
        correct = answer === currentQuestion.correctAnswer;
      } else if (currentQuestion.type === "short-answer") {
        const answerStr = String(answer).toLowerCase().trim();
        correct =
          currentQuestion.acceptedAnswers?.some(
            (a) => answerStr.includes(a.toLowerCase())
          ) ?? false;
      }

      setIsCorrect(correct);
      setState("reviewing");
    },
    [currentQuestion]
  );

  const handleFsrsRating = useCallback(
    async (rating: number) => {
      const topicId = questionTopicMap[currentQuestion.id];

      // Record the review via API
      try {
        await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: currentQuestion.id,
            topicId,
            rating,
            userAnswer: String(selectedAnswer ?? ""),
            correct: isCorrect,
          }),
        });
      } catch (err) {
        console.error("Failed to record quiz answer:", err);
      }

      // Track results
      setResults((prev) => [
        ...prev,
        { questionId: currentQuestion.id, correct: isCorrect ?? false },
      ]);

      // Move to next question or complete
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setState("answering");
      } else {
        setState("complete");
      }
    },
    [currentQuestion, currentIndex, questions.length, questionTopicMap, selectedAnswer, isCorrect]
  );

  // Session complete screen
  if (state === "complete") {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);

    return (
      <div className="space-y-6 py-8">
        <div className="text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
          <h2 className="text-2xl font-bold">Session Complete</h2>
          <p className="text-muted-foreground">
            {correctCount} of {results.length} correct ({accuracy}%)
          </p>
        </div>

        <Progress value={100} className="h-2" />

        <div className="flex justify-center gap-3">
          <Link href="/quiz">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quiz Hub
            </Button>
          </Link>
          <Link href="/quiz/session?mode=due">
            <Button>Review Due Cards</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/quiz">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground">{sessionTitle}</span>
        </div>
        <Badge variant="outline">
          {currentIndex + 1} / {questions.length}
        </Badge>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-1.5" />

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
        showResult={state === "reviewing"}
      />

      {/* Explanation (shown after answering) */}
      {state === "reviewing" && (
        <>
          <ExplanationPanel
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect ?? false}
          />
          <FsrsRating onRate={handleFsrsRating} />
        </>
      )}
    </div>
  );
}
