import { Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CasesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <Stethoscope className="h-6 w-6 text-purple-600" />
        Case Simulator
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Coming in Phase 3</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            The case simulator will present realistic clinical scenarios
            requiring you to make procedural decisions, justify level selection,
            and interpret results.
          </p>
          <p>
            Pre-built cases will work offline. AI-generated cases will be
            available with a Claude API key.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
