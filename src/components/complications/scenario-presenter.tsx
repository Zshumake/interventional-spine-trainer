"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
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
import type { ComplicationScenario, ComplicationDecision } from "@/types";

type Phase = "setup" | "trigger" | "decision" | "feedback" | "complete";

interface DecisionResult {
  decisionId: string;
  selectedIndex: number;
  correct: boolean;
  timedOut: boolean;
  timeRemaining: number;
}

interface ScenarioPresenterProps {
  scenario: ComplicationScenario;
}

export function ScenarioPresenter({ scenario }: ScenarioPresenterProps) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(scenario.timeLimit);
  const [results, setResults] = useState<DecisionResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentDecision: ComplicationDecision | undefined =
    scenario.decisions[decisionIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Timer logic for decision phase
  useEffect(() => {
    if (phase !== "decision") {
      clearTimer();
      return;
    }

    setTimeRemaining(scenario.timeLimit);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          // Time ran out -- record as timed out
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, decisionIndex]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [phase, decisionIndex]);

  function handleTimeout() {
    if (!currentDecision) return;

    const result: DecisionResult = {
      decisionId: currentDecision.id,
      selectedIndex: -1,
      correct: false,
      timedOut: true,
      timeRemaining: 0,
    };

    setResults((prev) => [...prev, result]);
    setSelectedOption(-1);
    setPhase("feedback");
  }

  function handleSelectOption(index: number) {
    if (selectedOption !== null || !currentDecision) return; // already selected
    clearTimer();

    const option = currentDecision.options[index];
    const result: DecisionResult = {
      decisionId: currentDecision.id,
      selectedIndex: index,
      correct: option.correct,
      timedOut: false,
      timeRemaining,
    };

    setResults((prev) => [...prev, result]);
    setSelectedOption(index);
    setPhase("feedback");
  }

  function handleNextDecision() {
    if (decisionIndex + 1 >= scenario.decisions.length) {
      setPhase("complete");
    } else {
      setDecisionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setPhase("decision");
    }
  }

  function handleStartOver() {
    clearTimer();
    setPhase("setup");
    setDecisionIndex(0);
    setSelectedOption(null);
    setTimeRemaining(scenario.timeLimit);
    setResults([]);
  }

  const correctCount = results.filter((r) => r.correct).length;
  const totalDecisions = scenario.decisions.length;
  const progressPercent =
    phase === "complete"
      ? 100
      : phase === "setup" || phase === "trigger"
        ? 0
        : ((decisionIndex + (phase === "feedback" ? 1 : 0)) / totalDecisions) *
          100;

  const timerPercent = (timeRemaining / scenario.timeLimit) * 100;
  const timerUrgent = timeRemaining <= 10;

  const difficultyColors = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div role="region" aria-label={`${scenario.title} complication scenario`} className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/complications">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <span className="text-sm font-medium">{scenario.title}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge className={cn("text-[10px]", difficultyColors[scenario.difficulty])}>
                {scenario.difficulty}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{scenario.procedure}</span>
            </div>
          </div>
        </div>
        {phase !== "setup" && phase !== "trigger" && (
          <Badge variant="outline" className="text-xs">
            {decisionIndex + 1} / {totalDecisions}
          </Badge>
        )}
      </div>

      {/* Progress */}
      <Progress value={progressPercent} className="h-1.5" />

      {/* Setup Phase */}
      {phase === "setup" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card>
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg leading-relaxed outline-none"
              >
                Scenario Setup
              </CardTitle>
              <CardDescription>Read the clinical scenario carefully before proceeding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{scenario.setup}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>You will have {scenario.timeLimit} seconds per decision</span>
              </div>
              <Button onClick={() => setPhase("trigger")} className="w-full">
                Begin Scenario
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trigger Phase */}
      {phase === "trigger" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-l-4 border-red-500 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg leading-relaxed outline-none flex items-center gap-2"
              >
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Complication Detected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed font-medium">{scenario.trigger}</p>
              <Button
                onClick={() => setPhase("decision")}
                variant="destructive"
                className="w-full"
              >
                Respond Now
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Decision Phase */}
      {phase === "decision" && currentDecision && (
        <div
          key={currentDecision.id}
          className="animate-in fade-in slide-in-from-right-2 duration-200 space-y-3"
        >
          {/* Timer */}
          <div className="flex items-center gap-3">
            <Clock className={cn("h-4 w-4", timerUrgent ? "text-red-500" : "text-muted-foreground")} />
            <div className="flex-1">
              <Progress
                value={timerPercent}
                className={cn("h-2", timerUrgent && "[&>div]:bg-red-500")}
              />
            </div>
            <span
              className={cn(
                "text-sm font-mono font-bold tabular-nums min-w-[2.5rem] text-right",
                timerUrgent ? "text-red-500" : "text-muted-foreground"
              )}
            >
              {timeRemaining}s
            </span>
          </div>

          <Card>
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg leading-relaxed outline-none"
              >
                {currentDecision.prompt}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div role="radiogroup" aria-label="Decision options" className="space-y-2">
                {currentDecision.options.map((option, i) => (
                  <button
                    key={i}
                    role="radio"
                    aria-checked={false}
                    onClick={() => handleSelectOption(i)}
                    className="w-full text-left p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-medium">{option.label}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feedback Phase */}
      {phase === "feedback" && currentDecision && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg leading-relaxed">
                {currentDecision.prompt}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentDecision.options.map((option, i) => {
                const isSelected = selectedOption === i;
                const isTimedOut = selectedOption === -1;

                return (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border transition-colors",
                      option.correct &&
                        "border-green-500 bg-green-50 dark:bg-green-950/30",
                      isSelected && !option.correct &&
                        "border-red-500 bg-red-50 dark:bg-red-950/30",
                      !isSelected && !option.correct && "opacity-60"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {option.correct && (
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      )}
                      {isSelected && !option.correct && (
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{option.label}</p>
                        {(option.correct || isSelected) && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {option.feedback}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {selectedOption === -1 && (
                <div className="mt-3 p-3 rounded-lg border border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                      Time expired -- no response selected
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button onClick={handleNextDecision} className="w-full">
            {decisionIndex + 1 >= totalDecisions ? "See Results" : "Next Decision"}
          </Button>
        </div>
      )}

      {/* Complete Phase */}
      {phase === "complete" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
          <Card
            className={cn(
              "border-l-4",
              correctCount === totalDecisions
                ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                : correctCount >= totalDecisions / 2
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
                Scenario Complete
              </CardTitle>
              <CardDescription>
                {scenario.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <div className="text-4xl font-bold">
                  {correctCount} / {totalDecisions}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Correct Decisions
                </p>
              </div>

              <div className="space-y-2">
                {results.map((result, i) => {
                  const decision = scenario.decisions[i];
                  return (
                    <div
                      key={result.decisionId}
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
                        {decision.prompt.slice(0, 80)}
                        {decision.prompt.length > 80 ? "..." : ""}
                      </span>
                      {result.timedOut && (
                        <Badge variant="outline" className="text-[10px] text-yellow-600">
                          Timed out
                        </Badge>
                      )}
                      {!result.timedOut && (
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          {result.timeRemaining}s left
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" onClick={handleStartOver} className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Start Over
          </Button>
        </div>
      )}
    </div>
  );
}
