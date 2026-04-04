import { getChecklistById, getAllChecklists } from "@/lib/content";
import { ProcedureChecklist } from "@/components/checklists/procedure-checklist";
import { notFound } from "next/navigation";

interface ChecklistPageProps {
  params: Promise<{ checklistId: string }>;
}

export async function generateStaticParams() {
  const checklists = getAllChecklists();
  return checklists.map((c) => ({ checklistId: c.id }));
}

export default async function ChecklistPage({ params }: ChecklistPageProps) {
  const { checklistId } = await params;
  const checklist = getChecklistById(checklistId);

  if (!checklist) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <ProcedureChecklist checklist={checklist} />
    </div>
  );
}
