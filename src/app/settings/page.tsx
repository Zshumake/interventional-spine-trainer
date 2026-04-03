import { Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <Settings className="h-6 w-6" />
        Settings
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            To enable AI-generated case simulations, add your Anthropic API key
            to <code className="bg-muted px-1 rounded">.env.local</code>:
          </p>
          <pre className="bg-muted p-3 rounded text-xs mt-2">
            ANTHROPIC_API_KEY=sk-ant-...
          </pre>
          <p className="mt-3">
            The core app (Study Mode, Quiz Mode, pre-built cases) works fully
            without an API key.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
