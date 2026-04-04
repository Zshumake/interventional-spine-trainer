/**
 * YouTube procedure videos mapped by topic ID.
 * Each topic can have multiple videos.
 * Add new videos by adding entries to the arrays below.
 */

export interface ProcedureVideo {
  youtubeId: string;
  title: string;
  channel: string;
  duration?: string;
  description: string;
}

export const PROCEDURE_VIDEOS: Record<string, ProcedureVideo[]> = {
  "transforaminal-epidurals": [
    {
      youtubeId: "UdADg9l3ifc",
      title: "Lumbar Transforaminal Injection",
      channel: "The Spine & Pain Institute of New York",
      duration: "2:50",
      description: "Fluoroscopy-guided lumbar TFESI technique showing needle placement, contrast injection, and epidural spread pattern.",
    },
  ],
  "interlaminar-caudal-epidurals": [],
  "cervical-epidurals": [],
  "diagnostic-nerve-blocks": [],
  "facet-pain-medial-branch-blocks": [],
  "radiofrequency-ablation": [],
  "facet-cyst-rupture": [],
  "si-joint": [],
  "c1-c2-injections": [],
  "discogenic-pain-bvn-ablation": [],
  "anticoagulation-management": [],
  "ethics-billing-medicolegal": [],
  "sympathetic-blocks": [],
  "neuromodulation-scs": [
    {
      youtubeId: "_1xMxFZa6tU",
      title: "DRG Stimulator Placement Technique",
      channel: "Journal of Neurosurgical Focus",
      description: "Dorsal root ganglion stimulator placement with fluoroscopic guidance. Shows lead positioning in the neuroforamen.",
    },
  ],
  "neurolytic-procedures": [],
};

export function getVideosForTopic(topicId: string): ProcedureVideo[] {
  return PROCEDURE_VIDEOS[topicId] ?? [];
}
