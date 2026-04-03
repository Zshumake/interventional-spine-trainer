import { NextRequest, NextResponse } from "next/server";
import {
  reviewCard,
  getDueCards,
  getCardStats,
  initializeCardsForQuiz,
  Rating,
} from "@/lib/fsrs";
import { getQuizBankByTopicId, getAllQuizBanks } from "@/lib/content";

/**
 * GET /api/quiz
 * Query params:
 *   - action: "due" | "stats" | "init"
 *   - topicId: optional topic filter
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const action = searchParams.get("action") ?? "stats";
  const topicId = searchParams.get("topicId") ?? undefined;

  try {
    switch (action) {
      case "due": {
        const dueCards = getDueCards(topicId);
        return NextResponse.json({ cards: dueCards });
      }
      case "stats": {
        const stats = getCardStats(topicId);
        return NextResponse.json(stats);
      }
      case "init": {
        // Initialize FSRS cards for all questions in a topic (or all topics)
        const banks = topicId
          ? [getQuizBankByTopicId(topicId)].filter(Boolean)
          : getAllQuizBanks();

        let initialized = 0;
        for (const bank of banks) {
          if (!bank) continue;
          const questionIds = bank.questions.map((q) => q.id);
          initializeCardsForQuiz(bank.topicId, questionIds);
          initialized += questionIds.length;
        }
        return NextResponse.json({
          initialized,
          message: `Initialized ${initialized} cards`,
        });
      }
      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/quiz
 * Body: { questionId, topicId, rating, userAnswer, correct }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, topicId, rating, userAnswer, correct } = body;

    if (!questionId || !topicId || rating === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: questionId, topicId, rating" },
        { status: 400 }
      );
    }

    // Validate rating is a valid FSRS grade (1-4)
    if (![Rating.Again, Rating.Hard, Rating.Good, Rating.Easy].includes(rating)) {
      return NextResponse.json(
        { error: "Rating must be 1 (Again), 2 (Hard), 3 (Good), or 4 (Easy)" },
        { status: 400 }
      );
    }

    const result = reviewCard(
      questionId,
      topicId,
      rating,
      userAnswer ?? "",
      correct ?? false
    );

    return NextResponse.json({
      nextDue: result.card.due,
      state: result.card.state,
      reps: result.card.reps,
      stability: result.card.stability,
    });
  } catch (error) {
    console.error("Quiz review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
