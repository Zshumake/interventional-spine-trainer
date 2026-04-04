"use client";

import { useState } from "react";
import { AlertTriangle, GraduationCap, Check, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProcedureChecklist as ProcedureChecklistType } from "@/types";

const PHASE_ORDER = ["Pre-Procedure", "Setup", "Procedure", "Post-Procedure"] as const;

const PHASE_COLORS: Record<string, string> = {
  "Pre-Procedure": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Setup: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  Procedure: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  "Post-Procedure": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
};

interface Props {
  checklist: ProcedureChecklistType;
}

export function ProcedureChecklist({ checklist }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (stepId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const totalSteps = checklist.steps.length;
  const completedCount = completed.size;

  const groupedSteps = PHASE_ORDER.map((phase) => ({
    phase,
    steps: checklist.steps.filter((s) => s.phase === phase),
  })).filter((g) => g.steps.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{checklist.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {completedCount} of {totalSteps} steps completed
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="print:hidden flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md border"
        >
          <Printer className="h-3.5 w-3.5" />
          Print
        </button>
      </div>

      {/* Progress bar */}
      <div className="print:hidden w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0}%` }}
        />
      </div>

      {/* Phases */}
      {groupedSteps.map(({ phase, steps }) => (
        <div key={phase} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Badge variant="outline" className={PHASE_COLORS[phase]}>
              {phase}
            </Badge>
            <span className="text-xs font-normal">
              {steps.filter((s) => completed.has(s.id)).length}/{steps.length}
            </span>
          </h2>

          <div className="space-y-2">
            {steps.map((step, idx) => {
              const isCompleted = completed.has(step.id);
              return (
                <Card
                  key={step.id}
                  className={`transition-all ${isCompleted ? "opacity-60 print:opacity-100" : ""}`}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggle(step.id)}
                        className={`print:hidden mt-0.5 flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isCompleted
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground/30 hover:border-primary"
                        }`}
                      >
                        {isCompleted && <Check className="h-3 w-3" />}
                      </button>

                      {/* Print step number */}
                      <span className="hidden print:inline-block mt-0.5 flex-shrink-0 w-5 h-5 text-xs font-mono text-center">
                        {idx + 1}.
                      </span>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <p className={`text-sm ${isCompleted ? "line-through print:no-underline" : ""}`}>
                          {step.action}
                        </p>

                        {/* Safety callout */}
                        <div className="flex gap-2 items-start rounded-md bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 p-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-yellow-800 dark:text-yellow-300">
                            {step.safety}
                          </p>
                        </div>

                        {/* Teaching point */}
                        <div className="flex gap-2 items-start rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-2">
                          <GraduationCap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-blue-800 dark:text-blue-300">
                            {step.teaching}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
