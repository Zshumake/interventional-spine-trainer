"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, ExternalLink, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface ProcedureImage {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  creditUrl?: string;
}

interface ProcedureImagesProps {
  images: ProcedureImage[];
  title?: string;
}

export function ProcedureImages({
  images,
  title = "Fluoroscopic Views",
}: ProcedureImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 font-sans font-semibold">
          <div className="p-1 rounded bg-primary/10">
            <ImageIcon className="h-3.5 w-3.5 text-primary" />
          </div>
          {title}
          {images.length > 1 && (
            <span className="text-xs text-muted-foreground font-normal ml-auto">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Main image with zoom dialog */}
        <Dialog>
          <DialogTrigger
            render={
              <button className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/90 cursor-zoom-in group" />
            }
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 60vw"
              quality={95}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <ZoomIn className="h-8 w-8 text-white/80" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-2">
            <DialogTitle className="sr-only">{current.alt}</DialogTitle>
            <div className="relative w-full aspect-[16/10] bg-black rounded">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="90vw"
                quality={95}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2 px-4">
              {current.caption}
            </p>
          </DialogContent>
        </Dialog>

        {/* Caption */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {current.caption}
        </p>

        {/* Credit */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground/60">
            {current.creditUrl ? (
              <a
                href={current.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary inline-flex items-center gap-1"
              >
                {current.credit}
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            ) : (
              current.credit
            )}
          </p>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasPrev}
                onClick={() => setCurrentIndex((i) => i - 1)}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasNext}
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Thumbnail strip for multiple images */}
        {images.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "relative w-16 h-10 rounded overflow-hidden shrink-0 border-2 transition-colors",
                  i === currentIndex
                    ? "border-primary"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
