import fs from "fs";
import path from "path";
import type { Topic, QuizBank, CaseSimulation, DecisionPathway } from "@/types";

const contentDir = path.join(process.cwd(), "content");

export function getAllTopics(): Topic[] {
  const topicsDir = path.join(contentDir, "topics");
  if (!fs.existsSync(topicsDir)) return [];

  const files = fs.readdirSync(topicsDir).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(topicsDir, file), "utf-8");
      return JSON.parse(raw) as Topic;
    })
    .sort((a, b) => a.domain - b.domain);
}

export function getTopicBySlug(slug: string): Topic | null {
  const topics = getAllTopics();
  return topics.find((t) => t.slug === slug) ?? null;
}

export function getAllQuizBanks(): QuizBank[] {
  const quizzesDir = path.join(contentDir, "quizzes");
  if (!fs.existsSync(quizzesDir)) return [];

  const files = fs.readdirSync(quizzesDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(quizzesDir, file), "utf-8");
    return JSON.parse(raw) as QuizBank;
  });
}

export function getQuizBankByTopicId(topicId: string): QuizBank | null {
  const banks = getAllQuizBanks();
  return banks.find((b) => b.topicId === topicId) ?? null;
}

export function getAllCases(): CaseSimulation[] {
  const casesDir = path.join(contentDir, "cases");
  if (!fs.existsSync(casesDir)) return [];

  const files = fs.readdirSync(casesDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(casesDir, file), "utf-8");
    return JSON.parse(raw) as CaseSimulation;
  });
}

export function getCaseById(id: string): CaseSimulation | null {
  const cases = getAllCases();
  return cases.find((c) => c.id === id) ?? null;
}

export function getAllPathways(): DecisionPathway[] {
  const pathwaysDir = path.join(contentDir, "pathways");
  if (!fs.existsSync(pathwaysDir)) return [];

  const files = fs.readdirSync(pathwaysDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(pathwaysDir, file), "utf-8");
    return JSON.parse(raw) as DecisionPathway;
  });
}

export function getPathwayById(id: string): DecisionPathway | null {
  const pathways = getAllPathways();
  return pathways.find((p) => p.id === id) ?? null;
}

export function searchContent(query: string): Array<{
  type: "topic" | "quiz" | "case";
  title: string;
  slug: string;
  snippet: string;
}> {
  const results: Array<{
    type: "topic" | "quiz" | "case";
    title: string;
    slug: string;
    snippet: string;
  }> = [];
  const q = query.toLowerCase();

  // Search topics
  for (const topic of getAllTopics()) {
    for (const section of topic.sections) {
      if (
        section.title.toLowerCase().includes(q) ||
        section.content.toLowerCase().includes(q) ||
        section.keyPoints.some((kp) => kp.toLowerCase().includes(q))
      ) {
        const idx = section.content.toLowerCase().indexOf(q);
        const snippet =
          idx >= 0
            ? section.content.slice(Math.max(0, idx - 50), idx + 100)
            : section.keyPoints[0] || section.title;
        results.push({
          type: "topic",
          title: `${topic.title} — ${section.title}`,
          slug: `/study/${topic.slug}#${section.id}`,
          snippet: snippet.replace(/\n/g, " ").trim(),
        });
        break; // one result per topic
      }
    }
  }

  // Search cases
  for (const c of getAllCases()) {
    if (
      c.title.toLowerCase().includes(q) ||
      c.presentation.history.toLowerCase().includes(q)
    ) {
      results.push({
        type: "case",
        title: c.title,
        slug: `/cases/${c.id}`,
        snippet: c.presentation.history.slice(0, 100),
      });
    }
  }

  return results;
}
