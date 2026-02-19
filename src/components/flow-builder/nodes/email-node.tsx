"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmailNodeData } from "@/lib/flow-templates";

const statusColors: Record<string, string> = {
  empty: "border-muted-foreground/30 bg-muted/30",
  brief: "border-blue-500/50 bg-blue-500/10",
  draft: "border-amber-500/50 bg-amber-500/10",
  reviewed: "border-purple-500/50 bg-purple-500/10",
  approved: "border-emerald-500/50 bg-emerald-500/10",
};

const statusLabels: Record<string, string> = {
  empty: "No Brief",
  brief: "Brief Written",
  draft: "Draft",
  reviewed: "Reviewed",
  approved: "Approved",
};

export function EmailNode({ data, selected }: NodeProps) {
  const d = data as EmailNodeData;
  return (
    <div
      className={cn(
        "rounded-lg border-2 px-4 py-3 min-w-[200px] cursor-pointer transition-shadow",
        statusColors[d.status] || statusColors.empty,
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-500 !w-2.5 !h-2.5 !border-2 !border-background" />
      <div className="flex items-center gap-2 mb-1">
        <Mail className="size-3.5 text-blue-400" />
        <span className="text-xs font-medium text-muted-foreground">
          Email {d.emailNumber}
        </span>
        <span
          className={cn(
            "ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full",
            d.status === "empty" && "bg-muted text-muted-foreground",
            d.status === "brief" && "bg-blue-500/20 text-blue-400",
            d.status === "draft" && "bg-amber-500/20 text-amber-400",
            d.status === "reviewed" && "bg-purple-500/20 text-purple-400",
            d.status === "approved" && "bg-emerald-500/20 text-emerald-400"
          )}
        >
          {statusLabels[d.status]}
        </span>
      </div>
      <div className="text-sm font-semibold text-foreground">{d.label}</div>
      {d.timing && (
        <div className="text-xs text-muted-foreground mt-1">{d.timing}</div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500 !w-2.5 !h-2.5 !border-2 !border-background" />
    </div>
  );
}
