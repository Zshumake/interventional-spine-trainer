"use client";

import Image from "next/image";
import { Eye, ZoomIn, ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, ImageOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONTRAST_PATTERNS, type ContrastPattern } from "@/data/contrast-patterns";

const dangerConfig: Record<
  ContrastPattern["dangerLevel"],
  { label: string; borderClass: string; badgeClass: string; icon: typeof ShieldCheck }
> = {
  safe: {
    label: "Safe",
    borderClass: "border-emerald-500/30 hover:border-emerald-500/50",
    badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    icon: ShieldCheck,
  },
  caution: {
    label: "Caution",
    borderClass: "border-amber-500/30 hover:border-amber-500/50",
    badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    icon: ShieldAlert,
  },
  danger: {
    label: "Danger",
    borderClass: "border-red-500/30 hover:border-red-500/50",
    badgeClass: "bg-red-500/10 text-red-500 border-red-500/30",
    icon: ShieldX,
  },
};

function PatternImage({ pattern }: { pattern: ContrastPattern }) {
  const isPlaceholder = pattern.imagePath.includes("placeholder");

  if (isPlaceholder) {
    return (
      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-muted/50 flex flex-col items-center justify-center gap-2">
        <ImageOff className="h-8 w-8 text-muted-foreground/40" />
        <span className="text-xs text-muted-foreground/60">Image pending</span>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/90 cursor-zoom-in group" />
        }
      >
        <Image
          src={pattern.imagePath}
          alt={pattern.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={95}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <ZoomIn className="h-8 w-8 text-white/80" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-2">
        <DialogTitle className="sr-only">{pattern.name}</DialogTitle>
        <div className="relative w-full aspect-[16/10] bg-black rounded">
          <Image
            src={pattern.imagePath}
            alt={pattern.name}
            fill
            className="object-contain"
            sizes="90vw"
            quality={95}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 px-4">
          {pattern.name} — {pattern.description}
        </p>
      </DialogContent>
    </Dialog>
  );
}

function PatternCard({ pattern }: { pattern: ContrastPattern }) {
  const config = dangerConfig[pattern.dangerLevel];
  const DangerIcon = config.icon;

  return (
    <Card className={`card-glow transition-all ${config.borderClass}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-sans font-semibold">
            {pattern.name}
          </CardTitle>
          <Badge variant="outline" className={`text-xs ${config.badgeClass}`}>
            <DangerIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <PatternImage pattern={pattern} />

        <p className="text-sm text-muted-foreground leading-relaxed">
          {pattern.description}
        </p>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
            Visual Characteristics
          </h4>
          <ul className="space-y-1">
            {pattern.characteristics.map((c, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`rounded-lg p-3 ${
            pattern.dangerLevel === "danger"
              ? "bg-red-500/5 border border-red-500/20"
              : pattern.dangerLevel === "caution"
                ? "bg-amber-500/5 border border-amber-500/20"
                : "bg-emerald-500/5 border border-emerald-500/20"
          }`}
        >
          <div className="flex items-start gap-2">
            {pattern.dangerLevel !== "safe" && (
              <AlertTriangle
                className={`h-4 w-4 shrink-0 mt-0.5 ${
                  pattern.dangerLevel === "danger"
                    ? "text-red-500"
                    : "text-amber-500"
                }`}
              />
            )}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1">
                Clinical Action
              </h4>
              <p className="text-sm leading-relaxed">{pattern.clinicalAction}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PatternsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          Contrast Pattern Gallery
        </h1>
        <p className="text-muted-foreground mt-1">
          Visual recognition training for contrast flow patterns during spine
          injections. Learn to distinguish safe epidural spread from dangerous
          vascular, subdural, and intrathecal patterns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CONTRAST_PATTERNS.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}
