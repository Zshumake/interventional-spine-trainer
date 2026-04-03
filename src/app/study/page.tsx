import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllTopics } from "@/lib/content";

export default function StudyPage() {
  const topics = getAllTopics();

  if (topics.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          Study Mode
        </h1>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No study content loaded yet.</p>
            <p className="text-sm mt-2">
              Add topic JSON files to the content/topics/ directory.
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
          <BookOpen className="h-6 w-6 text-blue-600" />
          Study Mode
        </h1>
        <p className="text-muted-foreground mt-1">
          {topics.length} topics covering interventional spine procedures,
          evidence, and clinical decision-making.
        </p>
      </div>

      <div className="grid gap-3">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/study/${topic.slug}`}>
            <Card className="hover:border-blue-300 transition-colors cursor-pointer">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    <span className="text-muted-foreground mr-2 text-sm">
                      {topic.domain}.
                    </span>
                    {topic.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {topic.sections.length} sections
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {topic.sections.map((s) => s.title).join(" · ")}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
