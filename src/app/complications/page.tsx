import Link from "next/link";
import { AlertTriangle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllComplications } from "@/lib/content";

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };

export default function ComplicationsPage() {
  const complications = getAllComplications().sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  );

  if (complications.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          Complication Simulator
        </h1>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No complication scenarios loaded yet.</p>
            <p className="text-sm mt-2">
              Add scenario JSON files to the content/complications/ directory.
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
          <AlertTriangle className="h-6 w-6 text-red-600" />
          Complication Simulator
        </h1>
        <p className="text-muted-foreground mt-1">
          Time-pressured procedural complication scenarios for crisis management
          training.
        </p>
      </div>

      <div className="grid gap-3">
        {complications.map((scenario) => (
          <Link key={scenario.id} href={`/complications/${scenario.id}`}>
            <Card className="hover:border-red-300 transition-colors cursor-pointer">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{scenario.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-[10px] ${difficultyColors[scenario.difficulty]}`}
                    >
                      {scenario.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {scenario.decisions.length} decisions
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-xs">
                  {scenario.procedure}
                </CardDescription>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{scenario.timeLimit}s per decision</span>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
