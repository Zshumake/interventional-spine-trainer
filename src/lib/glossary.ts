import fs from "fs";
import path from "path";

export interface GlossaryTerm {
  id: string;
  term: string;
  aliases: string[];
  definition: string;
  relatedTopics: string[];
  relatedSection: string;
}

interface Glossary {
  terms: GlossaryTerm[];
}

let cachedGlossary: Glossary | null = null;

function loadGlossary(): Glossary {
  if (cachedGlossary) return cachedGlossary;

  const glossaryPath = path.join(process.cwd(), "content", "glossary.json");
  if (!fs.existsSync(glossaryPath)) {
    cachedGlossary = { terms: [] };
    return cachedGlossary;
  }

  const raw = fs.readFileSync(glossaryPath, "utf-8");
  cachedGlossary = JSON.parse(raw) as Glossary;
  return cachedGlossary;
}

export function getAllTerms(): GlossaryTerm[] {
  return loadGlossary().terms;
}

export function getTermById(id: string): GlossaryTerm | null {
  return getAllTerms().find((t) => t.id === id) ?? null;
}

/**
 * Match glossary terms found in a text string.
 * Returns terms with their first match position, sorted by position.
 * Only matches whole words (word boundary matching).
 * Longer matches take priority over shorter ones at the same position.
 */
export function matchTermsInText(
  text: string
): Array<{ term: GlossaryTerm; matchedAlias: string; position: number }> {
  const terms = getAllTerms();
  if (terms.length === 0) return [];

  const matches: Array<{
    term: GlossaryTerm;
    matchedAlias: string;
    position: number;
  }> = [];

  const lowerText = text.toLowerCase();

  for (const term of terms) {
    // Check all aliases (which include the term itself in lowercase)
    const allAliases = [term.term.toLowerCase(), ...term.aliases];
    // Sort by length descending so longer matches take priority
    const sortedAliases = [...new Set(allAliases)].sort(
      (a, b) => b.length - a.length
    );

    for (const alias of sortedAliases) {
      // Use word boundary matching — don't match inside other words
      const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedAlias}\\b`, "i");
      const match = regex.exec(lowerText);

      if (match) {
        matches.push({
          term,
          matchedAlias: alias,
          position: match.index,
        });
        break; // Only match each term once (using the first/longest alias)
      }
    }
  }

  // Sort by position, then by longer match first at same position
  return matches.sort((a, b) => {
    if (a.position !== b.position) return a.position - b.position;
    return b.matchedAlias.length - a.matchedAlias.length;
  });
}

/**
 * Get terms relevant to a specific topic.
 */
export function getTermsForTopic(topicId: string): GlossaryTerm[] {
  return getAllTerms().filter((t) => t.relatedTopics.includes(topicId));
}
