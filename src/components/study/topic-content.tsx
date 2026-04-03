"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { GlossaryPopup } from "./glossary-popup";
import type { GlossaryTerm } from "@/lib/glossary";

interface TopicContentProps {
  content: string;
  glossaryTerms?: GlossaryTerm[];
}

/**
 * Process a React node tree and wrap matching glossary terms in GlossaryPopup.
 * Only processes string children — leaves other React elements untouched.
 * Each term is only linked once per paragraph to avoid visual clutter.
 */
function linkGlossaryTerms(
  children: React.ReactNode,
  terms: GlossaryTerm[],
  linkedTermIds: Set<string>
): React.ReactNode {
  if (!terms.length) return children;

  return React.Children.map(children, (child) => {
    // Only process string nodes
    if (typeof child !== "string") return child;

    const text = child;
    const segments: React.ReactNode[] = [];
    let remaining = text;
    let lastIndex = 0;

    // Try to match each term in the text
    for (const term of terms) {
      if (linkedTermIds.has(term.id)) continue;

      const allAliases = [term.term, ...term.aliases];
      // Sort by length descending — match longer aliases first
      const sortedAliases = [...new Set(allAliases)].sort(
        (a, b) => b.length - a.length
      );

      for (const alias of sortedAliases) {
        const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b(${escapedAlias})\\b`, "i");
        const match = regex.exec(remaining);

        if (match && match.index >= 0) {
          // Found a match — split text around it
          const before = remaining.slice(0, match.index);
          const matched = remaining.slice(
            match.index,
            match.index + match[0].length
          );
          const after = remaining.slice(match.index + match[0].length);

          if (before) segments.push(before);
          segments.push(
            <GlossaryPopup key={`${term.id}-${match.index}`} term={term}>
              {matched}
            </GlossaryPopup>
          );

          remaining = after;
          lastIndex = 0;
          linkedTermIds.add(term.id);
          break; // Only link each term once per paragraph
        }
      }
    }

    // Add any remaining text
    if (remaining) segments.push(remaining);

    return segments.length > 0 ? <>{segments}</> : child;
  });
}

export function TopicContent({ content, glossaryTerms = [] }: TopicContentProps) {
  // Track which terms have been linked to avoid duplicate popups
  const linkedTermIds = new Set<string>();

  return (
    <div className="prose prose-sm dark:prose-invert prose-clinical max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mt-6 mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold mt-5 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-sm leading-relaxed mb-3 text-foreground">
              {linkGlossaryTerms(children, glossaryTerms, linkedTermIds)}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-1 mb-3">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-1 mb-3">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-foreground">
              {linkGlossaryTerms(children, glossaryTerms, linkedTermIds)}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-3">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
