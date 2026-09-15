
"use client";

import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Code, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full shrink-0 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1 size-8 rounded-md hover:bg-sidebar-accent md:hidden" />

        <Link href="/" className="flex items-center text-sidebar-foreground outline-none">
          <Logo variant="ink" wordClassName="hidden text-[15px] sm:inline-block" />
        </Link>

        <div className="h-4 w-px bg-sidebar-border hidden md:block" />

        <div className="hidden items-center gap-1 text-[11px] font-black uppercase tracking-widest text-sidebar-foreground/70 md:flex">
          <BookOpen className="size-3 mr-1" />
          Documentation
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden w-40 sm:block md:w-64">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-sidebar-foreground/60" />
          <input
            type="search"
            placeholder="Search documentation..."
            className="h-8 w-full rounded-lg border border-sidebar-border bg-sidebar-accent/40 pl-9 pr-3 text-xs text-sidebar-foreground placeholder:text-sidebar-foreground/60 outline-none focus:border-sidebar-foreground/50 transition-colors"
          />
        </div>

        <Button variant="ghost" size="icon" className="size-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" asChild>
          <Link href="https://github.com" target="_blank">
            <Code className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
