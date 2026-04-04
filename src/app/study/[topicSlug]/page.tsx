import { notFound } from "next/navigation";
import { BookOpen, Lightbulb, FlaskConical, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllTopics, getTopicBySlug } from "@/lib/content";
import { getTermsForTopic, getAllTerms } from "@/lib/glossary";
import { getImagesForTopic } from "@/lib/procedure-images";
import { getVideosForTopic } from "@/data/procedure-videos";
import { TopicContent } from "@/components/study/topic-content";
import { ProcedureImages } from "@/components/study/procedure-images";
import { ProcedureVideos } from "@/components/study/procedure-videos";

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((t) => ({ topicSlug: t.slug }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const { topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    notFound();
  }

  // Load glossary terms relevant to this topic (+ some general terms)
  const topicTerms = getTermsForTopic(topic.id);
  const allTerms = getAllTerms();
  // Combine topic-specific terms with general terms, deduplicated
  const glossaryTerms = [
    ...topicTerms,
    ...allTerms.filter(
      (t) => !topicTerms.some((tt) => tt.id === t.id)
    ),
  ].slice(0, 100); // Cap at 100 terms for performance

  const procedureImages = getImagesForTopic(topic.id);
  const procedureVideos = getVideosForTopic(topic.id);

  const sectionIcons: Record<string, React.ReactNode> = {
    technique: <FlaskConical className="h-4 w-4" />,
    "clinical-decision-making": <Lightbulb className="h-4 w-4" />,
    evidence: <GraduationCap className="h-4 w-4" />,
    "clinical-pearls": <BookOpen className="h-4 w-4" />,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Badge variant="outline" className="mb-2">
          Domain {topic.domain}
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight">{topic.title}</h1>
      </div>

      {procedureImages.length > 0 && (
        <ProcedureImages images={procedureImages} />
      )}

      {procedureVideos.length > 0 && (
        <ProcedureVideos videos={procedureVideos} />
      )}

      <Tabs defaultValue={topic.sections[0]?.id} className="w-full">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1">
          {topic.sections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="text-xs"
            >
              <span className="mr-1">{sectionIcons[section.id]}</span>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {topic.sections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {sectionIcons[section.id]}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <TopicContent content={section.content} glossaryTerms={glossaryTerms} />

                {section.keyPoints.length > 0 && (
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                    <h3 className="text-sm font-semibold mb-2 text-primary">Key Points</h3>
                    <ul className="space-y-1.5">
                      {section.keyPoints.map((point, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-primary/60 shrink-0 mt-0.5">&#x2022;</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.references && section.references.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold mb-2">References</h3>
                    <ul className="space-y-1">
                      {section.references.map((ref, i) => (
                        <li key={i} className="text-xs text-muted-foreground">
                          {ref.authors} ({ref.year}). {ref.title}.{" "}
                          <em>{ref.journal}</em>.
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
