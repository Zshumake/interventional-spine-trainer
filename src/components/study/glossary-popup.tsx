"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GlossaryTerm } from "@/lib/glossary";

interface GlossaryPopupProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

export function GlossaryPopup({ term, children }: GlossaryPopupProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className="underline decoration-primary/30 decoration-dotted underline-offset-2 cursor-help hover:decoration-primary/60 transition-colors" />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-sm p-3 space-y-2"
      >
        <div>
          <p className="font-semibold text-sm text-foreground">
            {term.term}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
            {term.definition}
          </p>
        </div>
        {term.relatedTopics.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1 border-t border-border/50">
            <BookOpen className="h-3 w-3 text-primary shrink-0" />
            <Link
              href={`/study/${term.relatedTopics[0]}#${term.relatedSection}`}
              className="text-[10px] text-primary hover:underline"
            >
              View in {term.relatedTopics[0].replace(/-/g, " ")}
            </Link>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
