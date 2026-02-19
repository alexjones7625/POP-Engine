"use client";

import { useRouter } from "next/navigation";
import { flowTemplates } from "@/lib/flow-templates";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function NewFlowPage() {
  const router = useRouter();

  const handleSelectTemplate = (templateId: string) => {
    // In production, this would create a flow in the DB and redirect to its ID
    // For now, pass template via query param
    router.push(`/flows/${templateId}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">New Flow</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Select a starting point for your automation flow
        </p>
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium mb-1.5 block">
          Flow Title (optional)
        </label>
        <Input placeholder="e.g. Welcome Flow - CPX" className="max-w-md" />
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium mb-1.5 block">Template</label>
        <p className="text-xs text-muted-foreground">
          Select a starting point for your automation flow. Powered by{" "}
          <span className="font-mono text-foreground">FLOW-ARCH</span> tactics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {flowTemplates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer transition-all hover:bg-accent/50 hover:border-primary/30"
            onClick={() => handleSelectTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{template.icon}</span>
                {template.badge && (
                  <Badge variant="secondary" className="text-[10px]">
                    {template.badge}
                  </Badge>
                )}
              </div>
              <h3 className="text-sm font-semibold mb-1">{template.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {template.description}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono">
                  {template.emailCount}
                </Badge>
                {template.tacticId && (
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {template.tacticId}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
