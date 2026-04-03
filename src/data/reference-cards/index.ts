export { steroidDosingCard } from "./steroid-dosing";
export { anticoagHoldTimesCard } from "./anticoag-hold-times";
export { needleGuideCard, localAnestheticVolumesCard } from "./needle-guide";
export { cptCodesCard } from "./cpt-codes";
export { emCodesCard, modifiersCard } from "./em-codes-modifiers";

export const ALL_REFERENCE_CARDS = [
  { id: "steroid-dosing", title: "Steroid Dosing", category: "medications" as const },
  { id: "anticoag-hold-times", title: "Anticoagulation Hold Times", category: "medications" as const },
  { id: "needle-guide", title: "Needle & Equipment Selection", category: "equipment" as const },
  { id: "local-anesthetic-volumes", title: "Local Anesthetic Volumes", category: "medications" as const },
  { id: "cpt-codes", title: "CPT Codes by Procedure", category: "billing" as const },
  { id: "em-codes", title: "E/M Codes for Pain Management", category: "billing" as const },
  { id: "modifiers", title: "Key Billing Modifiers", category: "billing" as const },
];
