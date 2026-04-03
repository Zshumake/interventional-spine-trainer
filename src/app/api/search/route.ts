import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/content";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }
  const results = searchContent(q);
  return NextResponse.json(results);
}
