import Link from "next/link";
import { HelpCircle, Clock, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllTopics, getAllQuizBanks } from "@/lib/content";
import { getCardStats, getDueCards, initializeCardsForQuiz } from "@/lib/fsrs";

export default function QuizPage() {
  const topics = getAllTopics();
  const quizBanks = getAllQuizBanks();

  // Initialize cards for any quiz banks that exist
  for (const bank of quizBanks) {
    const questionIds = bank.questions.map((q) => q.id);
    initializeCardsForQuiz(bank.topicId, questionIds);
  }

  const allDue = getDueCards();
  const overallStats = getCardStats();

  // Map quiz banks to topics for display
  const topicsWithQuizzes = topics
    .filter((t) => quizBanks.some((qb) => qb.topicId === t.id))
    .map((topic) => {
      const bank = quizBanks.find((qb) => qb.topicId === topic.id);
      const stats = getCardStats(topic.id);
      return { topic, bank: bank!, stats };
    });

  if (quizBanks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-green-600" />
          Quiz Mode
        </h1>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No quiz questions loaded yet.</p>
            <p className="text-sm mt-2">
              Add quiz JSON files to the content/quizzes/ directory.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-green-600" />
          Quiz Mode
        </h1>
        <p className="text-muted-foreground mt-1">
          Spaced repetition powered by FSRS. Review due cards or practice by
          topic.
        </p>
      </div>

      {/* Due Cards Summary */}
      {allDue.length > 0 && (
        <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
          <CardHeader className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <CardTitle className="text-base">
                  {allDue.length} cards due for review
                </CardTitle>
              </div>
              <Link href="/quiz/session?mode=due">
                <Button size="sm">Start Review</Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Overall Stats */}
      <Card>
        <CardHeader className="py-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Card Stats</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total:</span>{" "}
              <span className="font-medium">{overallStats.total}</span>
            </div>
            <div>
              <span className="text-muted-foreground">New:</span>{" "}
              <span className="font-medium text-blue-600">
                {overallStats.new}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Learning:</span>{" "}
              <span className="font-medium text-orange-600">
                {overallStats.learning}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Review:</span>{" "}
              <span className="font-medium text-green-600">
                {overallStats.review}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Due:</span>{" "}
              <span className="font-medium text-red-600">
                {overallStats.due}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Selection */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Practice by Topic</h2>
        <div className="grid gap-3">
          {topicsWithQuizzes.map(({ topic, bank, stats }) => (
            <Link key={topic.id} href={`/quiz/session?topicId=${topic.id}`}>
              <Card className="hover:border-green-300 transition-colors cursor-pointer">
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      <span className="text-muted-foreground mr-2 text-sm">
                        {topic.domain}.
                      </span>
                      {topic.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {stats.due > 0 && (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          {stats.due} due
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {bank.questions.length} questions
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-xs">
                    {stats.new > 0 && `${stats.new} new · `}
                    {stats.learning > 0 && `${stats.learning} learning · `}
                    {stats.review > 0 && `${stats.review} review`}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
