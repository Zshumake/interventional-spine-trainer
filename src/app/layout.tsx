import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SearchCommand } from "@/components/layout/search-command";
import { Separator } from "@/components/ui/separator";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Interventional Spine Trainer",
  description:
    "Fellowship preparation tool for interventional spine procedures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-12 items-center gap-3 border-b border-border/50 px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-5 opacity-30" />
                <SearchCommand />
              </header>
              <main className="flex-1 p-6 sm:p-8">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
