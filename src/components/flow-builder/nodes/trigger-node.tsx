"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { TriggerNodeData } from "@/lib/flow-templates";

export function TriggerNode({ data }: NodeProps) {
  const d = data as TriggerNodeData;
  return (
    <div className="rounded-lg border-2 border-emerald-500/50 bg-emerald-500/10 px-4 py-3 text-center min-w-[180px]">
      <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">
        Trigger
      </div>
      <div className="text-sm font-semibold text-foreground">{d.label}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-500 !w-2.5 !h-2.5 !border-2 !border-background" />
    </div>
  );
}
