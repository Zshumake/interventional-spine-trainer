import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Stethoscope,
  BarChart3,
  GitBranch,
  ArrowRight,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllTopics, getAllQuizBanks, getAllCases, getAllPathways } from "@/lib/content";

export default function HomePage() {
  const topics = getAllTopics();
  const quizBanks = getAllQuizBanks();
  const cases = getAllCases();
  const pathways = getAllPathways();
  const totalQuestions = quizBanks.reduce(
    (sum, b) => sum + b.questions.length,
    0
  );

  const modes = [
    {
      href: "/study",
      icon: BookOpen,
      title: "Study",
      description: "Topic-by-topic content with technique, decision-making, evidence, and clinical pearls.",
      stat: `${topics.length} topics`,
      color: "text-primary",
      bgAccent: "bg-primary/10 dark:bg-primary/5",
      borderAccent: "hover:border-primary/40",
    },
    {
      href: "/quiz",
      icon: HelpCircle,
      title: "Quiz",
      description: "Spaced repetition with FSRS. MCQ, true/false, and short-answer questions.",
      stat: `${totalQuestions} questions`,
      color: "text-chart-4 dark:text-chart-4",
      bgAccent: "bg-chart-4/10 dark:bg-chart-4/5",
      borderAccent: "hover:border-chart-4/40",
    },
    {
      href: "/pathways",
      icon: GitBranch,
      title: "Pathways",
      description: "Interactive clinical decision guides with evidence at each branch point.",
      stat: `${pathways.length} pathways`,
      color: "text-chart-3 dark:text-chart-3",
      bgAccent: "bg-chart-3/10 dark:bg-chart-3/5",
      borderAccent: "hover:border-chart-3/40",
    },
    {
      href: "/cases",
      icon: Stethoscope,
      title: "Cases",
      description: "Clinical scenarios with multi-step decisions and structured feedback.",
      stat: `${cases.length} cases`,
      color: "text-chart-5 dark:text-chart-5",
      bgAccent: "bg-chart-5/10 dark:bg-chart-5/5",
      borderAccent: "hover:border-chart-5/40",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Hero */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-primary/70">
          <Zap className="h-3.5 w-3.5" />
          Fellowship Preparation
        </div>
        <h1 className="text-4xl sm:text-5xl tracking-tight">
          Interventional Pain<br />
          <span className="text-primary">Trainer</span>
        </h1>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
          {topics.length} procedural domains. Evidence-graded content from IPSIS, UpToDate,
          and fellowship-director teaching. Built for active recall.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map((mode) => (
          <Link key={mode.href} href={mode.href}>
            <Card className={`card-glow h-full transition-all duration-300 cursor-pointer group ${mode.borderAccent}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${mode.bgAccent} w-fit`}>
                    <mode.icon className={`h-5 w-5 ${mode.color}`} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <CardTitle className="text-lg mt-3 font-sans font-semibold tracking-tight">
                  {mode.title}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {mode.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <span className={`text-xs font-medium ${mode.color}`}>
                  {mode.stat}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Start */}
      <Card className="border-dashed">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/5">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-foreground">Getting Started</p>
              <div className="space-y-1 text-muted-foreground text-xs leading-relaxed">
                <p>
                  <span className="font-medium text-foreground/80">1.</span>{" "}
                  Review the {topics.length} domains in{" "}
                  <span className="text-primary font-medium">Study</span>
                </p>
                <p>
                  <span className="font-medium text-foreground/80">2.</span>{" "}
                  Test recall with spaced repetition in{" "}
                  <span className="text-primary font-medium">Quiz</span>
                </p>
                <p>
                  <span className="font-medium text-foreground/80">3.</span>{" "}
                  Navigate clinical decisions in{" "}
                  <span className="text-primary font-medium">Pathways</span>
                </p>
                <p>
                  <span className="font-medium text-foreground/80">4.</span>{" "}
                  Track weak areas in{" "}
                  <Link href="/progress" className="text-primary font-medium hover:underline">
                    Progress
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
