"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCampaigns, getBrand, type Campaign } from "@/lib/store";

const statusColors: Record<string, string> = {
  draft: "bg-amber-500/20 text-amber-400",
  designed: "bg-blue-500/20 text-blue-400",
  reviewed: "bg-purple-500/20 text-purple-400",
  approved: "bg-emerald-500/20 text-emerald-400",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(getCampaigns().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generate and manage email campaigns
          </p>
        </div>
        <Link href="/campaigns/new">
          <Button size="sm">
            <Plus className="size-4 mr-1" />
            New Campaign
          </Button>
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <Mail className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-sm font-semibold mb-1">No campaigns yet</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Create your first campaign to start generating copy
          </p>
          <Link href="/campaigns/new">
            <Button size="sm">
              <Plus className="size-4 mr-1" />
              New Campaign
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium px-4 py-2.5 text-muted-foreground">
                  Campaign
                </th>
                <th className="text-left font-medium px-4 py-2.5 text-muted-foreground">
                  Brand
                </th>
                <th className="text-left font-medium px-4 py-2.5 text-muted-foreground">
                  Framework
                </th>
                <th className="text-left font-medium px-4 py-2.5 text-muted-foreground">
                  Status
                </th>
                <th className="text-left font-medium px-4 py-2.5 text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const brand = getBrand(c.brandId);
                return (
                  <tr
                    key={c.id}
                    className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/campaigns/${c.id}`}
                        className="font-medium hover:underline"
                      >
                        {c.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {brand?.name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {c.framework}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`text-[10px] capitalize ${statusColors[c.status] || ""}`}
                      >
                        {c.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
