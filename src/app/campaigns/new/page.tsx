"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  campaignFrameworks,
  campaignStyles,
  type CampaignStyle,
} from "@/lib/campaign-frameworks";
import { saveCampaign, generateId } from "@/lib/store";
import { useBrand } from "@/lib/brand-context";

const categories = [
  { id: "product", label: "Product" },
  { id: "educational", label: "Educational" },
  { id: "social-proof", label: "Social Proof" },
  { id: "brand-story", label: "Brand Story" },
  { id: "seasonal", label: "Seasonal" },
] as const;

export default function NewCampaignPage() {
  const router = useRouter();
  const { brands, activeBrand } = useBrand();
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState<CampaignStyle>("designed");
  const [framework, setFramework] = useState("");
  const [brief, setBrief] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Auto-select active brand
  useEffect(() => {
    if (activeBrand && !brand) {
      setBrand(activeBrand.id);
    }
  }, [activeBrand, brand]);

  const filteredFrameworks =
    categoryFilter === "all"
      ? campaignFrameworks
      : campaignFrameworks.filter((f) => f.category === categoryFilter);

  const selectedFramework = campaignFrameworks.find((f) => f.id === framework);

  const handleCreate = () => {
    const id = generateId();
    const selectedBrand = brands.find((b) => b.id === brand);
    const fw = campaignFrameworks.find((f) => f.id === framework);
    saveCampaign({
      id,
      brandId: brand,
      title: title || `${selectedBrand?.name || "Campaign"} — ${fw?.name || "Auto"}`,
      framework: fw?.name || "Auto",
      style,
      brief,
      subject: "",
      preview: "",
      body: "",
      validationScore: null,
      status: "draft",
      createdAt: new Date().toISOString(),
    });
    router.push(`/campaigns/${id}`);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">New Campaign</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Create a new email campaign with AI-powered copy generation
        </p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Campaign Title (optional)
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Presidents Day Sale"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Brand</label>
          {brands.length === 0 ? (
            <div className="text-sm text-muted-foreground p-3 border border-dashed border-border rounded-md">
              No brands yet.{" "}
              <a href="/brands/new" className="text-primary underline">
                Add a brand first
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {brands.map((b) => (
                <Card
                  key={b.id}
                  className={cn(
                    "cursor-pointer transition-colors",
                    brand === b.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-accent/50"
                  )}
                  onClick={() => setBrand(b.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full border-2",
                          brand === b.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        )}
                      />
                      <span className="text-sm font-medium">{b.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Campaign Style */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Campaign Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {campaignStyles.map((s) => (
              <Card
                key={s.id}
                className={cn(
                  "cursor-pointer transition-colors",
                  style === s.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-accent/50"
                )}
                onClick={() => setStyle(s.id)}
              >
                <CardContent className="p-3 text-center">
                  <span className="text-xl mb-1 block">{s.icon}</span>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Framework */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Framework (29 available)
          </label>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            <Badge
              variant={categoryFilter === "all" ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => setCategoryFilter("all")}
            >
              All
            </Badge>
            {categories.map((c) => (
              <Badge
                key={c.id}
                variant={categoryFilter === c.id ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => setCategoryFilter(c.id)}
              >
                {c.label}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
            {filteredFrameworks.map((f) => (
              <div
                key={f.id}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors text-sm",
                  framework === f.id
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-accent/50 border border-transparent"
                )}
                onClick={() => setFramework(f.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{f.name}</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono shrink-0">
                  {f.tacticId}
                </Badge>
              </div>
            ))}
          </div>
          {selectedFramework && (
            <div className="mt-2 p-2.5 rounded-md bg-muted/50 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {selectedFramework.name}
              </span>
              : {selectedFramework.bestFor}
            </div>
          )}
        </div>

        <Separator />

        {/* Brief */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Brief</label>
          <Textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Describe the campaign context, key message, product details, any promotions, and the desired tone..."
            rows={6}
            className="resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button onClick={handleCreate} disabled={!brand || !brief.trim()}>
            Create Campaign
          </Button>
          <Button variant="outline" onClick={() => router.push("/campaigns")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
