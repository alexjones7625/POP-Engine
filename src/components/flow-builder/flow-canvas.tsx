"use client";

import React, { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type OnSelectionChangeParams,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TriggerNode } from "./nodes/trigger-node";
import { EmailNode } from "./nodes/email-node";
import { DelayNode } from "./nodes/delay-node";
import { ConditionNode } from "./nodes/condition-node";
import { EmailPanel } from "./email-panel";
import { saveFlow } from "@/lib/store";

const nodeTypes = {
  trigger: TriggerNode,
  email: EmailNode,
  delay: DelayNode,
  condition: ConditionNode,
};

interface FlowCanvasProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  flowName: string;
  flowId: string;
  templateId: string;
  brandId?: string;
}

export function FlowCanvas({
  initialNodes,
  initialEdges,
  flowName,
  flowId,
  templateId,
  brandId,
}: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Auto-save flow state on changes
  useEffect(() => {
    const timer = setTimeout(() => {
      saveFlow({
        id: flowId,
        templateId,
        name: flowName,
        brandId: brandId || "",
        nodes: JSON.stringify(nodes),
        edges: JSON.stringify(edges),
        updatedAt: new Date().toISOString(),
      });
    }, 1000); // Debounce 1s
    return () => clearTimeout(timer);
  }, [nodes, edges, flowId, templateId, flowName, brandId]);

  const onSelectionChange = useCallback(
    ({ nodes: selected }: OnSelectionChangeParams) => {
      const emailNode = selected.find((n) => n.type === "email");
      setSelectedNode(emailNode || null);
    },
    []
  );

  const handleUpdateNodeData = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n
        )
      );
      setSelectedNode((prev) =>
        prev && prev.id === nodeId
          ? { ...prev, data: { ...prev.data, ...data } }
          : prev
      );
    },
    [setNodes]
  );

  return (
    <div className="flex h-full">
      {/* Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "hsl(var(--muted-foreground))", strokeWidth: 1.5 },
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="hsl(var(--muted-foreground) / 0.15)"
          />
          <Controls
            className="!bg-card !border-border !rounded-md !shadow-md [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-accent"
          />
          <MiniMap
            className="!bg-card !border-border !rounded-md"
            maskColor="hsl(var(--background) / 0.7)"
            nodeColor="hsl(var(--muted-foreground) / 0.3)"
          />
        </ReactFlow>
        {/* Flow name overlay */}
        <div className="absolute top-4 left-4 text-sm font-semibold text-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
          {flowName}
        </div>
      </div>

      {/* Email Panel (right side) */}
      {selectedNode && selectedNode.type === "email" && (
        <EmailPanel
          node={selectedNode}
          onUpdate={handleUpdateNodeData}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
