import Link from "next/link";
import { ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllChecklists } from "@/lib/content";

export default function ChecklistsPage() {
  const checklists = getAllChecklists();

  if (checklists.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-emerald-600" />
          Procedure Checklists
        </h1>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No procedure checklists loaded yet.</p>
            <p className="text-sm mt-2">
              Add checklist JSON files to the content/checklists/ directory.
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
          <ListChecks className="h-6 w-6 text-emerald-600" />
          Procedure Checklists
        </h1>
        <p className="text-muted-foreground mt-1">
          Interactive step-by-step procedure guides with safety callouts and
          teaching points.
        </p>
      </div>

      <div className="grid gap-3">
        {checklists.map((checklist) => (
          <Link key={checklist.id} href={`/checklists/${checklist.id}`}>
            <Card className="hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors cursor-pointer">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{checklist.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {checklist.steps.length} steps
                  </Badge>
                </div>
                <div className="flex gap-1 mt-1">
                  <Badge className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    {checklist.relatedTopic.replace(/-/g, " ")}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
