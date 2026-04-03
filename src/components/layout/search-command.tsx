"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchResult {
  type: "topic" | "quiz" | "case";
  title: string;
  slug: string;
  snippet: string;
}

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        if (res.ok) {
          setResults(await res.json());
        }
      } catch {
        // Silently fail
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search topics, quizzes, cases..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Results">
              {results.map((result) => (
                <CommandItem
                  key={result.slug}
                  onSelect={() => {
                    router.push(result.slug);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="mr-2 text-xs uppercase text-muted-foreground">
                    {result.type}
                  </span>
                  <span>{result.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
