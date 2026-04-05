import Link from "next/link";
import { Stethoscope } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllCases } from "@/lib/content";

const difficultyColors = {
  beginner:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };

export default function CasesPage() {
  const cases = getAllCases().sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  );

  if (cases.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-purple-600" />
          Case Simulator
        </h1>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No case scenarios loaded yet.</p>
            <p className="text-sm mt-2">
              Add case JSON files to the content/cases/ directory.
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
          <Stethoscope className="h-6 w-6 text-purple-600" />
          Case Simulator
        </h1>
        <p className="text-muted-foreground mt-1">
          Work through realistic clinical scenarios requiring procedural
          decisions, level selection, and result interpretation.
        </p>
      </div>

      <div className="grid gap-3">
        {cases.map((c) => (
          <Link key={c.id} href={`/cases/${c.id}`}>
            <Card className="hover:border-purple-300 transition-colors cursor-pointer">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{c.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-[10px] ${difficultyColors[c.difficulty]}`}
                    >
                      {c.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {c.questions.length} questions
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-xs line-clamp-2">
                  {c.presentation.history.slice(0, 150)}...
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
