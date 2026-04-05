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
    {
      youtubeId: "jD3VsRvi8UY",
      title: "Selective Nerve Root Block or Transforaminal Epidural Steroid Injection",
      channel: "Joseph Ibrahim",
      description: "Educational overview of SNRB/TFESI technique with fluoroscopic guidance, covering indications and needle positioning.",
    },
  ],
  "interlaminar-caudal-epidurals": [
    {
      youtubeId: "Dzdrll54B-Q",
      title: "Lumbar Epidural Steroid Injections: 9 Things You NEED to Know!",
      channel: "Jacob Kneeman",
      description: "Comprehensive overview of lumbar epidural steroid injections covering indications, technique, risks, and what to expect.",
    },
    {
      youtubeId: "DCLd6DsoUSg",
      title: "Fluoroscopic Caudal Epidural Contrast Spread",
      channel: "The Procedure Guide",
      description: "Demonstrates caudal epidural injection under fluoroscopy showing contrast spread through the sacral canal into the lumbar epidural space.",
    },
  ],
  "cervical-epidurals": [
    {
      youtubeId: "UsE1wcoUAoI",
      title: "Interlaminar Cervical Epidural Steroid Injection: Step-by-Step Guide",
      channel: "International Anesthesia Research Society",
      description: "Step-by-step demonstration of cervical interlaminar ESI technique with fluoroscopic guidance, covering patient positioning, needle advancement, and contrast confirmation.",
    },
  ],
  "diagnostic-nerve-blocks": [
    {
      youtubeId: "jD3VsRvi8UY",
      title: "Selective Nerve Root Block or Transforaminal Epidural Steroid Injection",
      channel: "Joseph Ibrahim",
      description: "Covers the diagnostic use of selective nerve root blocks for localizing the pain generator, and the overlap with transforaminal epidural technique.",
    },
  ],
  "facet-pain-medial-branch-blocks": [
    {
      youtubeId: "3fhPb-ZNml4",
      title: "Lumbar Medial Branch Block",
      channel: "The Spine & Pain Institute of New York",
      description: "Fluoroscopy-guided lumbar medial branch block technique showing target identification at the SAP/TP junction and needle positioning.",
    },
  ],
  "radiofrequency-ablation": [
    {
      youtubeId: "jr3Ajtr792w",
      title: "Radiofrequency Ablation Technique and Process Explained",
      channel: "The Iowa Clinic",
      description: "Explains the RFA process including electrode placement parallel to the medial branch nerve, stimulation testing, and lesion creation parameters.",
    },
  ],
  "facet-cyst-rupture": [
    {
      youtubeId: "1ujaz5h3ZVo",
      title: "Synovial Cyst Of The Spine - Everything You Need To Know",
      channel: "Nabil Ebraheim",
      description: "Educational overview of spinal synovial cysts including pathophysiology, imaging findings, and treatment options including percutaneous rupture.",
    },
  ],
  "si-joint": [
    {
      youtubeId: "xmwqcnN_r3g",
      title: "Intra-Articular Injection of the Sacroiliac Joint Under Fluoroscopic Guidance",
      channel: "JBJSmedia",
      description: "Demonstrates fluoroscopy-guided SI joint injection technique including joint line identification, needle placement, and arthrogram confirmation.",
    },
  ],
  "c1-c2-injections": [
    {
      youtubeId: "GjfQ8spT32k",
      title: "AA and AO Injections",
      channel: "Kenneth Candido",
      description: "Demonstrates atlantoaxial (C1-2) and atlanto-occipital joint injection techniques with fluoroscopic guidance, covering safe corridors relative to the vertebral artery.",
    },
  ],
  "discogenic-pain-bvn-ablation": [
    {
      youtubeId: "rzsMI_D9fto",
      title: "Intracept Procedure for Back Pain: What Happens During Basivertebral Ablation?",
      channel: "Dr. Brian Su - The Spine Guy",
      description: "Overview of the Intracept basivertebral nerve ablation procedure including patient selection, transpedicular approach, and RF lesion parameters.",
    },
  ],
  "anticoagulation-management": [],
  "ethics-billing-medicolegal": [],
  "sympathetic-blocks": [
    {
      youtubeId: "B6ROeVFUJSY",
      title: "Ultrasound Guided Stellate Ganglion Block",
      channel: "Regional Anesthesiology and Acute Pain Medicine",
      description: "Demonstrates ultrasound-guided stellate ganglion block technique at the C6-C7 level with real-time needle visualization and local anesthetic spread.",
    },
    {
      youtubeId: "prOPBvacf3w",
      title: "Celiac Plexus Block Fluoroscopy Technique",
      channel: "DARADIA: The Pain Clinic",
      description: "Fluoroscopy-guided celiac plexus and splanchnic nerve block technique showing bilateral posterior approach at T12-L1 level.",
    },
  ],
  "neuromodulation-scs": [
    {
      youtubeId: "-rWuzfYkd5M",
      title: "Spinal Cord Stimulator Trial",
      channel: "The Spine & Pain Institute of New York",
      description: "Demonstrates percutaneous SCS trial lead placement technique with fluoroscopic guidance showing Tuohy needle insertion and lead positioning.",
    },
    {
      youtubeId: "_1xMxFZa6tU",
      title: "DRG Stimulator Placement Technique",
      channel: "Journal of Neurosurgical Focus",
      description: "Dorsal root ganglion stimulator placement with fluoroscopic guidance showing lead positioning in the neuroforamen.",
    },
  ],
  "neurolytic-procedures": [
    {
      youtubeId: "prOPBvacf3w",
      title: "Celiac Plexus Block Fluoroscopy Technique",
      channel: "DARADIA: The Pain Clinic",
      description: "Fluoroscopy-guided celiac plexus block technique — the same approach is used for neurolysis with phenol or alcohol instead of local anesthetic.",
    },
  ],
};

export function getVideosForTopic(topicId: string): ProcedureVideo[] {
  return PROCEDURE_VIDEOS[topicId] ?? [];
}
