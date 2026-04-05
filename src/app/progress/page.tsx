import Link from "next/link";
import {
  BarChart3,
  Target,
  TrendingUp,
  TrendingDown,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getReadinessScore,
  getTopicCoverage,
  getQuizAccuracy,
  getFsrsMaturity,
  getContentStats,
} from "@/lib/readiness";
import { getAllTopics } from "@/lib/content";

function scoreColor(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function scoreBgClass(score: number): string {
  if (score >= 70) return "bg-emerald-500/10 border-emerald-500/20";
  if (score >= 40) return "bg-amber-500/10 border-amber-500/20";
  return "bg-red-500/10 border-red-500/20";
}

function barColor(score: number): string {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function barBg(score: number): string {
  if (score >= 70) return "bg-emerald-500/15";
  if (score >= 40) return "bg-amber-500/15";
  return "bg-red-500/15";
}

export default function ProgressPage() {
  const readiness = getReadinessScore();
  const coverage = getTopicCoverage();
  const accuracy = getQuizAccuracy();
  const maturity = getFsrsMaturity();
  const stats = getContentStats();
  const topics = getAllTopics();

  // Build per-topic combined scores for the radar table
  const topicScores = coverage.map((c) => {
    const acc = accuracy.find((a) => a.topicId === c.topicId);
    const topic = topics.find((t) => t.id === c.topicId);
    const covPct = c.total > 0 ? Math.round((c.studied / c.total) * 100) : 0;
    const accPct = acc ? acc.accuracy : 0;
    const combined = Math.round(covPct * 0.4 + accPct * 0.6);
    return {
      topicId: c.topicId,
      slug: topic?.slug ?? c.topicId,
      title: c.title,
      coveragePct: covPct,
      accuracyPct: accPct,
      combined,
      studied: c.studied,
      totalSections: c.total,
      quizAttempts: acc?.total ?? 0,
    };
  });

  const sortedByScore = [...topicScores].sort((a, b) => a.combined - b.combined);
  const weakest3 = sortedByScore.slice(0, 3);
  const strongest3 = sortedByScore.slice(-3).reverse();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-1 pt-2">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Fellowship Readiness
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your progress across all training dimensions
        </p>
      </div>

      {/* Overall Score + Breakdown Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Big Score */}
        <Card className={`card-glow border ${scoreBgClass(readiness.overall)} sm:col-span-1`}>
          <CardContent className="py-8 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
              Overall Score
            </span>
            <span
              className={`text-6xl font-bold tabular-nums ${scoreColor(readiness.overall)}`}
            >
              {readiness.overall}
            </span>
            <span className="text-sm text-muted-foreground mt-1">/ 100</span>
            <Badge
              variant="secondary"
              className="mt-3 text-xs"
            >
              {readiness.overall >= 70
                ? "On Track"
                : readiness.overall >= 40
                  ? "Making Progress"
                  : "Just Getting Started"}
            </Badge>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card className="card-glow sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-semibold tracking-tight">
              Score Breakdown
            </CardTitle>
            <CardDescription className="text-xs">
              Weighted contribution to your readiness score
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {readiness.breakdown.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {item.category}{" "}
                    <span className="text-muted-foreground/60">
                      ({Math.round(item.weight * 100)}%)
                    </span>
                  </span>
                  <span className={`font-semibold tabular-nums ${scoreColor(item.score)}`}>
                    {item.score}
                  </span>
                </div>
                <div className={`h-2 rounded-full ${barBg(item.score)}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor(item.score)}`}
                    style={{ width: `${Math.max(item.score, 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <Card className="card-glow">
          <CardContent className="py-4">
            <div className="text-2xl font-bold tabular-nums text-foreground">
              {maturity.mature}
            </div>
            <div className="text-xs text-muted-foreground">
              Mature Cards
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">
              of {maturity.total} tracked
            </div>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardContent className="py-4">
            <div className="text-2xl font-bold tabular-nums text-foreground">
              {stats.questionCount}
            </div>
            <div className="text-xs text-muted-foreground">
              Total Questions
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">
              across {stats.topicCount} topics
            </div>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardContent className="py-4">
            <div className="text-2xl font-bold tabular-nums text-foreground">
              {maturity.percentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              FSRS Maturity
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">
              cards in Review state
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Topic Progress Table */}
      <Card className="card-glow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-sans font-semibold tracking-tight">
            Topic Progress
          </CardTitle>
          <CardDescription className="text-xs">
            Coverage and accuracy across all {topics.length} procedural domains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-medium px-1">
              <div className="col-span-4">Topic</div>
              <div className="col-span-2 text-right">Coverage</div>
              <div className="col-span-2 text-right">Accuracy</div>
              <div className="col-span-4">Combined</div>
            </div>

            {/* Rows */}
            {topicScores.map((topic) => (
              <Link
                key={topic.topicId}
                href={`/study/${topic.slug}`}
                className="block group"
              >
                <div className="grid grid-cols-12 gap-2 items-center py-2 px-1 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="col-span-4 text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {topic.title}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {topic.studied}/{topic.totalSections}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {topic.quizAttempts > 0
                        ? `${topic.accuracyPct}%`
                        : "--"}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <div className={`flex-1 h-2 rounded-full ${barBg(topic.combined)}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor(topic.combined)}`}
                        style={{ width: `${Math.max(topic.combined, 2)}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs tabular-nums font-semibold w-8 text-right ${scoreColor(topic.combined)}`}
                    >
                      {topic.combined}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weakest + Strongest */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Weakest Areas */}
        <Card className="card-glow border-red-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-semibold tracking-tight flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-400" />
              Weakest Areas
            </CardTitle>
            <CardDescription className="text-xs">
              Focus here to improve your score fastest
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {weakest3.map((topic, i) => (
              <Link
                key={topic.topicId}
                href={`/study/${topic.slug}`}
                className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-400/60 w-4">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {topic.combined}
                  </Badge>
                  <ArrowRight className="h-3 w-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Strongest Areas */}
        <Card className="card-glow border-emerald-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-semibold tracking-tight flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Strongest Areas
            </CardTitle>
            <CardDescription className="text-xs">
              Your most confident topics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {strongest3.map((topic, i) => (
              <Link
                key={topic.topicId}
                href={`/study/${topic.slug}`}
                className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400/60 w-4">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {topic.combined}
                  </Badge>
                  <ArrowRight className="h-3 w-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Call to action */}
      <Card className="border-dashed">
        <CardContent className="py-5">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/5">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium text-foreground">
                Improve your readiness score
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Study topics, complete quizzes, and work through complication scenarios to increase each component.
              </p>
            </div>
            <Link href="/quiz">
              <Badge className="cursor-pointer hover:bg-primary/90">
                Start Quiz
              </Badge>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
