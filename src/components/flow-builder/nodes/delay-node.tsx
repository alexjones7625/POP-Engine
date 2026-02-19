"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Clock } from "lucide-react";
import type { DelayNodeData } from "@/lib/flow-templates";

export function DelayNode({ data }: NodeProps) {
  const d = data as DelayNodeData;
  return (
    <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 px-4 py-2 text-center min-w-[140px]">
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground !w-2 !h-2 !border-2 !border-background" />
      <div className="flex items-center justify-center gap-1.5">
        <Clock className="size-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">
          {d.duration}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground !w-2 !h-2 !border-2 !border-background" />
    </div>
  );
}
