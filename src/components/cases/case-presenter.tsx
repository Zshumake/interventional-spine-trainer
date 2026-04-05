"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ChevronRight,
  FileText,
  Stethoscope,
  Image as ImageIcon,
  Zap,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { CaseSimulation, CaseQuestion } from "@/types";

type Phase = "presentation" | "question" | "feedback" | "complete";

interface QuestionResult {
  questionId: string;
  correct: boolean;
  selectedAnswer: number | string | null;
}

interface CasePresenterProps {
  caseData: CaseSimulation;
}

const difficultyColors = {
  beginner:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function CasePresenter({ caseData }: CasePresenterProps) {
  const [phase, setPhase] = useState<Phase>("presentation");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [results, setResults] = useState<QuestionResult[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentQuestion: CaseQuestion | undefined =
    caseData.questions[questionIndex];
  const totalQuestions = caseData.questions.length;
  const correctCount = results.filter((r) => r.correct).length;

  useEffect(() => {
    headingRef.current?.focus();
  }, [phase, questionIndex]);

  const progressPercent =
    phase === "complete"
      ? 100
      : phase === "presentation"
        ? 0
        : ((questionIndex + (phase === "feedback" ? 1 : 0)) / totalQuestions) *
          100;

  function handleStartQuestions() {
    setPhase("question");
  }

  function handleSelectMCQ(index: number) {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(index);

    const correct = index === currentQuestion.correctAnswer;
    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        correct,
        selectedAnswer: index,
      },
    ]);
    setPhase("feedback");
  }

  function handleSubmitShortAnswer() {
    if (!currentQuestion || !shortAnswer.trim()) return;

    const accepted = currentQuestion.acceptedAnswers ?? [];
    const correct = accepted.some(
      (a) => a.toLowerCase().trim() === shortAnswer.toLowerCase().trim()
    );
    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        correct,
        selectedAnswer: shortAnswer.trim(),
      },
    ]);
    setPhase("feedback");
  }

  function handleNextQuestion() {
    if (questionIndex + 1 >= totalQuestions) {
      setPhase("complete");
    } else {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShortAnswer("");
      setPhase("question");
    }
  }

  function handleStartOver() {
    setPhase("presentation");
    setQuestionIndex(0);
    setSelectedOption(null);
    setShortAnswer("");
    setResults([]);
  }

  return (
    <div
      role="region"
      aria-label={`${caseData.title} case simulation`}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/cases">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <span className="text-sm font-medium">{caseData.title}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge
                className={cn(
                  "text-[10px]",
                  difficultyColors[caseData.difficulty]
                )}
              >
                {caseData.difficulty}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                {totalQuestions} questions
              </span>
            </div>
          </div>
        </div>
        {phase !== "presentation" && phase !== "complete" && (
          <Badge variant="outline" className="text-xs">
            {questionIndex + 1} / {totalQuestions}
          </Badge>
        )}
      </div>

      {/* Progress */}
      <Progress value={progressPercent} className="h-1.5" />

      {/* Presentation Phase */}
      {phase === "presentation" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-3">
          <Card>
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg leading-relaxed outline-none"
              >
                Clinical Presentation
              </CardTitle>
              <CardDescription>
                Review the case details carefully before answering questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* History */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
                  <FileText className="h-4 w-4" />
                  History
                </div>
                <p className="text-sm leading-relaxed pl-6">
                  {caseData.presentation.history}
                </p>
              </div>

              {/* Exam */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
                  <Stethoscope className="h-4 w-4" />
                  Physical Examination
                </div>
                <p className="text-sm leading-relaxed pl-6">
                  {caseData.presentation.exam}
                </p>
              </div>

              {/* Imaging */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 dark:text-purple-400">
                  <ImageIcon className="h-4 w-4" />
                  Imaging
                </div>
                <p className="text-sm leading-relaxed pl-6">
                  {caseData.presentation.imaging}
                </p>
              </div>

              {/* EMG if present */}
              {caseData.presentation.emg && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-400">
                    <Zap className="h-4 w-4" />
                    EMG/NCS
                  </div>
                  <p className="text-sm leading-relaxed pl-6">
                    {caseData.presentation.emg}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button onClick={handleStartQuestions} className="w-full">
            Begin Questions
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Question Phase */}
      {phase === "question" && currentQuestion && (
        <div
          key={currentQuestion.id}
          className="animate-in fade-in slide-in-from-right-2 duration-200 space-y-3"
        >
          <Card>
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg leading-relaxed outline-none"
              >
                {currentQuestion.prompt}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentQuestion.type === "multiple-choice" &&
                currentQuestion.options && (
                  <div
                    role="radiogroup"
                    aria-label="Answer options"
                    className="space-y-2"
                  >
                    {currentQuestion.options.map((option, i) => (
                      <button
                        key={i}
                        role="radio"
                        aria-checked={selectedOption === i}
                        onClick={() => handleSelectMCQ(i)}
                        className="w-full text-left p-3 rounded-lg border hover:border-purple-300 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xs font-bold text-muted-foreground mt-0.5 shrink-0">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          <p className="text-sm">{option}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

              {currentQuestion.type === "short-answer" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={shortAnswer}
                    onChange={(e) => setShortAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmitShortAnswer();
                    }}
                    placeholder="Type your answer..."
                    className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900"
                    autoFocus
                  />
                  <Button
                    onClick={handleSubmitShortAnswer}
                    disabled={!shortAnswer.trim()}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feedback Phase */}
      {phase === "feedback" && currentQuestion && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-3">
          {/* Result indicator */}
          {results[results.length - 1]?.correct ? (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/30 dark:border-green-800">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Correct!
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-800">
              <XCircle className="h-5 w-5 text-red-600 shrink-0" />
              <span className="text-sm font-medium text-red-700 dark:text-red-400">
                Incorrect
              </span>
            </div>
          )}

          {/* Show MCQ options with correct/incorrect highlights */}
          {currentQuestion.type === "multiple-choice" &&
            currentQuestion.options && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg leading-relaxed">
                    {currentQuestion.prompt}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === currentQuestion.correctAnswer;
                    return (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-lg border transition-colors",
                          isCorrect &&
                            "border-green-500 bg-green-50 dark:bg-green-950/30",
                          isSelected &&
                            !isCorrect &&
                            "border-red-500 bg-red-50 dark:bg-red-950/30",
                          !isSelected && !isCorrect && "opacity-60"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                          )}
                          {!isSelected && !isCorrect && (
                            <span className="w-4 shrink-0" />
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              <span className="text-muted-foreground mr-1">
                                {String.fromCharCode(65 + i)}.
                              </span>
                              {option}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

          {/* Short answer feedback */}
          {currentQuestion.type === "short-answer" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg leading-relaxed">
                  {currentQuestion.prompt}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className={cn(
                    "p-3 rounded-lg border",
                    results[results.length - 1]?.correct
                      ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                      : "border-red-500 bg-red-50 dark:bg-red-950/30"
                  )}
                >
                  <p className="text-sm">
                    <span className="font-medium">Your answer: </span>
                    {String(results[results.length - 1]?.selectedAnswer)}
                  </p>
                </div>
                {currentQuestion.acceptedAnswers &&
                  !results[results.length - 1]?.correct && (
                    <div className="p-3 rounded-lg border border-green-500 bg-green-50 dark:bg-green-950/30">
                      <p className="text-sm">
                        <span className="font-medium">
                          Accepted answers:{" "}
                        </span>
                        {currentQuestion.acceptedAnswers.join(", ")}
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}

          {/* Explanation */}
          <Card className="border-l-4 border-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                    Explanation
                  </p>
                  <p className="text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleNextQuestion} className="w-full">
            {questionIndex + 1 >= totalQuestions
              ? "See Results"
              : "Next Question"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Complete Phase */}
      {phase === "complete" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
          <Card
            className={cn(
              "border-l-4",
              correctCount === totalQuestions
                ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                : correctCount >= totalQuestions / 2
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
                  : "border-red-500 bg-red-50 dark:bg-red-950/30"
            )}
          >
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg outline-none"
              >
                Case Complete
              </CardTitle>
              <CardDescription>{caseData.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <div className="text-4xl font-bold">
                  {correctCount} / {totalQuestions}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Correct Answers
                </p>
              </div>

              {/* Question results summary */}
              <div className="space-y-2">
                {results.map((result, i) => {
                  const question = caseData.questions[i];
                  return (
                    <div
                      key={result.questionId}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md text-sm",
                        result.correct
                          ? "bg-green-50 dark:bg-green-950/20"
                          : "bg-red-50 dark:bg-red-950/20"
                      )}
                    >
                      {result.correct ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                      )}
                      <span className="flex-1 text-xs">
                        {question.prompt.slice(0, 80)}
                        {question.prompt.length > 80 ? "..." : ""}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Related topic links */}
              {caseData.topicIds.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Review Related Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caseData.topicIds.map((topicId) => (
                      <Link key={topicId} href={`/study/${topicId}`}>
                        <Badge
                          variant="outline"
                          className="text-xs hover:bg-purple-50 dark:hover:bg-purple-950/20 cursor-pointer"
                        >
                          <BookOpen className="h-3 w-3 mr-1" />
                          {topicId.replace(/^\d+-/, "").replace(/-/g, " ")}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleStartOver}
              className="flex-1"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Try Again
            </Button>
            <Link href="/cases" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> All Cases
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
