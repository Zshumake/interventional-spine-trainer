import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgressPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-amber-600" />
        Progress Dashboard
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            The progress dashboard will show your study completion, quiz
            accuracy by topic, spaced repetition stats, and case completion
            history.
          </p>
          <p>
            Start studying and taking quizzes to populate your progress data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
