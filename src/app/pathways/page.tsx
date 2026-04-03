import Link from "next/link";
import { GitBranch } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPathways } from "@/lib/content";

export default function PathwaysPage() {
  const pathways = getAllPathways();

  if (pathways.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <GitBranch className="h-6 w-6 text-indigo-600" />
          Decision Pathways
        </h1>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No decision pathways loaded yet.</p>
            <p className="text-sm mt-2">
              Add pathway JSON files to the content/pathways/ directory.
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
          <GitBranch className="h-6 w-6 text-indigo-600" />
          Decision Pathways
        </h1>
        <p className="text-muted-foreground mt-1">
          Interactive clinical decision-making guides with evidence at each
          branch point.
        </p>
      </div>

      <div className="grid gap-3">
        {pathways.map((pathway) => (
          <Link key={pathway.id} href={`/pathways/${pathway.id}`}>
            <Card className="hover:border-indigo-300 transition-colors cursor-pointer">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{pathway.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {Object.keys(pathway.nodes).length} nodes
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {pathway.description}
                </CardDescription>
                {pathway.relatedTopics.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {pathway.relatedTopics.slice(0, 3).map((topic) => (
                      <Badge
                        key={topic}
                        className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                      >
                        {topic.replace(/-/g, " ")}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
