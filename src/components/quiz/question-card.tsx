"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (answer: string | number | boolean) => void;
  selectedAnswer: string | number | boolean | null;
  isCorrect: boolean | null;
  showResult: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
  isCorrect,
  showResult,
}: QuestionCardProps) {
  const [shortAnswerText, setShortAnswerText] = useState("");

  const domainColors: Record<string, string> = {
    procedural: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "clinical-decision-making":
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    evidence:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={cn("text-xs", domainColors[question.domain])}>
            {question.domain.replace(/-/g, " ")}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {question.type.replace(/-/g, " ")}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Multiple Choice */}
        {question.type === "multiple-choice" && question.options && (
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              const showCorrectness = showResult;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && onAnswer(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors text-sm",
                    !showResult && "hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-950/20 cursor-pointer",
                    showResult && isSelected && isCorrectOption && "border-green-500 bg-green-50 dark:bg-green-950/30",
                    showResult && isSelected && !isCorrectOption && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    showResult && !isSelected && isCorrectOption && "border-green-300 bg-green-50/50 dark:bg-green-950/20",
                    showResult && !isSelected && !isCorrectOption && "opacity-60",
                    !showResult && isSelected && "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                  )}
                >
                  <div className="shrink-0">
                    {showCorrectness && isCorrectOption ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : showCorrectness && isSelected && !isCorrectOption ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-muted-foreground mr-1 font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="flex-1">{option}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {question.type === "true-false" && (
          <div className="flex gap-3">
            {[true, false].map((value) => {
              const isSelected = selectedAnswer === value;
              const isCorrectOption = value === question.correctAnswer;
              const showCorrectness = showResult;

              return (
                <button
                  key={String(value)}
                  onClick={() => !showResult && onAnswer(value)}
                  disabled={showResult}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border text-sm font-medium transition-colors",
                    !showResult && "hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-950/20 cursor-pointer",
                    showResult && isSelected && isCorrectOption && "border-green-500 bg-green-50 dark:bg-green-950/30",
                    showResult && isSelected && !isCorrectOption && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    showResult && !isSelected && isCorrectOption && "border-green-300 bg-green-50/50 dark:bg-green-950/20",
                    showResult && !isSelected && !isCorrectOption && "opacity-60"
                  )}
                >
                  {showCorrectness && isCorrectOption ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : showCorrectness && isSelected && !isCorrectOption ? (
                    <XCircle className="h-5 w-5 text-red-600" />
                  ) : null}
                  {value ? "True" : "False"}
                </button>
              );
            })}
          </div>
        )}

        {/* Short Answer */}
        {question.type === "short-answer" && (
          <div className="space-y-3">
            {!showResult ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (shortAnswerText.trim()) {
                    onAnswer(shortAnswerText.trim());
                  }
                }}
                className="flex gap-2"
              >
                <Input
                  value={shortAnswerText}
                  onChange={(e) => setShortAnswerText(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1"
                  autoFocus
                />
                <Button type="submit" disabled={!shortAnswerText.trim()}>
                  Submit
                </Button>
              </form>
            ) : (
              <div
                className={cn(
                  "p-3 rounded-lg border",
                  isCorrect
                    ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                    : "border-red-500 bg-red-50 dark:bg-red-950/30"
                )}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className="text-sm">
                    Your answer: <strong>{String(selectedAnswer)}</strong>
                  </span>
                </div>
                {!isCorrect && question.acceptedAnswers && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Accepted answers:{" "}
                    {question.acceptedAnswers.join(", ")}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
