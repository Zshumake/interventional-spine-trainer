import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Stethoscope,
  GitBranch,
  ArrowRight,
  Zap,
  Target,
  Calendar,
  TrendingUp,
  ClipboardCheck,
  AlertTriangle,
  Play,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllTopics, getAllQuizBanks, getAllCases, getAllPathways } from "@/lib/content";
import { getReadinessScore, getDailySession, getContentStats } from "@/lib/readiness";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function scoreColor(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function scoreBgColor(score: number): string {
  if (score >= 70) return "bg-emerald-500/10 border-emerald-500/20";
  if (score >= 40) return "bg-amber-500/10 border-amber-500/20";
  return "bg-red-500/10 border-red-500/20";
}

export default function HomePage() {
  const topics = getAllTopics();
  const quizBanks = getAllQuizBanks();
  const cases = getAllCases();
  const pathways = getAllPathways();
  const totalQuestions = quizBanks.reduce(
    (sum, b) => sum + b.questions.length,
    0
  );

  const readiness = getReadinessScore();
  const dailySession = getDailySession();
  const stats = getContentStats();

  const modes = [
    {
      href: "/study",
      icon: BookOpen,
      title: "Study",
      description: "Topic-by-topic content with technique, decision-making, and clinical pearls.",
      stat: `${topics.length} topics`,
      color: "text-primary",
      bgAccent: "bg-primary/10 dark:bg-primary/5",
      borderAccent: "hover:border-primary/40",
    },
    {
      href: "/quiz",
      icon: HelpCircle,
      title: "Quiz",
      description: "Spaced repetition with FSRS. MCQ, true/false, and short-answer.",
      stat: `${totalQuestions} questions`,
      color: "text-chart-4 dark:text-chart-4",
      bgAccent: "bg-chart-4/10 dark:bg-chart-4/5",
      borderAccent: "hover:border-chart-4/40",
    },
    {
      href: "/pathways",
      icon: GitBranch,
      title: "Pathways",
      description: "Interactive clinical decision guides with evidence at each branch.",
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

  const quickStats = [
    {
      label: "Questions",
      value: stats.questionCount,
      icon: HelpCircle,
      color: "text-chart-4",
    },
    {
      label: "Topics",
      value: stats.topicCount,
      icon: BookOpen,
      color: "text-primary",
    },
    {
      label: "Pathways",
      value: stats.pathwayCount,
      icon: GitBranch,
      color: "text-chart-3",
    },
    {
      label: "Checklists",
      value: stats.checklistCount,
      icon: ClipboardCheck,
      color: "text-chart-5",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero with greeting + readiness badge */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-primary/70">
            <Zap className="h-3.5 w-3.5" />
            Fellowship Preparation
          </div>
          <h1 className="text-3xl sm:text-4xl tracking-tight">
            {getGreeting()}, <span className="text-primary">Zachary</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Your daily training session is ready. Stay consistent and build toward fellowship readiness.
          </p>
        </div>

        {/* Readiness Score Badge */}
        <Link href="/progress">
          <div
            className={`flex flex-col items-center justify-center w-28 h-28 rounded-2xl border ${scoreBgColor(readiness.overall)} cursor-pointer transition-all hover:scale-105`}
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Readiness
            </span>
            <span className={`text-4xl font-bold tabular-nums ${scoreColor(readiness.overall)}`}>
              {readiness.overall}
            </span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </div>
        </Link>
      </div>

      {/* Today's Session Card */}
      <Card className="card-glow border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/5">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-sans font-semibold tracking-tight">
                Today&apos;s Session
              </CardTitle>
              <CardDescription className="text-xs">
                Personalized based on your progress
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Target className="h-4 w-4 text-chart-4 shrink-0" />
              <div>
                <span className="font-semibold text-foreground">{dailySession.dueCards}</span>
                <span className="text-muted-foreground ml-1">cards due</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <BookOpen className="h-4 w-4 text-primary shrink-0" />
              <div>
                <span className="font-semibold text-foreground">{dailySession.suggestedTopics.length}</span>
                <span className="text-muted-foreground ml-1">topics to review</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <AlertTriangle className="h-4 w-4 text-chart-5 shrink-0" />
              <div>
                <span className="font-semibold text-foreground">{dailySession.suggestedComplication ? 1 : 0}</span>
                <span className="text-muted-foreground ml-1">scenario to try</span>
              </div>
            </div>
          </div>

          {dailySession.suggestedTopics.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground/80">Suggested topics:</span>{" "}
              {dailySession.suggestedTopics.join(", ")}
            </div>
          )}

          <div className="flex gap-3">
            <Link href="/quiz">
              <Button size="sm" className="gap-2">
                <Play className="h-3.5 w-3.5" />
                Start Quiz Session
              </Button>
            </Link>
            <Link href="/study">
              <Button size="sm" variant="outline" className="gap-2">
                <BookOpen className="h-3.5 w-3.5" />
                Study Topics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="card-glow">
            <CardContent className="py-4 px-4 flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color} shrink-0`} />
              <div>
                <div className="text-2xl font-bold tabular-nums text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mode Cards Grid */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Training Modes
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {modes.map((mode) => (
            <Link key={mode.href} href={mode.href}>
              <Card
                className={`card-glow h-full transition-all duration-300 cursor-pointer group ${mode.borderAccent}`}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${mode.bgAccent} shrink-0`}>
                      <mode.icon className={`h-4 w-4 ${mode.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm tracking-tight">
                          {mode.title}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {mode.description}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        {mode.stat}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started (for new users) */}
      <Card className="border-dashed">
        <CardContent className="py-5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/5">
              <TrendingUp className="h-5 w-5 text-primary" />
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
                  <Link
                    href="/progress"
                    className="text-primary font-medium hover:underline"
                  >
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
