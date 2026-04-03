"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  Target,
  Table2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

interface ExplanationPanelProps {
  question: QuizQuestion;
  selectedAnswer: string | number | boolean | null;
  isCorrect: boolean;
}

export function ExplanationPanel({
  question,
  selectedAnswer,
  isCorrect,
}: ExplanationPanelProps) {
  const [activeTab, setActiveTab] = useState<"explanation" | "wrong" | "table">(
    "explanation"
  );

  const hasWrongExplanations =
    question.wrongAnswerExplanations &&
    Object.keys(question.wrongAnswerExplanations).length > 0;
  const hasTable = question.comparisonTable;

  const tabs = [
    { id: "explanation" as const, label: "Correct Answer", icon: CheckCircle2 },
    ...(hasWrongExplanations
      ? [{ id: "wrong" as const, label: "Why Wrong", icon: XCircle }]
      : []),
    ...(hasTable
      ? [{ id: "table" as const, label: "Compare", icon: Table2 }]
      : []),
  ];

  return (
    <Card
      className={cn(
        "border-l-4",
        isCorrect ? "border-l-green-500" : "border-l-red-500"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <CardTitle className="text-base">
              {isCorrect ? "Correct!" : "Incorrect"}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tab navigation */}
        {tabs.length > 1 && (
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex-1 justify-center",
                  activeTab === tab.id
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Correct answer explanation */}
        {activeTab === "explanation" && (
          <div className="text-sm leading-relaxed space-y-3">
            <p>{question.explanation}</p>
          </div>
        )}

        {/* Wrong answer explanations */}
        {activeTab === "wrong" && hasWrongExplanations && (
          <div className="space-y-3">
            {Object.entries(question.wrongAnswerExplanations!).map(
              ([key, explanation]) => {
                // For MCQ, key is the option index
                // For T/F, key is "true" or "false"
                let label = key;
                if (question.type === "multiple-choice" && question.options) {
                  const idx = parseInt(key);
                  if (!isNaN(idx) && question.options[idx]) {
                    label = `${String.fromCharCode(65 + idx)}. ${question.options[idx]}`;
                  }
                } else if (question.type === "true-false") {
                  label = key === "true" ? "True" : "False";
                }

                const isSelectedWrong =
                  String(selectedAnswer) === key && !isCorrect;

                return (
                  <div
                    key={key}
                    className={cn(
                      "p-3 rounded-lg border text-sm",
                      isSelectedWrong
                        ? "border-red-200 bg-red-50/50 dark:bg-red-950/20"
                        : "border-muted"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-xs text-muted-foreground mb-1">
                          {label}
                        </p>
                        <p>{explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Comparison table */}
        {activeTab === "table" && hasTable && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {question.comparisonTable!.headers.map((header, i) => (
                    <th
                      key={i}
                      className="py-2 px-3 text-left font-medium text-muted-foreground text-xs"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {question.comparisonTable!.rows.map((row, i) => (
                  <tr key={i} className="border-b last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="py-2 px-3 text-xs">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Separator />

        {/* Educational Objective — always visible */}
        <div className="flex items-start gap-2 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <Target className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-0.5">
              Educational Objective
            </p>
            <p className="text-sm">{question.educationalObjective}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
