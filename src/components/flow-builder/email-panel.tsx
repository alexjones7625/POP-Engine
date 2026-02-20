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

interface StructuredCopy {
  subject: string;
  preview: string;
  body: string;
  headline?: string;
  subheadline?: string;
  first_cta?: string;
  body_copy?: string;
  bridge_section?: string;
  product_section?: string;
  closing_subhead?: string;
  closing_body?: string;
  final_cta?: string;
}

export function EmailPanel({ node, onUpdate, onClose }: EmailPanelProps) {
  const data = node.data as EmailNodeData;
  const { activeBrand } = useBrand();
  const [brief, setBrief] = useState(data.brief || "");
  const [subject, setSubject] = useState(data.copy?.subject || "");
  const [preview, setPreview] = useState(data.copy?.preview || "");
  const [sections, setSections] = useState<StructuredCopy>({
    subject: data.copy?.subject || "",
    preview: data.copy?.preview || "",
    body: data.copy?.body || "",
    headline: (data.copy as StructuredCopy)?.headline || "",
    subheadline: (data.copy as StructuredCopy)?.subheadline || "",
    first_cta: (data.copy as StructuredCopy)?.first_cta || "",
    body_copy: (data.copy as StructuredCopy)?.body_copy || "",
    bridge_section: (data.copy as StructuredCopy)?.bridge_section || "",
    product_section: (data.copy as StructuredCopy)?.product_section || "",
    closing_subhead: (data.copy as StructuredCopy)?.closing_subhead || "",
    closing_body: (data.copy as StructuredCopy)?.closing_body || "",
    final_cta: (data.copy as StructuredCopy)?.final_cta || "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const hasStructuredSections = !!(sections.headline || sections.body_copy);

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
      const newSections: StructuredCopy = {
        subject: result.subject_line || result.subject || `${data.label} - Subject Line`,
        preview: result.preview_text || result.preview || `Preview text for ${data.label}`,
        body: result.body || "",
        headline: result.headline || "",
        subheadline: result.subheadline || "",
        first_cta: result.first_cta || "",
        body_copy: result.body_copy || "",
        bridge_section: result.bridge_section || "",
        product_section: result.product_section || "",
        closing_subhead: result.closing_subhead || "",
        closing_body: result.closing_body || "",
        final_cta: result.final_cta || "",
      };
      setSubject(newSections.subject);
      setPreview(newSections.preview);
      setSections(newSections);
      onUpdate(node.id, {
        copy: newSections,
        status: "draft",
      });
    } catch {
      const fallback: StructuredCopy = {
        subject: `${data.label} - Subject Line`,
        preview: `Preview text for ${data.label}`,
        body: `Email body for "${data.label}" using framework ${data.framework}.`,
      };
      setSubject(fallback.subject);
      setPreview(fallback.preview);
      setSections(fallback);
      onUpdate(node.id, { copy: fallback, status: "draft" });
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSection = (field: keyof StructuredCopy, value: string) => {
    const updated = { ...sections, [field]: value };
    setSections(updated);
    if (field === "subject") setSubject(value);
    if (field === "preview") setPreview(value);
  };

  const handleSaveCopy = () => {
    onUpdate(node.id, {
      copy: sections,
      status: "reviewed",
    });
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
            {/* Subject Line */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Subject Line
              </label>
              <div className="flex gap-1.5">
                <Input
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    updateSection("subject", e.target.value);
                  }}
                  placeholder="Add subject line..."
                  className="text-sm"
                />
                <Button variant="outline" size="icon-sm" title="AI Generate">
                  <Sparkles className="size-3" />
                </Button>
              </div>
            </div>

            {/* Preview Text */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Preview Text
              </label>
              <div className="flex gap-1.5">
                <Input
                  value={preview}
                  onChange={(e) => {
                    setPreview(e.target.value);
                    updateSection("preview", e.target.value);
                  }}
                  placeholder="Add preview text..."
                  className="text-sm"
                />
                <Button variant="outline" size="icon-sm" title="AI Generate">
                  <Sparkles className="size-3" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Structured Sections */}
            {hasStructuredSections ? (
              <div className="space-y-3">
                {/* Section 1: Hero */}
                <SectionBlock
                  label="Hero"
                  number={1}
                  color="blue"
                >
                  <SectionField
                    label="Headline"
                    value={sections.headline || ""}
                    onChange={(v) => updateSection("headline", v)}
                    rows={1}
                  />
                  <SectionField
                    label="Subheadline"
                    value={sections.subheadline || ""}
                    onChange={(v) => updateSection("subheadline", v)}
                    rows={2}
                  />
                  <SectionField
                    label="CTA"
                    value={sections.first_cta || ""}
                    onChange={(v) => updateSection("first_cta", v)}
                    rows={1}
                    mono
                  />
                </SectionBlock>

                {/* Section 2: Body Copy */}
                <SectionBlock
                  label="Body Copy"
                  number={2}
                  color="emerald"
                >
                  <SectionField
                    value={sections.body_copy || ""}
                    onChange={(v) => updateSection("body_copy", v)}
                    rows={4}
                  />
                </SectionBlock>

                {/* Section 3: Bridge */}
                <SectionBlock
                  label="Bridge"
                  number={3}
                  color="amber"
                  hint="Visual guidance for designer"
                >
                  <SectionField
                    value={sections.bridge_section || ""}
                    onChange={(v) => updateSection("bridge_section", v)}
                    rows={4}
                  />
                </SectionBlock>

                {/* Section 4: Product */}
                <SectionBlock
                  label="Product"
                  number={4}
                  color="purple"
                >
                  <SectionField
                    value={sections.product_section || ""}
                    onChange={(v) => updateSection("product_section", v)}
                    rows={5}
                  />
                </SectionBlock>

                {/* Section 5: Closing */}
                <SectionBlock
                  label="Closing"
                  number={5}
                  color="rose"
                >
                  <SectionField
                    label="Subhead"
                    value={sections.closing_subhead || ""}
                    onChange={(v) => updateSection("closing_subhead", v)}
                    rows={1}
                  />
                  <SectionField
                    label="Body"
                    value={sections.closing_body || ""}
                    onChange={(v) => updateSection("closing_body", v)}
                    rows={2}
                  />
                  <SectionField
                    label="CTA"
                    value={sections.final_cta || ""}
                    onChange={(v) => updateSection("final_cta", v)}
                    rows={1}
                    mono
                  />
                </SectionBlock>
              </div>
            ) : (
              /* Fallback: raw body for old-format copy */
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Email Body
                </label>
                <Textarea
                  value={sections.body}
                  onChange={(e) => updateSection("body", e.target.value)}
                  placeholder="Email content will appear here after generation..."
                  rows={14}
                  className="text-sm resize-none"
                />
              </div>
            )}

            {(hasStructuredSections || sections.body) && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleSaveCopy}
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

// ── Section display components ──────────────────────────────────────

const colorMap: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/5",
  emerald: "border-emerald-500/30 bg-emerald-500/5",
  amber: "border-amber-500/30 bg-amber-500/5",
  purple: "border-purple-500/30 bg-purple-500/5",
  rose: "border-rose-500/30 bg-rose-500/5",
};

const badgeColorMap: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-400",
  emerald: "bg-emerald-500/20 text-emerald-400",
  amber: "bg-amber-500/20 text-amber-400",
  purple: "bg-purple-500/20 text-purple-400",
  rose: "bg-rose-500/20 text-rose-400",
};

function SectionBlock({
  label,
  number,
  color,
  hint,
  children,
}: {
  label: string;
  number: number;
  color: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-md border p-3 space-y-2 ${colorMap[color] || ""}`}>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeColorMap[color] || ""}`}>
          {number}
        </span>
        <span className="text-xs font-semibold">{label}</span>
        {hint && (
          <span className="text-[10px] text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function SectionField({
  label,
  value,
  onChange,
  rows = 2,
  mono,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <div>
      {label && (
        <label className="text-[10px] font-medium text-muted-foreground mb-1 block">
          {label}
        </label>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`text-xs resize-none ${mono ? "font-mono" : ""}`}
      />
    </div>
  );
}
