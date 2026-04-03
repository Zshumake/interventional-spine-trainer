import { getPathwayById, getAllPathways } from "@/lib/content";
import { PathwayViewer } from "@/components/pathways/pathway-viewer";
import { notFound } from "next/navigation";

interface PathwayPageProps {
  params: Promise<{ pathwayId: string }>;
}

export async function generateStaticParams() {
  const pathways = getAllPathways();
  return pathways.map((p) => ({ pathwayId: p.id }));
}

export default async function PathwayPage({ params }: PathwayPageProps) {
  const { pathwayId } = await params;
  const pathway = getPathwayById(pathwayId);

  if (!pathway) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <PathwayViewer pathway={pathway} />
    </div>
  );
}
