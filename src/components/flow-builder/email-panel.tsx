"use client";

import React, { useState } from "react";
import type { Node } from "@xyflow/react";
import { X, Sparkles, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrand } from "@/lib/brand-context";
import type { EmailNodeData } from "@/lib/flow-templates";

interface EmailPanelProps {
  node: Node;
  onUpdate: (nodeId: string, data: Record<string, unknown>) => void;
  onClose: () => void;
}

export function EmailPanel({ node, onUpdate, onClose }: EmailPanelProps) {
  const data = node.data as EmailNodeData;
  const { activeBrand } = useBrand();
  const [brief, setBrief] = useState(data.brief || "");
  const [subject, setSubject] = useState(data.copy?.subject || "");
  const [preview, setPreview] = useState(data.copy?.preview || "");
  const [body, setBody] = useState(data.copy?.body || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSaveBrief = () => {
    onUpdate(node.id, {
      brief,
      status: brief.trim() ? "brief" : "empty",
    });
  };

  const buildBrandPayload = () => {
    if (!activeBrand) return { name: "Brand" };
    return {
      name: activeBrand.name,
      description: activeBrand.description,
      voiceTone: activeBrand.voiceTone,
      targetAudience: activeBrand.targetAudience,
      brandPersonality: activeBrand.brandPersonality,
      usps: activeBrand.usps,
      competitors: activeBrand.competitors,
      cardinalRules: activeBrand.cardinalRules,
      products: activeBrand.products,
      emailExamples: activeBrand.emailExamples,
    };
  };

  const handleGenerateCopy = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: buildBrandPayload(),
          framework: data.framework,
          brief: `Flow email: ${data.label}\nTiming: ${data.timing}\nBrief: ${brief}`,
          style: "designed",
        }),
      });
      const result = await res.json();
      const generatedCopy = {
        subject: result.subject || `${data.label} - Subject Line`,
        preview: result.preview || `Preview text for ${data.label}`,
        body: result.body || `Generated email body for "${data.label}"`,
      };
      setSubject(generatedCopy.subject);
      setPreview(generatedCopy.preview);
      setBody(generatedCopy.body);
      onUpdate(node.id, {
        copy: generatedCopy,
        status: "draft",
      });
    } catch {
      const generatedCopy = {
        subject: `${data.label} - Subject Line`,
        preview: `Preview text for ${data.label}`,
        body: `Email body for "${data.label}" using framework ${data.framework}.`,
      };
      setSubject(generatedCopy.subject);
      setPreview(generatedCopy.preview);
      setBody(generatedCopy.body);
      onUpdate(node.id, { copy: generatedCopy, status: "draft" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-[380px] border-l border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Email {data.emailNumber}</h3>
            <Badge
              variant={data.status === "approved" ? "default" : "secondary"}
              className="text-[10px]"
            >
              {data.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{data.label}</p>
          {activeBrand && (
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">
              Brand: {activeBrand.name}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon-xs" onClick={onClose}>
          <X className="size-3.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="brief" className="p-4">
          <TabsList className="w-full">
            <TabsTrigger value="brief" className="flex-1">
              <FileText className="size-3 mr-1" />
              Brief
            </TabsTrigger>
            <TabsTrigger value="copy" className="flex-1">
              <Sparkles className="size-3 mr-1" />
              Copy
            </TabsTrigger>
          </TabsList>

          {/* Brief Tab */}
          <TabsContent value="brief" className="space-y-4 mt-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Framework
                </label>
                <Badge variant="outline" className="text-[10px] font-mono">
                  {data.framework}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2.5">
                Timing: {data.timing}
              </div>
            </div>

            <Separator />

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Email Brief
              </label>
              <Textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe what this email should accomplish, the key message, tone, and any specific elements to include..."
                rows={8}
                className="text-sm resize-none"
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSaveBrief}
                className="flex-1"
              >
                <Check className="size-3 mr-1" />
                Save Brief
              </Button>
              <Button
                size="sm"
                onClick={handleGenerateCopy}
                disabled={!brief.trim() || isGenerating}
                className="flex-1"
              >
                <Sparkles className="size-3 mr-1" />
                {isGenerating ? "Generating..." : "Generate Copy"}
              </Button>
            </div>
          </TabsContent>

          {/* Copy Tab */}
          <TabsContent value="copy" className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Subject Line
              </label>
              <div className="flex gap-1.5">
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Add subject line..."
                  className="text-sm"
                />
                <Button variant="outline" size="icon-sm" title="AI Generate">
                  <Sparkles className="size-3" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Preview Text
              </label>
              <div className="flex gap-1.5">
                <Input
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                  placeholder="Add preview text..."
                  className="text-sm"
                />
                <Button variant="outline" size="icon-sm" title="AI Generate">
                  <Sparkles className="size-3" />
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Email Body
              </label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Email content will appear here after generation..."
                rows={14}
                className="text-sm resize-none font-mono"
              />
            </div>

            {body && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  onUpdate(node.id, {
                    copy: { subject, preview, body },
                    status: "reviewed",
                  })
                }
                className="w-full"
              >
                <Check className="size-3 mr-1" />
                Mark as Reviewed
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
