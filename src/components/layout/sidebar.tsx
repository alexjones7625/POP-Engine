"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitBranch,
  Mail,
  BarChart3,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Plus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBrand } from "@/lib/brand-context";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Flows", href: "/flows", icon: GitBranch },
  { label: "Campaigns", href: "/campaigns", icon: Mail },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Tactics", href: "/tactics", icon: BookOpen },
  { label: "Brands", href: "/brands", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const { brands, activeBrand, setActiveBrand } = useBrand();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
          P
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight">
            POP Platform
          </span>
        )}
      </div>

      <Separator />

      {/* Brand Switcher */}
      {!collapsed ? (
        <div className="px-2 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-xs h-9"
              >
                <span className="flex items-center gap-2 truncate">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded bg-primary/20 text-primary text-[10px] font-bold">
                    {activeBrand?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <span className="truncate">
                    {activeBrand?.name || "Select Brand"}
                  </span>
                </span>
                <ChevronsUpDown className="size-3 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              {brands.map((b) => (
                <DropdownMenuItem
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className="text-xs"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-primary/20 text-primary text-[10px] font-bold">
                      {b.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{b.name}</span>
                    {activeBrand?.id === b.id && (
                      <Check className="size-3 ml-auto shrink-0" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
              {brands.length > 0 && <DropdownMenuSeparator />}
              <DropdownMenuItem asChild>
                <Link href="/brands/new" className="text-xs">
                  <Plus className="size-3 mr-2" />
                  Add Brand
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="px-2 py-2">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link href="/brands">
                <Button variant="outline" size="icon-sm" className="w-full">
                  <div className="flex size-5 items-center justify-center rounded bg-primary/20 text-primary text-[10px] font-bold">
                    {activeBrand?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {activeBrand?.name || "No brand selected"}
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const linkContent = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
        })}
      </nav>

      <Separator />

      {/* Collapse toggle */}
      <div className="p-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full"
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
