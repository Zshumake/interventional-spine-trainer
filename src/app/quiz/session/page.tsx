import { getAllQuizBanks } from "@/lib/content";
import { QuizSessionLoader } from "./quiz-session-loader";

// Server component: bundles all quiz banks at build time and hands them to a
// client component that reads searchParams and renders the session. This
// pattern works under both `next dev` and static export (`output: "export"`).
export default function QuizSessionPage() {
  const allBanks = getAllQuizBanks();
  return <QuizSessionLoader allBanks={allBanks} />;
}
