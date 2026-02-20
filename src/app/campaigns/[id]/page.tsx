"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Check,
  AlertCircle,
  Save,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TipTapEditor } from "@/components/editor/tiptap-editor";
import { CampaignSidebar } from "@/components/editor/campaign-sidebar";
import {
  getCampaign,
  saveCampaign,
  getBrand,
  type Campaign,
  type Brand,
} from "@/lib/store";
import type { Editor } from "@tiptap/react";

export default function CampaignEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [subject, setSubject] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Campaign["status"]>("draft");
  const [validationScore, setValidationScore] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    const c = getCampaign(id);
    if (c) {
      setCampaign(c);
      setSubject(c.subject);
      setPreview(c.preview);
      setContent(c.body);
      setStatus(c.status);
      setValidationScore(c.validationScore);
      const b = getBrand(c.brandId);
      if (b) setBrand(b);
    }
  }, [id]);

  const handleSave = () => {
    if (!campaign) return;
    saveCampaign({
      ...campaign,
      subject,
      preview,
      body: content,
      status,
      validationScore,
    });
  };

  const handleGenerate = async () => {
    if (!campaign) return;
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: brand
            ? {
                name: brand.name,
                website: brand.website,
                description: brand.description,
                voiceTone: brand.voiceTone,
                targetAudience: brand.targetAudience,
                brandPersonality: brand.brandPersonality,
                usps: brand.usps,
                competitors: brand.competitors,
                cardinalRules: brand.cardinalRules,
                products: brand.products,
                emailExamples: brand.emailExamples,
              }
            : { name: "Unknown Brand" },
          framework: campaign.framework,
          brief: campaign.brief,
          style: campaign.style,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSubject(data.subject || "");
        setPreview(data.preview || "");
        setContent(data.body || "");
        setStatus("designed");

        if (campaign) {
          saveCampaign({
            ...campaign,
            subject: data.subject || "",
            preview: data.preview || "",
            body: data.body || "",
            status: "designed",
          });
        }

        if (!data.generated) {
          setError(
            data.message ||
              "Using placeholder — add GEMINI_API_KEY to enable AI generation"
          );
        }
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectSubject = useCallback((newSubject: string) => {
    setSubject(newSubject);
  }, []);

  const handleApplyRewrite = useCallback(
    (rewritten: string) => {
      const editor = editorRef.current;
      if (!editor) return;

      const { from, to } = editor.state.selection;
      if (from !== to) {
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .insertContentAt(from, rewritten)
          .run();
      }
    },
    []
  );

  const handleEditorReady = useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Link href="/campaigns">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-sm font-semibold">
              {campaign?.title || `Campaign: ${id.slice(0, 8)}`}
            </h2>
            <p className="text-xs text-muted-foreground">
              {campaign?.framework && <>{campaign.framework} &middot; </>}
              {campaign?.style}
              {brand && <> &middot; {brand.name}</>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {validationScore !== null && (
            <Badge
              variant={validationScore >= 8 ? "default" : "secondary"}
              className="text-xs"
            >
              {validationScore >= 8 ? (
                <Check className="size-3 mr-1" />
              ) : (
                <AlertCircle className="size-3 mr-1" />
              )}
              Score: {validationScore}/10
            </Badge>
          )}
          <Badge variant="outline" className="text-xs capitalize">
            {status}
          </Badge>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="size-3 mr-1" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <PanelRightClose className="size-4" />
            ) : (
              <PanelRightOpen className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Main area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-8">
            {/* Brief display */}
            {campaign?.brief && (
              <div className="mb-6 p-3 rounded-md bg-muted/50 text-sm">
                <span className="text-xs font-medium text-muted-foreground block mb-1">
                  Brief
                </span>
                {campaign.brief}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400">
                {error}
              </div>
            )}

            {/* TipTap Editor with subject/preview inside white card */}
            <TipTapEditor
              content={content}
              onChange={setContent}
              onSelectionChange={setSelectedText}
              onEditorReady={handleEditorReady}
              placeholder="Click 'Generate' to create AI-powered email copy, or start writing..."
              subject={subject}
              onSubjectChange={setSubject}
              preview={preview}
              onPreviewChange={setPreview}
            />

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <Button onClick={handleGenerate} disabled={isGenerating}>
                <Sparkles className="size-4 mr-1" />
                {isGenerating ? "Generating..." : "Generate Copy"}
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="size-4 mr-1" />
                Save Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <CampaignSidebar
            brand={brand}
            brief={campaign?.brief || ""}
            currentSubject={subject}
            selectedText={selectedText}
            fullContent={content}
            onSelectSubject={handleSelectSubject}
            onApplyRewrite={handleApplyRewrite}
          />
        )}
      </div>
    </div>
  );
}
