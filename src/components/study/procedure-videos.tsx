"use client";

import { useState } from "react";
import { Play, ExternalLink, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProcedureVideo } from "@/data/procedure-videos";

interface ProcedureVideosProps {
  videos: ProcedureVideo[];
  title?: string;
}

export function ProcedureVideos({
  videos,
  title = "Procedure Videos",
}: ProcedureVideosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (videos.length === 0) return null;

  const current = videos[currentIndex];

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 font-sans font-semibold">
          <div className="p-1 rounded bg-red-500/10">
            <Video className="h-3.5 w-3.5 text-red-500" />
          </div>
          {title}
          {videos.length > 1 && (
            <span className="text-xs text-muted-foreground font-normal ml-auto">
              {currentIndex + 1} / {videos.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Video embed or thumbnail */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full group cursor-pointer"
            >
              {/* YouTube thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${current.youtubeId}/hqdefault.jpg`}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Play className="h-7 w-7 text-white ml-1" fill="white" />
                </div>
              </div>
              {/* Duration badge */}
              {current.duration && (
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {current.duration}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Video info */}
        <div className="space-y-1">
          <p className="text-sm font-medium leading-snug">{current.title}</p>
          <p className="text-xs text-muted-foreground">{current.channel}</p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Navigation + YouTube link */}
        <div className="flex items-center justify-between">
          <a
            href={`https://www.youtube.com/watch?v=${current.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/60 hover:text-primary inline-flex items-center gap-1"
          >
            Watch on YouTube
            <ExternalLink className="h-2.5 w-2.5" />
          </a>

          {videos.length > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => {
                  setCurrentIndex((i) => i - 1);
                  setIsPlaying(false);
                }}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={currentIndex === videos.length - 1}
                onClick={() => {
                  setCurrentIndex((i) => i + 1);
                  setIsPlaying(false);
                }}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
