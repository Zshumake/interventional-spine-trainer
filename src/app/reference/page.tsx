import Link from "next/link";
import { ClipboardList, Pill, Wrench, Receipt } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_REFERENCE_CARDS } from "@/data/reference-cards";

const categoryIcons: Record<string, typeof Pill> = {
  medications: Pill,
  equipment: Wrench,
  billing: Receipt,
};

const categoryColors: Record<string, string> = {
  medications: "bg-emerald-500/10 text-emerald-500",
  equipment: "bg-amber-500/10 text-amber-500",
  billing: "bg-blue-500/10 text-blue-500",
};

export default function ReferencePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          Quick Reference
        </h1>
        <p className="text-muted-foreground mt-1">
          Clinical reference cards for the procedure suite. Viewable on mobile,
          printable on paper.
        </p>
      </div>

      <div className="grid gap-3">
        {ALL_REFERENCE_CARDS.map((card) => {
          const Icon = categoryIcons[card.category] ?? ClipboardList;
          return (
            <Link key={card.id} href={`/reference/${card.id}`}>
              <Card className="card-glow hover:border-primary/30 transition-all cursor-pointer">
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${categoryColors[card.category] ?? "bg-primary/10 text-primary"}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-base font-sans font-semibold">
                        {card.title}
                      </CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {card.category}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
