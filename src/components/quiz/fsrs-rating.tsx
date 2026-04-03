"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FsrsRatingProps {
  onRate: (rating: number) => void;
}

const RATINGS = [
  {
    value: 1,
    label: "Again",
    sublabel: "Didn't know it",
    color: "hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950/30",
    key: "1",
  },
  {
    value: 2,
    label: "Hard",
    sublabel: "Struggled",
    color: "hover:bg-orange-50 hover:border-orange-300 dark:hover:bg-orange-950/30",
    key: "2",
  },
  {
    value: 3,
    label: "Good",
    sublabel: "Got it right",
    color: "hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-950/30",
    key: "3",
  },
  {
    value: 4,
    label: "Easy",
    sublabel: "No hesitation",
    color: "hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/30",
    key: "4",
  },
];

export function FsrsRating({ onRate }: FsrsRatingProps) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-sm text-muted-foreground text-center mb-3">
          How well did you know this? (Press 1-4)
        </p>
        <div className="grid grid-cols-4 gap-2">
          {RATINGS.map((rating) => (
            <button
              key={rating.value}
              onClick={() => onRate(rating.value)}
              className={cn(
                "flex flex-col items-center gap-0.5 p-3 rounded-lg border transition-colors cursor-pointer",
                rating.color
              )}
            >
              <span className="text-sm font-medium">{rating.label}</span>
              <span className="text-xs text-muted-foreground">
                {rating.sublabel}
              </span>
              <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded mt-1">
                {rating.key}
              </kbd>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
