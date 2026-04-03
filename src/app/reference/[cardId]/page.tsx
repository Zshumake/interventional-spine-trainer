import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  steroidDosingCard,
  anticoagHoldTimesCard,
  needleGuideCard,
  localAnestheticVolumesCard,
  cptCodesCard,
  emCodesCard,
  modifiersCard,
} from "@/data/reference-cards";
import { ReferenceCardPrintButton } from "@/components/reference/print-button";

export function generateStaticParams() {
  return [
    { cardId: "steroid-dosing" },
    { cardId: "anticoag-hold-times" },
    { cardId: "needle-guide" },
    { cardId: "local-anesthetic-volumes" },
    { cardId: "cpt-codes" },
    { cardId: "em-codes" },
    { cardId: "modifiers" },
  ];
}

export default async function ReferenceCardPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = await params;

  // Render the appropriate card
  if (cardId === "steroid-dosing") {
    return renderDosingTable(steroidDosingCard);
  }
  if (cardId === "anticoag-hold-times") {
    return renderMatrixTable(anticoagHoldTimesCard);
  }
  if (cardId === "needle-guide") {
    return renderDosingTable(needleGuideCard);
  }
  if (cardId === "local-anesthetic-volumes") {
    return renderDosingTable(localAnestheticVolumesCard);
  }
  if (cardId === "cpt-codes") {
    return renderDosingTable(cptCodesCard);
  }
  if (cardId === "em-codes") {
    return renderDosingTable(emCodesCard);
  }
  if (cardId === "modifiers") {
    return renderDosingTable(modifiersCard);
  }

  notFound();
}

function renderDosingTable(card: {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  source: string;
  columns: { key: string; label: string; width?: string }[];
  rows: Record<string, string | number>[];
  footnotes: string[];
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between print:hidden">
        <Link href="/reference">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <ReferenceCardPrintButton />
      </div>

      <Card className="print:shadow-none print:border-gray-300">
        <CardHeader className="border-b print:border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <Badge
                variant="outline"
                className="mb-2 text-xs print:border-gray-400 print:text-gray-600"
              >
                {card.category}
              </Badge>
              <CardTitle className="text-xl font-sans font-semibold print:text-black">
                {card.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="print:border-gray-300">
                  {card.columns.map((col) => (
                    <TableHead
                      key={col.key}
                      className="text-xs font-semibold print:text-gray-700 print:bg-gray-50"
                      style={{ width: col.width }}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {card.rows.map((row, i) => (
                  <TableRow
                    key={i}
                    className="even:bg-muted/30 print:even:bg-gray-50 print:border-gray-200"
                  >
                    {card.columns.map((col) => (
                      <TableCell
                        key={col.key}
                        className="text-xs print:text-gray-800"
                      >
                        {col.key === card.columns[0].key ? (
                          <span className="font-medium">{row[col.key]}</span>
                        ) : (
                          row[col.key]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {card.footnotes.length > 0 && (
          <CardFooter className="flex-col items-start border-t pt-4 print:border-gray-200">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1 print:text-gray-500">
              Notes
            </p>
            <ul className="space-y-0.5">
              {card.footnotes.map((note, i) => (
                <li
                  key={i}
                  className="text-[10px] text-muted-foreground print:text-gray-600"
                >
                  {i + 1}. {note}
                </li>
              ))}
            </ul>
            <p className="text-[9px] text-muted-foreground/50 mt-3 print:text-gray-400">
              Source: {card.source} | Updated: {card.lastUpdated}
            </p>
          </CardFooter>
        )}
      </Card>

      {/* Print-only header */}
      <div className="hidden print:block text-center text-[9px] text-gray-400 mt-4">
        Printed from Interventional Pain Trainer | {card.title} |{" "}
        {card.lastUpdated}
      </div>
    </div>
  );
}

function renderMatrixTable(card: typeof anticoagHoldTimesCard) {
  const badgeColors: Record<string, string> = {
    default:
      "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 print:bg-green-50 print:text-green-800",
    warning:
      "bg-amber-500/15 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 print:bg-yellow-50 print:text-yellow-800",
    destructive:
      "bg-red-500/15 text-red-600 dark:bg-red-500/10 dark:text-red-400 print:bg-red-50 print:text-red-800",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between print:hidden">
        <Link href="/reference">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <ReferenceCardPrintButton />
      </div>

      <Card className="print:shadow-none print:border-gray-300">
        <CardHeader className="border-b print:border-gray-200">
          <Badge
            variant="outline"
            className="mb-2 w-fit text-xs print:border-gray-400 print:text-gray-600"
          >
            {card.category}
          </Badge>
          <CardTitle className="text-xl font-sans font-semibold print:text-black">
            {card.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto print:overflow-visible">
            <Table>
              <TableHeader>
                <TableRow className="print:border-gray-300">
                  <TableHead className="sticky left-0 bg-card print:bg-gray-50 font-semibold text-xs min-w-[180px] print:text-gray-700">
                    {card.rowHeader}
                  </TableHead>
                  {card.columnLabels.map((col) => (
                    <TableHead
                      key={col.key}
                      className="text-center text-xs font-semibold min-w-[160px] print:text-gray-700 print:bg-gray-50"
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {card.rowLabels.map((row) => (
                  <TableRow
                    key={row.key}
                    className="print:border-gray-200"
                  >
                    <TableCell className="sticky left-0 bg-card print:bg-white font-medium text-sm print:text-gray-800">
                      {row.label}
                      {row.sublabel && (
                        <span className="block text-[10px] text-muted-foreground font-normal print:text-gray-500">
                          {row.sublabel}
                        </span>
                      )}
                    </TableCell>
                    {card.columnLabels.map((col) => {
                      const rowCells = (card.cells as Record<string, Record<string, { text: string; badge?: string }>>)[row.key];
                      const cell = rowCells?.[col.key];
                      return (
                        <TableCell key={col.key} className="text-center">
                          {cell && (
                            <span
                              className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${badgeColors[cell.badge ?? "default"]}`}
                            >
                              {cell.text}
                            </span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {card.footnotes.length > 0 && (
          <CardFooter className="flex-col items-start border-t pt-4 print:border-gray-200">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1 print:text-gray-500">
              Notes
            </p>
            <ul className="space-y-0.5">
              {card.footnotes.map((note, i) => (
                <li
                  key={i}
                  className="text-[10px] text-muted-foreground print:text-gray-600"
                >
                  {i + 1}. {note}
                </li>
              ))}
            </ul>
            <p className="text-[9px] text-muted-foreground/50 mt-3 print:text-gray-400">
              Source: {card.source} | Updated: {card.lastUpdated}
            </p>
          </CardFooter>
        )}
      </Card>

      <div className="hidden print:block text-center text-[9px] text-gray-400 mt-4">
        Printed from Interventional Pain Trainer | {card.title} |{" "}
        {card.lastUpdated}
      </div>
    </div>
  );
}
