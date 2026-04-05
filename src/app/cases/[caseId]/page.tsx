import { getCaseById, getAllCases } from "@/lib/content";
import { CasePresenter } from "@/components/cases/case-presenter";
import { notFound } from "next/navigation";

interface CasePageProps {
  params: Promise<{ caseId: string }>;
}

export async function generateStaticParams() {
  const cases = getAllCases();
  return cases.map((c) => ({ caseId: c.id }));
}

export default async function CasePage({ params }: CasePageProps) {
  const { caseId } = await params;
  const caseData = getCaseById(caseId);

  if (!caseData) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <CasePresenter caseData={caseData} />
    </div>
  );
}
