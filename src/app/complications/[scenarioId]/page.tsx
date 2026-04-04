import { getComplicationById, getAllComplications } from "@/lib/content";
import { ScenarioPresenter } from "@/components/complications/scenario-presenter";
import { notFound } from "next/navigation";

interface ComplicationPageProps {
  params: Promise<{ scenarioId: string }>;
}

export async function generateStaticParams() {
  const complications = getAllComplications();
  return complications.map((c) => ({ scenarioId: c.id }));
}

export default async function ComplicationPage({ params }: ComplicationPageProps) {
  const { scenarioId } = await params;
  const scenario = getComplicationById(scenarioId);

  if (!scenario) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <ScenarioPresenter scenario={scenario} />
    </div>
  );
}
