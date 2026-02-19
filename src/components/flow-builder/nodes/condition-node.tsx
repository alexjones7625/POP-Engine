"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import type { ConditionNodeData } from "@/lib/flow-templates";

export function ConditionNode({ data }: NodeProps) {
  const d = data as ConditionNodeData;
  return (
    <div className="rounded-lg border-2 border-orange-500/50 bg-orange-500/10 px-4 py-3 text-center min-w-[180px]">
      <Handle type="target" position={Position.Top} className="!bg-orange-500 !w-2.5 !h-2.5 !border-2 !border-background" />
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <GitBranch className="size-3.5 text-orange-400" />
        <span className="text-xs font-medium text-orange-400 uppercase tracking-wider">
          Condition
        </span>
      </div>
      <div className="text-sm font-semibold text-foreground">{d.label}</div>
      <div className="flex justify-between mt-2 text-[10px] font-medium text-muted-foreground">
        <span>Yes</span>
        <span>No</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{ left: "30%" }}
        className="!bg-emerald-500 !w-2 !h-2 !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{ left: "70%" }}
        className="!bg-red-500 !w-2 !h-2 !border-2 !border-background"
      />
    </div>
  );
}
