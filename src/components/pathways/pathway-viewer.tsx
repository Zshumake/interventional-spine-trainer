"use client";

import { useRef, useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, RotateCcw, BookOpen } from "lucide-react";
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
import { usePathway } from "@/hooks/use-pathway";
import type { DecisionPathway } from "@/types";

interface PathwayViewerProps {
  pathway: DecisionPathway;
}

export function PathwayViewer({ pathway }: PathwayViewerProps) {
  const { state, dispatch, currentNode, canGoBack, isOutcome, progress } =
    usePathway(pathway);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  useEffect(() => {
    headingRef.current?.focus();
  }, [state.currentNodeId]);

  if (!currentNode) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Invalid pathway node. Please restart.
      </div>
    );
  }

  function handleSelect(optionIndex: number, nextNodeId: string) {
    setDirection("forward");
    dispatch({ type: "SELECT_OPTION", optionIndex, nextNodeId });
  }

  function handleBack() {
    setDirection("back");
    dispatch({ type: "GO_BACK" });
  }

  const outcomeColors = {
    green:
      "border-green-500 bg-green-50 dark:bg-green-950/30",
    yellow:
      "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
    red: "border-red-500 bg-red-50 dark:bg-red-950/30",
  };

  return (
    <div
      role="region"
      aria-label={`${pathway.title} decision pathway`}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/pathways">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-sm font-medium">{pathway.title}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          Step {state.history.length + 1}
        </Badge>
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-1.5" />

      {/* Breadcrumb trail */}
      {state.history.length > 0 && (
        <nav
          aria-label="Decision path"
          className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
        >
          {state.history.map((entry, i) => {
            const node = pathway.nodes[entry.nodeId];
            const chosenOption = node?.options?.[entry.selectedOptionIndex];
            return (
              <Fragment key={i}>
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                <button
                  onClick={() => {
                    setDirection("back");
                    dispatch({ type: "JUMP_TO", historyIndex: i });
                  }}
                  className="hover:text-foreground underline-offset-2 hover:underline"
                >
                  {chosenOption?.label ?? node?.question?.slice(0, 30) ?? "..."}
                </button>
              </Fragment>
            );
          })}
        </nav>
      )}

      {/* Current node card */}
      <div
        key={state.currentNodeId}
        className={cn(
          "animate-in fade-in duration-200",
          direction === "forward"
            ? "slide-in-from-right-2"
            : "slide-in-from-left-2"
        )}
      >
        {/* Decision node */}
        {currentNode.type === "decision" && (
          <Card>
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg leading-relaxed outline-none"
              >
                {currentNode.question}
              </CardTitle>
              {currentNode.body && (
                <CardDescription>{currentNode.body}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div
                role="radiogroup"
                aria-labelledby="pathway-question"
                className="space-y-2"
              >
                {currentNode.options?.map((option, i) => (
                  <div key={i}>
                    <button
                      role="radio"
                      aria-checked={false}
                      onClick={() => handleSelect(i, option.next)}
                      className="w-full text-left p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors cursor-pointer"
                    >
                      <p className="text-sm font-medium">{option.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {option.rationale}
                      </p>
                    </button>
                  </div>
                ))}
              </div>

              {/* Evidence citation */}
              {currentNode.evidenceCitation && (
                <aside className="mt-4 rounded-md border-l-4 border-blue-500 bg-blue-50 px-3 py-2 text-sm dark:bg-blue-950/20">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-xs">{currentNode.evidenceCitation}</p>
                  </div>
                </aside>
              )}
            </CardContent>
          </Card>
        )}

        {/* Info node */}
        {currentNode.type === "info" && (
          <Card>
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg outline-none"
              >
                {currentNode.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentNode.body && (
                <p className="text-sm">{currentNode.body}</p>
              )}
              {currentNode.evidenceCitation && (
                <aside className="rounded-md border-l-4 border-blue-500 bg-blue-50 px-3 py-2 text-xs dark:bg-blue-950/20">
                  {currentNode.evidenceCitation}
                </aside>
              )}
              {currentNode.options?.[0] && (
                <Button onClick={() => handleSelect(0, currentNode.options![0].next)}>
                  Continue
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Outcome node */}
        {currentNode.type === "outcome" && (
          <Card
            className={cn(
              "border-l-4",
              outcomeColors[currentNode.outcomeColor ?? "green"]
            )}
          >
            <CardHeader>
              <CardTitle
                ref={headingRef}
                tabIndex={-1}
                className="text-lg outline-none"
              >
                {currentNode.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentNode.outcome && (
                <p className="text-sm" aria-live="polite">
                  {currentNode.outcome}
                </p>
              )}
              {currentNode.evidenceCitation && (
                <aside className="rounded-md border-l-4 border-blue-500 bg-blue-50 px-3 py-2 text-xs dark:bg-blue-950/20">
                  {currentNode.evidenceCitation}
                </aside>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        {canGoBack ? (
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        ) : (
          <div />
        )}
        {isOutcome && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              dispatch({ type: "RESET", startNodeId: pathway.startNode })
            }
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Start Over
          </Button>
        )}
      </div>
    </div>
  );
}
