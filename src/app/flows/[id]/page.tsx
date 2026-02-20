"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlowCanvas } from "@/components/flow-builder/flow-canvas";
import { flowTemplates } from "@/lib/flow-templates";
import { getFlow, type FlowState } from "@/lib/store";
import { useBrand } from "@/lib/brand-context";
import type { Node, Edge } from "@xyflow/react";

export default function FlowEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { activeBrand } = useBrand();
  const [flowState, setFlowState] = useState<FlowState | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = getFlow(id);
    if (saved) {
      setFlowState(saved);
    }
    setLoaded(true);
  }, [id]);

  const template = flowTemplates.find((t) => t.id === id);
  const hasTemplate = !!template;
  const hasSavedState = !!flowState;

  if (loaded && !hasTemplate && !hasSavedState) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Flow not found</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Template &quot;{id}&quot; doesn&apos;t exist
          </p>
          <Link href="/flows">
            <Button variant="outline" size="sm">
              Back to Flows
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Loading flow...</p>
      </div>
    );
  }

  // Merge template briefs into saved state — if a saved email node has an
  // empty brief but the template has one, use the template brief.
  const mergeTemplateBriefs = (savedNodes: Node[], tmpl: Node[]): Node[] => {
    const templateBriefs = new Map<string, string>();
    for (const tn of tmpl) {
      if (tn.type === "email" && (tn.data as Record<string, unknown>).brief) {
        templateBriefs.set(tn.id, (tn.data as Record<string, unknown>).brief as string);
      }
    }
    return savedNodes.map((n) => {
      if (n.type === "email" && !((n.data as Record<string, unknown>).brief as string)?.trim()) {
        const tmplBrief = templateBriefs.get(n.id);
        if (tmplBrief) {
          return {
            ...n,
            data: {
              ...n.data,
              brief: tmplBrief,
              status: (n.data as Record<string, unknown>).status === "empty"
                ? "brief"
                : (n.data as Record<string, unknown>).status,
            },
          };
        }
      }
      return n;
    });
  };

  const initialNodes: Node[] = hasSavedState
    ? mergeTemplateBriefs(JSON.parse(flowState!.nodes), template?.nodes || [])
    : template!.nodes;
  const initialEdges: Edge[] = hasSavedState
    ? JSON.parse(flowState!.edges)
    : template!.edges;
  const flowName = hasSavedState ? flowState!.name : template!.name;
  const templateId = hasSavedState ? flowState!.templateId : template!.id;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Link href="/flows">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-sm font-semibold">{flowName}</h2>
            <p className="text-xs text-muted-foreground">
              {template?.emailCount || "Custom"} &middot;{" "}
              {template?.tacticId || templateId}
              {activeBrand && (
                <> &middot; {activeBrand.name}</>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasSavedState && (
            <Badge variant="secondary" className="text-[10px]">
              <Save className="size-2.5 mr-1" />
              Auto-saved
            </Badge>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <FlowCanvas
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          flowName={flowName}
          flowId={id}
          templateId={templateId}
          brandId={activeBrand?.id}
        />
      </div>
    </div>
  );
}
