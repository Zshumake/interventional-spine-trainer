export interface MatrixCell {
  text: string;
  badge?: "default" | "warning" | "destructive";
}

export const anticoagHoldTimesCard = {
  id: "anticoag-hold-times",
  title: "Anticoagulation Hold Times by Procedure Risk",
  category: "medications" as const,
  lastUpdated: "2026-04-03",
  source: "ASRA 2024, SIS/ASIPP Guidelines, IPSIS Task Force",
  rowHeader: "Medication",
  columnHeader: "Procedure Bleed Risk Tier",
  columnLabels: [
    { key: "peripheral", label: "Peripheral (MBB, trigger point, peripheral joint)" },
    { key: "intermediate", label: "Intermediate (TFESI, facet, SIJ)" },
    { key: "neuraxial", label: "Neuraxial (interlaminar, SCS lead)" },
  ],
  rowLabels: [
    { key: "aspirin", label: "Aspirin", sublabel: "81-325 mg daily" },
    { key: "clopidogrel", label: "Clopidogrel (Plavix)", sublabel: "75 mg daily" },
    { key: "warfarin", label: "Warfarin (Coumadin)", sublabel: "INR target 2-3" },
    { key: "apixaban", label: "Apixaban (Eliquis)", sublabel: "5 mg BID" },
    { key: "rivaroxaban", label: "Rivaroxaban (Xarelto)", sublabel: "20 mg daily" },
    { key: "dabigatran", label: "Dabigatran (Pradaxa)", sublabel: "150 mg BID" },
    { key: "enoxaparin_prophy", label: "Enoxaparin (prophylactic)", sublabel: "40 mg daily" },
    { key: "enoxaparin_ther", label: "Enoxaparin (therapeutic)", sublabel: "1 mg/kg BID" },
    { key: "heparin_iv", label: "Heparin IV", sublabel: "Continuous infusion" },
  ],
  cells: {
    aspirin: {
      peripheral: { text: "Continue", badge: "default" as const },
      intermediate: { text: "Continue", badge: "default" as const },
      neuraxial: { text: "Continue", badge: "default" as const },
    },
    clopidogrel: {
      peripheral: { text: "Continue or hold 1-2d", badge: "default" as const },
      intermediate: { text: "Hold 5-7 days", badge: "warning" as const },
      neuraxial: { text: "Hold 7 days", badge: "destructive" as const },
    },
    warfarin: {
      peripheral: { text: "Continue (check INR)", badge: "default" as const },
      intermediate: { text: "Hold 5d, INR ≤1.5", badge: "warning" as const },
      neuraxial: { text: "Hold 5d, INR ≤1.5", badge: "destructive" as const },
    },
    apixaban: {
      peripheral: { text: "Continue", badge: "default" as const },
      intermediate: { text: "Hold 24-48h", badge: "warning" as const },
      neuraxial: { text: "Hold 3 days (72h)", badge: "destructive" as const },
    },
    rivaroxaban: {
      peripheral: { text: "Continue", badge: "default" as const },
      intermediate: { text: "Hold 24-48h", badge: "warning" as const },
      neuraxial: { text: "Hold 3 days (72h)", badge: "destructive" as const },
    },
    dabigatran: {
      peripheral: { text: "Continue", badge: "default" as const },
      intermediate: { text: "Hold 48-72h", badge: "warning" as const },
      neuraxial: { text: "Hold 3-5 days", badge: "destructive" as const },
    },
    enoxaparin_prophy: {
      peripheral: { text: "Continue", badge: "default" as const },
      intermediate: { text: "Hold 12h", badge: "warning" as const },
      neuraxial: { text: "Hold 12h", badge: "destructive" as const },
    },
    enoxaparin_ther: {
      peripheral: { text: "Continue or hold 12h", badge: "default" as const },
      intermediate: { text: "Hold 24h", badge: "warning" as const },
      neuraxial: { text: "Hold 24h", badge: "destructive" as const },
    },
    heparin_iv: {
      peripheral: { text: "Continue", badge: "default" as const },
      intermediate: { text: "Hold 4-6h, check aPTT", badge: "warning" as const },
      neuraxial: { text: "Hold 4-6h, norm aPTT", badge: "destructive" as const },
    },
  },
  footnotes: [
    "Green = generally safe to continue. Yellow = case-by-case, coordinate with prescriber. Red = must hold.",
    "Dabigatran: extend hold to 5 days if CrCl < 50 mL/min",
    "DOACs: no reliable coagulation test confirms clearance. Anti-Xa levels may help for factor Xa inhibitors.",
    "Never hold P2Y12 inhibitors within 6 months of bare-metal stent or 12 months of drug-eluting stent without cardiology approval",
    "Bridging is NOT recommended for DOACs. For warfarin patients with mechanical valves, discuss bridging with prescriber.",
    "Resume anticoagulation 24h post-procedure if no complications. Resume LMWH 24h after neuraxial.",
    "The thromboembolic risk of holding medication often exceeds bleeding risk for peripheral procedures (IPSIS Task Force).",
  ],
};
