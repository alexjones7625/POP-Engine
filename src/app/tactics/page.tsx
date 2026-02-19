"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tactics, tacticDomains } from "@/lib/tactics-data";

export default function TacticsPage() {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let result = tactics;
    if (domainFilter !== "all") {
      result = result.filter((t) => t.domain === domainFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.keyTactics.some((kt) => kt.toLowerCase().includes(q))
      );
    }
    return result;
  }, [search, domainFilter]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Count by domain
  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of tactics) {
      counts[t.domain] = (counts[t.domain] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Tactics Browser</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Search and browse 1,280+ indexed email marketing tactics across{" "}
          {tacticDomains.length} domains
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tactics (e.g. HOOK-002, subject lines, cart abandon...)"
          className="pl-9"
        />
      </div>

      {/* Domain filters */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        <Badge
          variant={domainFilter === "all" ? "default" : "outline"}
          className="cursor-pointer text-xs"
          onClick={() => setDomainFilter("all")}
        >
          All ({tactics.length})
        </Badge>
        {tacticDomains.map((d) => (
          <Badge
            key={d}
            variant={domainFilter === d ? "default" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setDomainFilter(d)}
          >
            {d} ({domainCounts[d] || 0})
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No tactics found matching &ldquo;{search}&rdquo;
          </div>
        )}
        {filtered.map((tactic) => {
          const isExpanded = expanded.has(tactic.id);
          return (
            <Card
              key={tactic.id}
              className={cn(
                "transition-colors cursor-pointer",
                isExpanded && "border-primary/30"
              )}
              onClick={() => toggleExpand(tactic.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isExpanded ? (
                        <ChevronDown className="size-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="size-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold">{tactic.name}</h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-mono"
                        >
                          {tactic.domain}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {tactic.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {tactic.tacticCount}
                  </Badge>
                </div>

                {isExpanded && (
                  <div className="mt-4 ml-7 space-y-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Key Tactics
                    </div>
                    <ul className="space-y-1">
                      {tactic.keyTactics.map((kt, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground/80 flex items-start gap-2"
                        >
                          <span className="text-muted-foreground mt-0.5">
                            &bull;
                          </span>
                          {kt}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {tactic.file}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
