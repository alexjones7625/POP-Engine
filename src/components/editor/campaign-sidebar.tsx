"use client";

import { useState } from "react";
import {
  Type,
  Wand2,
  Sparkles,
  Copy,
  ChevronDown,
  ChevronRight,
  Loader2,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  subjectLineStyles,
  type SubjectLineStyle,
} from "@/lib/subject-line-styles";
import type { Brand } from "@/lib/store";

type SidebarTool = "subject" | "rewrite";

interface CampaignSidebarProps {
  brand: Brand | null;
  brief: string;
  currentSubject: string;
  selectedText: string;
  fullContent: string;
  onSelectSubject: (subject: string) => void;
  onApplyRewrite: (rewritten: string) => void;
}

export function CampaignSidebar({
  brand,
  brief,
  currentSubject,
  selectedText,
  fullContent,
  onSelectSubject,
  onApplyRewrite,
}: CampaignSidebarProps) {
  const [activeTool, setActiveTool] = useState<SidebarTool>("subject");

  return (
    <div className="w-[320px] border-l border-border bg-card flex flex-col h-full">
      {/* Tool switcher */}
      <div className="flex border-b border-border">
        <button
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors",
            activeTool === "subject"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTool("subject")}
        >
          <Type className="size-3" />
          Subject Lines
        </button>
        <button
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors",
            activeTool === "rewrite"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTool("rewrite")}
        >
          <Wand2 className="size-3" />
          AI Rewrite
        </button>
      </div>

      <ScrollArea className="flex-1">
        {activeTool === "subject" ? (
          <SubjectLineTool
            brand={brand}
            brief={brief}
            currentSubject={currentSubject}
            onSelect={onSelectSubject}
          />
        ) : (
          <RewriteTool
            brand={brand}
            selectedText={selectedText}
            fullContent={fullContent}
            onApply={onApplyRewrite}
          />
        )}
      </ScrollArea>
    </div>
  );
}

// ── Subject Line Tool ────────────────────────────────────────────────

function SubjectLineTool({
  brand,
  brief,
  currentSubject,
  onSelect,
}: {
  brand: Brand | null;
  brief: string;
  currentSubject: string;
  onSelect: (subject: string) => void;
}) {
  const [selectedStyle, setSelectedStyle] = useState<SubjectLineStyle | null>(
    null
  );
  const [results, setResults] = useState<{ text: string; style: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedStyles, setExpandedStyles] = useState(true);

  const handleGenerate = async (style: SubjectLineStyle) => {
    setSelectedStyle(style);
    setIsGenerating(true);
    setResults([]);

    try {
      const res = await fetch("/api/subject-lines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: brand
            ? {
                name: brand.name,
                voiceTone: brand.voiceTone,
                targetAudience: brand.targetAudience,
              }
            : null,
          brief,
          style: style.name,
          currentSubject,
        }),
      });
      const data = await res.json();
      if (data.lines) {
        setResults(data.lines);
      }
    } catch {
      setResults([{ text: "Generation failed — check API key", style: "error" }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <p className="text-xs text-muted-foreground mb-3">
          Generate subject lines in 15 proven styles. Click a style, then pick
          your favorite.
        </p>
      </div>

      {/* Style selector */}
      <div>
        <button
          className="flex items-center gap-1 text-xs font-medium mb-2 w-full"
          onClick={() => setExpandedStyles(!expandedStyles)}
        >
          {expandedStyles ? (
            <ChevronDown className="size-3" />
          ) : (
            <ChevronRight className="size-3" />
          )}
          15 Styles
        </button>
        {expandedStyles && (
          <div className="grid grid-cols-2 gap-1">
            {subjectLineStyles.map((style) => (
              <button
                key={style.id}
                className={cn(
                  "text-left px-2 py-1.5 rounded-md text-xs transition-colors",
                  selectedStyle?.id === style.id
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "hover:bg-accent/50 border border-transparent"
                )}
                onClick={() => handleGenerate(style)}
                title={style.description}
              >
                <span className="font-medium block">{style.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected style info */}
      {selectedStyle && (
        <>
          <Separator />
          <div className="p-2.5 rounded-md bg-muted/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">{selectedStyle.name}</span>
              <Badge variant="outline" className="text-[10px] font-mono">
                {selectedStyle.tacticId}
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {selectedStyle.description}
            </p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5 italic">
              e.g. &quot;{selectedStyle.example}&quot;
            </p>
          </div>
        </>
      )}

      {/* Results */}
      {isGenerating && (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
          <span className="text-xs text-muted-foreground ml-2">
            Generating...
          </span>
        </div>
      )}

      {results.length > 0 && !isGenerating && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            Click to use:
          </p>
          {results.map((line, i) => (
            <button
              key={i}
              className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent/50 border border-transparent hover:border-primary/20 transition-colors group flex items-center justify-between"
              onClick={() => onSelect(line.text)}
            >
              <span>{line.text}</span>
              <Copy className="size-3 opacity-0 group-hover:opacity-50 shrink-0 ml-2" />
            </button>
          ))}
          <Button
            size="sm"
            variant="outline"
            className="w-full text-xs mt-2"
            onClick={() => selectedStyle && handleGenerate(selectedStyle)}
          >
            <Sparkles className="size-3 mr-1" />
            Generate More
          </Button>
        </div>
      )}
    </div>
  );
}

// ── AI Rewrite Tool ──────────────────────────────────────────────────

const quickActions = [
  "Make it shorter",
  "Add urgency",
  "More conversational",
  "Make it punchier",
  "Add social proof",
  "Simplify the language",
];

function RewriteTool({
  brand,
  selectedText,
  fullContent,
  onApply,
}: {
  brand: Brand | null;
  selectedText: string;
  fullContent: string;
  onApply: (rewritten: string) => void;
}) {
  const [instruction, setInstruction] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [history, setHistory] = useState<
    { instruction: string; original: string; rewritten: string }[]
  >([]);

  const handleRewrite = async (inst: string) => {
    if (!selectedText) return;
    setIsRewriting(true);
    setRewritten("");

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedText,
          instruction: inst,
          brand: brand
            ? {
                name: brand.name,
                voiceTone: brand.voiceTone,
                brandPersonality: brand.brandPersonality,
                cardinalRules: brand.cardinalRules,
              }
            : null,
          fullContext: fullContent,
        }),
      });
      const data = await res.json();
      if (data.rewritten) {
        setRewritten(data.rewritten);
        setHistory((prev) => [
          { instruction: inst, original: selectedText, rewritten: data.rewritten },
          ...prev,
        ]);
      }
    } catch {
      setRewritten("Rewrite failed — check API key");
    } finally {
      setIsRewriting(false);
      setInstruction("");
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Selection status */}
      {selectedText ? (
        <div className="p-2.5 rounded-md bg-primary/5 border border-primary/20">
          <p className="text-[10px] font-medium text-primary mb-1">
            Selected text:
          </p>
          <p className="text-xs text-foreground line-clamp-3">
            &quot;{selectedText}&quot;
          </p>
        </div>
      ) : (
        <div className="p-3 rounded-md bg-muted/50 text-center">
          <MessageSquare className="size-5 text-muted-foreground mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">
            Select text in the editor to rewrite it with AI
          </p>
        </div>
      )}

      {/* Quick actions */}
      {selectedText && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Quick actions:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickActions.map((action) => (
              <Button
                key={action}
                variant="outline"
                size="sm"
                className="text-[11px] h-7"
                onClick={() => handleRewrite(action)}
                disabled={isRewriting}
              >
                {action}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Custom instruction */}
      {selectedText && (
        <div className="flex gap-1.5">
          <Input
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Custom instruction..."
            className="text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter" && instruction.trim()) {
                e.preventDefault();
                handleRewrite(instruction);
              }
            }}
          />
          <Button
            size="icon-sm"
            onClick={() => instruction.trim() && handleRewrite(instruction)}
            disabled={!instruction.trim() || isRewriting}
          >
            <Send className="size-3" />
          </Button>
        </div>
      )}

      {/* Loading */}
      {isRewriting && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
          <span className="text-xs text-muted-foreground ml-2">
            Rewriting...
          </span>
        </div>
      )}

      {/* Result */}
      {rewritten && !isRewriting && (
        <div className="space-y-2">
          <Separator />
          <p className="text-xs font-medium text-muted-foreground">
            Rewrite suggestion:
          </p>
          <div className="p-3 rounded-md bg-muted/50 text-sm">
            {rewritten}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 text-xs"
              onClick={() => {
                onApply(rewritten);
                setRewritten("");
              }}
            >
              Apply
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => setRewritten("")}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && !rewritten && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Recent rewrites:
            </p>
            <div className="space-y-2">
              {history.slice(0, 3).map((h, i) => (
                <button
                  key={i}
                  className="w-full text-left p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
                  onClick={() => onApply(h.rewritten)}
                >
                  <p className="text-[10px] text-muted-foreground mb-0.5">
                    {h.instruction}
                  </p>
                  <p className="text-xs line-clamp-2">{h.rewritten}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
