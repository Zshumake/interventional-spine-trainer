import type { ProcedureImage } from "@/components/study/procedure-images";

/**
 * Procedure images mapped by topic ID.
 * All images sourced from PMC Open Access articles under CC BY or CC BY-NC license.
 * For personal educational use only.
 */
export const PROCEDURE_IMAGES: Record<string, ProcedureImage[]> = {
  "transforaminal-epidurals": [
    {
      src: "/images/procedures/tfesi-kumar-fig1.jpg",
      alt: "TFESI needle advancement under fluoroscopy",
      caption:
        "Fluoroscopic-guided transforaminal epidural steroid injection showing needle advancement toward the neuroforamen. The needle is positioned in the safe triangle below the pedicle.",
      credit: "Kumar et al., PMC10653120, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10653120/",
    },
    {
      src: "/images/procedures/tfesi-kumar-fig2.jpg",
      alt: "TFESI AP view with contrast spread",
      caption:
        "AP fluoroscopic view showing contrast spread pattern during lumbar TFESI. Note the epidural flow pattern outlining the nerve root sleeve.",
      credit: "Kumar et al., PMC10653120, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10653120/",
    },
    {
      src: "/images/procedures/tfesi-kumar-fig3.jpg",
      alt: "TFESI lateral view confirming needle position",
      caption:
        "Lateral fluoroscopic view confirming needle tip position in the anterior epidural space at the level of the neuroforamen.",
      credit: "Kumar et al., PMC10653120, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10653120/",
    },
    {
      src: "/images/procedures/tfesi-kumar-fig4.jpg",
      alt: "TFESI contrast flow pattern",
      caption:
        "Final contrast flow pattern showing epidural spread. A good pattern outlines the nerve root and flows medially into the epidural space.",
      credit: "Kumar et al., PMC10653120, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10653120/",
    },
    {
      src: "/images/procedures/scotty-dog-s1-tfesi-fig1.jpg",
      alt: "Scotty dog oblique view for S1 TFESI",
      caption:
        "Oblique 'Scotty dog' fluoroscopic view used for S1 transforaminal approach. The Scotty dog anatomy is visible: ear (SAP), eye (pedicle), nose (transverse process), neck (pars interarticularis).",
      credit: "Lee et al., PMC7581171, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7581171/",
    },
    {
      src: "/images/procedures/scotty-dog-s1-tfesi-fig2.jpg",
      alt: "AP vs oblique approach comparison for S1 TFESI",
      caption:
        "Comparison of AP approach vs oblique Scotty dog approach for S1 transforaminal epidural steroid injection. The oblique approach provides better visualization of the safe triangle.",
      credit: "Lee et al., PMC7581171, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7581171/",
    },
    {
      src: "/images/procedures/scotty-dog-s1-tfesi-fig3.jpg",
      alt: "S1 TFESI contrast pattern comparison",
      caption:
        "Contrast flow patterns comparing AP and oblique Scotty dog approaches for S1 TFESI.",
      credit: "Lee et al., PMC7581171, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7581171/",
    },
  ],
  "interlaminar-caudal-epidurals": [
    {
      src: "/images/procedures/interlaminar-epidural-ap-lateral.jpg",
      alt: "Interlaminar epidural — AP and lateral fluoroscopic views",
      caption:
        "AP (A) and lateral (B) fluoroscopic views during interlaminar epidural steroid injection showing contrast localized to the epidural space.",
      credit: "Shin et al., PMC12078379, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12078379/",
    },
    {
      src: "/images/procedures/interlaminar-clo-technique.jpg",
      alt: "Contralateral oblique (CLO) view technique",
      caption:
        "Fluoroscope positioning to create the contralateral oblique (CLO) view during modified interlaminar approach. The CLO view allows visualization of the ventral interlaminar line (VILL).",
      credit: "Lee et al., PMC7787445, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7787445/",
    },
    {
      src: "/images/procedures/interlaminar-lor-epidural-confirmed.jpg",
      alt: "Loss of resistance technique — epidural confirmed with contrast",
      caption:
        "Needle passing through the ventral interlaminar line using loss-of-resistance technique. Epidural placement confirmed with contrast spread on AP and lateral views.",
      credit: "Lee et al., PMC7787445, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7787445/",
    },
    {
      src: "/images/procedures/interlaminar-true-epidural-3view.jpg",
      alt: "True epidural contrast spread — CLO, lateral, AP comparison",
      caption:
        "True epidural contrast spread shown in contralateral oblique (CLO), lateral, and AP views. Compare with false loss-of-resistance patterns to identify correct epidural placement.",
      credit: "Kim et al., PMC11372962, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11372962/",
    },
    {
      src: "/images/procedures/caudal-sacrum-anatomy.jpg",
      alt: "Caudal approach — posterior sacral anatomy",
      caption:
        "Posterior view of the sacrum showing the sacral hiatus, sacral cornua, and sacral canal — key landmarks for caudal epidural access.",
      credit: "Senoglu et al., PMC5346404, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5346404/",
    },
    {
      src: "/images/procedures/caudal-sacral-hiatus-sagittal.jpg",
      alt: "Caudal approach — sacral hiatus sagittal view",
      caption:
        "Sagittal view of the sacrum showing the sacral hiatus opening and AP diameter. The needle enters through the sacrococcygeal ligament into the sacral epidural space.",
      credit: "Senoglu et al., PMC5346404, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5346404/",
    },
    {
      src: "/images/procedures/caudal-epidural-fluoro.jpg",
      alt: "Caudal epidural injection under fluoroscopy",
      caption:
        "Fluoroscopy-guided caudal epidural block showing contrast spread within the epidural space. Arrows mark the needle position through the sacral hiatus.",
      credit: "Senoglu et al., PMC5346404, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5346404/",
    },
  ],
  "cervical-epidurals": [
    {
      src: "/images/procedures/cervical-interlaminar-lateral-clo.jpg",
      alt: "Cervical interlaminar — lateral and CLO views",
      caption:
        "Cervical interlaminar epidural injection: lateral view (A) and contralateral oblique view (B) showing ventral epidural contrast spread. White arrows indicate the Tuohy needle position.",
      credit: "Lee et al., PMC7823639, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7823639/",
    },
    {
      src: "/images/procedures/cervical-interlaminar-ap-lateral.jpg",
      alt: "Cervical interlaminar — AP and lateral epidurogram",
      caption:
        "AP (A) and lateral (B) cervical epidurogram at C6-7 level showing epidural contrast spread via left paramedian approach.",
      credit: "Lee et al., PMC7823639, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7823639/",
    },
    {
      src: "/images/procedures/cervical-tfesi-ap-lateral.jpg",
      alt: "Cervical transforaminal ESI — AP and lateral views",
      caption:
        "Cervical transforaminal epidural steroid injection showing (b) AP view with contrast spreading into the interforaminal space and (c) lateral view with epidural spread.",
      credit: "Al-Siyabi et al., PMC9553110, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9553110/",
    },
  ],
  "diagnostic-nerve-blocks": [
    {
      src: "/images/procedures/snrb-contrast-patterns.jpg",
      alt: "Selective nerve root block — three contrast pattern types",
      caption:
        "Three fluoroscopic contrast patterns during L5 selective nerve root block: Type 1 (contrast along nerve root), Type 2 (contrast in foramen but not around root), Type 3 (no root or foramen contrast). Pattern type affects diagnostic reliability.",
      credit: "Cho et al., PMC10511297, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10511297/",
    },
    {
      src: "/images/procedures/snrb-l5s1-oblique-ap.jpg",
      alt: "L5-S1 selective nerve root block — oblique and AP views",
      caption:
        "L5-S1 case showing MRI with disc herniation and fluoroscopy panels: (B) oblique view with needle tip lateral to pars interarticularis, (C) AP view with contrast outlining the nerve root.",
      credit: "Kim et al., PMC2667587, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2667587/",
    },
    {
      src: "/images/procedures/epidural-contrast-pattern.jpg",
      alt: "Epidural contrast spread pattern — AP and lateral",
      caption:
        "Epidural contrast at L3-L4 interlaminar injection showing heterogeneous density and characteristic vacuoles on AP and lateral views. This pattern confirms correct epidural needle placement.",
      credit: "Bae et al., PMC11571312, Open Access",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11571312/",
    },
    {
      src: "/images/procedures/false-lor-contrast-pattern.jpg",
      alt: "False loss-of-resistance — non-epidural contrast pattern",
      caption:
        "Non-epidural (false loss-of-resistance) contrast spread pattern shown in CLO, lateral, and AP views. Recognizing this pattern prevents incorrect injection into the subdural or interspinous space.",
      credit: "Kim et al., PMC11372962, CC BY 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11372962/",
    },
  ],
  "facet-pain-medial-branch-blocks": [
    {
      src: "/images/procedures/lumbar-mbb-rfa-fluoro.jpg",
      alt: "Lumbar medial branch RFA under fluoroscopy",
      caption:
        "Fluoroscopically guided radiofrequency ablation for lumbar medial branch denervation. (A) AP view showing RF cannulae positioned at the junction of the SAP and transverse process. (B) Lateral view confirming depth and parallel alignment to the target nerve.",
      credit: "Salehi et al., PMC10697193, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10697193/",
    },
    {
      src: "/images/procedures/cervical-mbb-rfa-fluoro.jpg",
      alt: "Cervical medial branch RFA under fluoroscopy",
      caption:
        "Fluoroscopically guided conventional RF for cervical medial branch denervation. (A) AP view showing RF cannulae positioned along the articular pillars. (B) Lateral view confirming safe depth anterior to the posterior pillar margin.",
      credit: "Salehi et al., PMC10697193, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10697193/",
    },
  ],
  "radiofrequency-ablation": [
    {
      src: "/images/procedures/lumbar-mbb-rfa-fluoro.jpg",
      alt: "Lumbar radiofrequency ablation under fluoroscopy",
      caption:
        "Lumbar medial branch radiofrequency ablation. (A) AP view with RF cannulae at SAP/TP junction — the electrode must be parallel to the medial branch nerve for maximal lesion coverage. (B) Lateral view confirming position.",
      credit: "Salehi et al., PMC10697193, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10697193/",
    },
    {
      src: "/images/procedures/cervical-mbb-rfa-fluoro.jpg",
      alt: "Cervical radiofrequency ablation under fluoroscopy",
      caption:
        "Cervical medial branch radiofrequency ablation. Note the RF cannulae positioned along the cervical articular pillars in AP view (A) and confirmed on lateral view (B).",
      credit: "Salehi et al., PMC10697193, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10697193/",
    },
    {
      src: "/images/procedures/si-joint-rfa-fluoro.jpg",
      alt: "Sacroiliac joint RFA under fluoroscopy",
      caption:
        "Fluoroscopically guided radiofrequency ablation for sacroiliac joint denervation. RF cannulae are positioned along the lateral sacrum targeting the sacral lateral branches at S1-S3.",
      credit: "Salehi et al., PMC10697193, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10697193/",
    },
  ],
  "si-joint": [
    {
      src: "/images/procedures/si-joint-injection-fig1.jpg",
      alt: "SI joint injection — AP fluoroscopic view",
      caption:
        "AP fluoroscopic view of the sacroiliac joint. The joint line is identified between the sacrum and ilium. Note the overlapping cortical margins that must be separated with oblique angulation.",
      credit: "Srejic et al., PMC9423991, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9423991/",
    },
    {
      src: "/images/procedures/si-joint-injection-fig2.jpg",
      alt: "SI joint injection — oblique view with needle",
      caption:
        "Oblique fluoroscopic view showing the SI joint line separated for needle access. The needle is advanced into the inferior aspect of the joint using a medial-to-lateral trajectory.",
      credit: "Srejic et al., PMC9423991, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9423991/",
    },
    {
      src: "/images/procedures/si-joint-injection-fig3.jpg",
      alt: "SI joint arthrogram — contrast within joint",
      caption:
        "SI joint arthrogram confirming intra-articular needle placement. Contrast is seen within the joint space as a thin line between the cortical margins. Capsular rupture and ventral spread may indicate capsular defects.",
      credit: "Srejic et al., PMC9423991, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9423991/",
    },
    {
      src: "/images/procedures/si-joint-injection-fig4.jpg",
      alt: "SI joint injection — lateral confirmation",
      caption:
        "Lateral fluoroscopic view confirming SI joint injection depth and needle position relative to the sacrum and ilium.",
      credit: "Srejic et al., PMC9423991, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9423991/",
    },
    {
      src: "/images/procedures/si-joint-rfa-fluoro.jpg",
      alt: "SI joint lateral branch RFA",
      caption:
        "Sacroiliac joint denervation via radiofrequency ablation of the sacral lateral branches. RF cannulae are positioned along the lateral sacrum at S1-S3 levels.",
      credit: "Salehi et al., PMC10697193, CC BY-NC",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10697193/",
    },
  ],
  "facet-cyst-rupture": [
    {
      src: "/images/procedures/facet-cyst-mri.jpg",
      alt: "Synovial cyst on MRI — sagittal and axial views",
      caption:
        "MRI showing L4-5 synovial cyst compressing the thecal sac and right nerve root. Sagittal (left) and axial (right) T2-weighted views demonstrating the cyst arising from the facet joint.",
      credit: "Kim et al., PMC3337386, CC BY-NC 3.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3337386/",
    },
    {
      src: "/images/procedures/facet-cyst-rupture-fluoro.jpg",
      alt: "Fluoroscopic-guided synovial cyst rupture",
      caption:
        "Fluoroscopy during percutaneous cyst aspiration showing (A) cyst distention with contrast, (B) second needle placed in cyst, and (C) Z-point rupture with epidural contrast spread confirming decompression.",
      credit: "Kim et al., PMC3337386, CC BY-NC 3.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3337386/",
    },
    {
      src: "/images/procedures/facet-cyst-resolution-mri.jpg",
      alt: "Follow-up MRI showing cyst resolution",
      caption:
        "Follow-up MRI 6 months after percutaneous aspiration confirming complete cyst resolution. Compare with pre-procedure MRI to appreciate the decompression achieved.",
      credit: "Kim et al., PMC3337386, CC BY-NC 3.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3337386/",
    },
  ],
  "c1-c2-injections": [
    {
      src: "/images/procedures/c1-c2-positioning-fluoro.jpg",
      alt: "C1-2 injection — patient positioning and bilateral needle placement",
      caption:
        "Patient positioning for atlantoaxial joint injection with bilateral spinal needles visible on AP and lateral fluoroscopic views.",
      credit: "Aiyar et al., PMC11907127, CC BY-NC-SA 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11907127/",
    },
    {
      src: "/images/procedures/c1-c2-ap-landmark.jpg",
      alt: "C1-2 joint — AP fluoroscopic landmark identification",
      caption:
        "AP fluoroscopy identifying the lateral atlantoaxial joint. The target is the junction of the lateral one-third and medial two-thirds of the joint space.",
      credit: "Aiyar et al., PMC11907127, CC BY-NC-SA 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11907127/",
    },
    {
      src: "/images/procedures/c1-c2-va-anatomy.jpg",
      alt: "C1-2 joint — vertebral artery anatomy diagram",
      caption:
        "Anatomical diagram showing the relationship between the lateral atlantoaxial joint and the vertebral artery. The safe corridor is medial to the vertebral artery and lateral to the C2 dorsal root ganglion.",
      credit: "Aiyar et al., PMC11907127, CC BY-NC-SA 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11907127/",
    },
    {
      src: "/images/procedures/c1-c2-lateral-arthrogram.jpg",
      alt: "C1-2 joint — lateral view with arthrogram",
      caption:
        "Lateral fluoroscopy confirming needle within the atlantoaxial joint capsule with contrast arthrogram. Anterior recess flow pattern visible.",
      credit: "Aiyar et al., PMC11907127, CC BY-NC-SA 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11907127/",
    },
    {
      src: "/images/procedures/c1-c2-open-mouth-bilateral.jpg",
      alt: "C1-2 joint — open-mouth AP view",
      caption:
        "Open-mouth AP fluoroscopy showing bilateral atlantoaxial joints, dens (odontoid process), and bilateral needle placement with unilateral contrast.",
      credit: "Aiyar et al., PMC11907127, CC BY-NC-SA 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11907127/",
    },
  ],
  "discogenic-pain-bvn-ablation": [
    {
      src: "/images/procedures/bvn-modic-types-diagram.jpg",
      alt: "Modic Types 1, 2, and 3 — schematic diagram",
      caption:
        "Schematic representation of Modic endplate changes: Type 1 (edema/inflammation, T1 dark/T2 bright), Type 2 (fatty replacement, T1 bright/T2 bright), Type 3 (sclerosis, T1 dark/T2 dark). Types 1 and 2 are associated with vertebrogenic pain.",
      credit: "Conger et al., PMC8236249, CC BY-NC 3.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8236249/",
    },
    {
      src: "/images/procedures/bvn-modic-mri.jpg",
      alt: "Modic Type 1 vs Type 2 changes on MRI",
      caption:
        "Actual patient MRI showing Modic Type 1 changes (left, inflammatory phase) vs Type 2 changes (right, fatty phase) on T1-weighted and T2-weighted sequences.",
      credit: "Conger et al., PMC8236249, CC BY-NC 3.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8236249/",
    },
    {
      src: "/images/procedures/bvn-sinuvertebral-nerve-anatomy.jpg",
      alt: "Basivertebral nerve anatomy — sagittal and axial views",
      caption:
        "Sagittal and axial views showing the sinuvertebral nerve entering the vertebral body through the basivertebral foramen. This nerve transmits pain signals from the endplate — the target for BVN ablation.",
      credit: "Conger et al., PMC8236249, CC BY-NC 3.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8236249/",
    },
    {
      src: "/images/procedures/bvn-ablation-fluoro.jpg",
      alt: "BVN ablation — fluoroscopic-guided transpedicular approach",
      caption:
        "AP and lateral fluoroscopy during BVN ablation showing the curved stylet advancing through the pedicle to the target zone at 25-40% of the midline distance from the posterior vertebral wall.",
      credit: "Conger et al., PMC8236249, CC BY-NC 3.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8236249/",
    },
    {
      src: "/images/procedures/bvn-ablation-ap-lateral.jpg",
      alt: "BVN ablation — AP and lateral views during procedure",
      caption:
        "Intraprocedural AP (A) and lateral (B) fluoroscopy during basivertebral nerve ablation at L4-L5, showing probe positioning within the vertebral body.",
      credit: "Deng et al., PMC10011817, CC BY-NC-ND 4.0",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10011817/",
    },
    {
      src: "/images/procedures/discography-needle-fluoro.jpg",
      alt: "Provocative discography — needle positioning under fluoroscopy",
      caption:
        "AP and lateral fluoroscopy showing needle tip positioned at the posterolateral annulus / nucleus pulposus junction during provocative discography.",
      credit: "Defined, PMC3097593, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3097593/",
    },
    {
      src: "/images/procedures/discography-patterns.jpg",
      alt: "Discographic patterns — normal vs degenerated discs",
      caption:
        "Discographic patterns showing normal bilocular disc morphology (L2/3) compared with degenerated disc patterns at lower levels. Pattern disruption correlates with disc pathology.",
      credit: "Defined, PMC3097593, CC BY",
      creditUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3097593/",
    },
  ],
};

/**
 * Get procedure images for a specific topic.
 */
export function getImagesForTopic(topicId: string): ProcedureImage[] {
  return PROCEDURE_IMAGES[topicId] ?? [];
}
