"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  HelpCircle,
  Stethoscope,
  BarChart3,
  Home,
  Settings,
  GitBranch,
  Activity,
  ClipboardList,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const TOPICS = [
  { slug: "transforaminal-epidurals", title: "Transforaminal Epidurals" },
  { slug: "interlaminar-caudal-epidurals", title: "Interlaminar & Caudal" },
  { slug: "cervical-epidurals", title: "Cervical Epidurals" },
  { slug: "diagnostic-nerve-blocks", title: "Diagnostic Nerve Blocks" },
  { slug: "facet-pain-medial-branch-blocks", title: "Facet Pain & MBBs" },
  { slug: "radiofrequency-ablation", title: "Radiofrequency Ablation" },
  { slug: "facet-cyst-rupture", title: "Facet Cyst Rupture" },
  { slug: "si-joint", title: "SI Joint" },
  { slug: "c1-c2-injections", title: "C1-2 Injections" },
  { slug: "discogenic-pain-bvn-ablation", title: "Discogenic Pain & BVN" },
  { slug: "anticoagulation-management", title: "Anticoagulation Mgmt" },
  { slug: "ethics-billing-medicolegal", title: "Ethics & Billing" },
  { slug: "sympathetic-blocks", title: "Sympathetic Blocks" },
  { slug: "neuromodulation-scs", title: "Neuromodulation & SCS" },
  { slug: "neurolytic-procedures", title: "Neurolytic Procedures" },
];

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/study", label: "Study", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/pathways", label: "Pathways", icon: GitBranch },
  { href: "/cases", label: "Cases", icon: Stethoscope },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/reference", label: "Reference", icon: ClipboardList },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              Spine Trainer
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide uppercase">
              Fellowship Prep
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-widest uppercase text-muted-foreground/60">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-widest uppercase text-muted-foreground/60">
            Study Topics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOPICS.map((topic, idx) => (
                <SidebarMenuItem key={topic.slug}>
                  <SidebarMenuButton
                    render={<Link href={`/study/${topic.slug}`} />}
                    isActive={pathname === `/study/${topic.slug}`}
                  >
                    <span className="text-[10px] font-mono text-muted-foreground/50 w-5 text-right tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs">{topic.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/settings" />}>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
