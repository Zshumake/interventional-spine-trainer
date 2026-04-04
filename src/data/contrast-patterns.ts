export interface ContrastPattern {
  id: string;
  name: string;
  dangerLevel: "safe" | "caution" | "danger";
  imagePath: string;
  characteristics: string[];
  clinicalAction: string;
  description: string;
}

export const CONTRAST_PATTERNS: ContrastPattern[] = [
  {
    id: "normal-epidural",
    name: "Normal Epidural",
    dangerLevel: "safe",
    imagePath: "/images/procedures/epidural-contrast-pattern.jpg",
    characteristics: [
      "Heterogeneous density with vacuoles",
      "Nerve root outlining (sleeve sign)",
      "Medial spread toward midline",
      "Stops at anterior epidural space",
      "Segmental distribution (1-3 levels)",
    ],
    clinicalAction:
      "Safe to proceed with steroid injection. Document spread pattern and number of levels covered.",
    description:
      "Classic epidural contrast pattern showing heterogeneous spread with air vacuoles interspersed in the contrast column. Nerve root sleeves are outlined as contrast tracks along exiting roots. Spread is contained within the epidural space and does not cross midline easily due to the plica mediana dorsalis.",
  },
  {
    id: "vascular-uptake",
    name: "Vascular Uptake",
    dangerLevel: "danger",
    imagePath: "/images/procedures/placeholder-vascular-uptake.jpg",
    characteristics: [
      "Rapid clearing of contrast on live fluoro",
      "Linear or branching tubular pattern",
      '"Hairpin turn" in radiculomedullary arteries',
      "No persistent epidural pooling",
      "May see contrast in paravertebral veins",
    ],
    clinicalAction:
      "STOP injection immediately. Reposition needle and re-confirm epidural placement with new contrast injection. Intravascular injection of particulate steroid can cause spinal cord infarction.",
    description:
      "Vascular uptake occurs when the needle tip is intravascular, either in an epidural vein or, critically, in a radiculomedullary artery (artery of Adamkiewicz). Arterial uptake shows a characteristic hairpin turn as contrast flows retrograde toward the anterior spinal artery. This is an emergency pattern — particulate steroid injection here can cause paraplegia.",
  },
  {
    id: "subdural",
    name: "Subdural Spread",
    dangerLevel: "caution",
    imagePath: "/images/procedures/interlaminar-clo-subdural.jpg",
    characteristics: [
      'Sharp, well-defined margins ("pencil-line" edges)',
      '"Tram track" parallel lines on AP view',
      "Wider cranio-caudal spread than expected",
      "Smooth contour without nerve root sleeves",
      "Spreads more easily than epidural contrast",
    ],
    clinicalAction:
      "Do NOT inject steroid — subdural steroid can cause arachnoiditis. Reposition needle to epidural space and re-confirm with new contrast run. Monitor patient for delayed neurological symptoms.",
    description:
      "Subdural spread occurs when the needle penetrates the dura but stops in the potential space between dura and arachnoid mater. The contrast has very sharp, smooth margins because it is contained by the meningeal layers rather than spreading through the irregular epidural fat. The tram-track sign on AP view is pathognomonic. Spread is typically wider than expected for the volume injected.",
  },
  {
    id: "intrathecal",
    name: "Intrathecal Spread",
    dangerLevel: "danger",
    imagePath: "/images/procedures/placeholder-intrathecal.jpg",
    characteristics: [
      "Myelographic pattern — outlines entire thecal sac",
      "Cauda equina nerve roots visible as filling defects",
      "Very wide spread (entire lumbar spine) from small volume",
      "Contrast mixes freely with CSF",
      "Gravity-dependent layering",
    ],
    clinicalAction:
      "STOP injection immediately. Do NOT inject steroid — intrathecal particulate steroid is neurotoxic. If non-particulate steroid was used, monitor for high spinal block. Check vitals, prepare for potential respiratory compromise. Document and observe for 30+ minutes.",
    description:
      "Intrathecal spread indicates dural puncture with needle tip in the subarachnoid space. Even a small volume of contrast produces a classic myelographic appearance with nerve roots of the cauda equina outlined as linear filling defects within the contrast column. This is the most dangerous misplacement for steroid injection — particulate steroids in the intrathecal space can cause chemical meningitis and arachnoiditis.",
  },
  {
    id: "false-lor",
    name: "False LOR / Non-Epidural",
    dangerLevel: "caution",
    imagePath: "/images/procedures/false-lor-contrast-pattern.jpg",
    characteristics: [
      "Fascial plane or interspinous ligament spread",
      "No nerve root outlining",
      "Dorsal to ventral interlaminar line (VILL)",
      "Linear tracking along ligamentous planes",
      "Does not cross midline or spread laterally",
    ],
    clinicalAction:
      "Withdraw needle and re-attempt epidural access. The needle has not entered the epidural space — injecting steroid here will have no therapeutic effect. Reassess depth and angle of approach.",
    description:
      "False loss of resistance occurs when the needle tip encounters a tissue plane that gives a false sense of LOR, typically in the interspinous ligament or paraspinal fascia. The contrast pattern is distinctly non-epidural — it tracks along fascial or ligamentous planes dorsal to the ventral interlaminar line and does not outline nerve roots. Recognizing this pattern prevents futile steroid injection into non-target tissue.",
  },
  {
    id: "true-epidural-3view",
    name: "True Epidural (3-View Comparison)",
    dangerLevel: "safe",
    imagePath: "/images/procedures/interlaminar-true-epidural-3view.jpg",
    characteristics: [
      "CLO view: contrast ventral to VILL",
      "Lateral view: contrast in posterior epidural space",
      "AP view: midline spread with nerve root sleeves",
      "Consistent pattern across all three views",
      "Heterogeneous density typical of epidural fat",
    ],
    clinicalAction:
      "Confirmed epidural placement. Safe to proceed with therapeutic injection. This multi-view confirmation is the gold standard for interlaminar approaches.",
    description:
      "The three-view comparison (contralateral oblique, lateral, and AP) provides the highest confidence of true epidural placement during interlaminar approaches. The CLO view shows contrast ventral to the ventral interlaminar line, the lateral confirms posterior epidural space placement, and the AP view demonstrates characteristic bilateral spread with nerve root sleeve filling. All three views should be concordant before proceeding with steroid injection.",
  },
];
