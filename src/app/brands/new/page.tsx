"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Globe, Loader2 } from "lucide-react";
import { saveBrand, generateId } from "@/lib/store";
import { useBrand } from "@/lib/brand-context";

export default function NewBrandPage() {
  const router = useRouter();
  const { refreshBrands } = useBrand();
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [klaviyoAccount, setKlaviyoAccount] = useState("");
  const [description, setDescription] = useState("");
  // Voice & Personality
  const [voiceTone, setVoiceTone] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandPersonality, setBrandPersonality] = useState("");
  const [emailExamples, setEmailExamples] = useState("");
  // Lists
  const [products, setProducts] = useState<string[]>([]);
  const [productInput, setProductInput] = useState("");
  const [usps, setUsps] = useState<string[]>([]);
  const [uspInput, setUspInput] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [competitorInput, setCompetitorInput] = useState("");
  const [cardinalRules, setCardinalRules] = useState<string[]>([]);
  const [ruleInput, setRuleInput] = useState("");

  const [isResearching, setIsResearching] = useState(false);

  const handleResearch = async () => {
    if (!website.trim()) return;
    setIsResearching(true);
    try {
      const url = website.startsWith("http") ? website : `https://${website}`;
      const res = await fetch("/api/brand-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.generated) {
        if (data.name && !name) setName(data.name);
        if (data.description) setDescription(data.description);
        if (data.voiceTone) setVoiceTone(data.voiceTone);
        if (data.targetAudience) setTargetAudience(data.targetAudience);
        if (data.brandPersonality) setBrandPersonality(data.brandPersonality);
        if (data.usps?.length) setUsps(data.usps);
        if (data.products?.length) setProducts(data.products);
        if (data.competitors?.length) setCompetitors(data.competitors);
      }
    } catch {
      // Research failed, user can fill manually
    } finally {
      setIsResearching(false);
    }
  };

  const addToList = (
    list: string[],
    setList: (v: string[]) => void,
    input: string,
    setInput: (v: string) => void
  ) => {
    if (input.trim()) {
      setList([...list, input.trim()]);
      setInput("");
    }
  };

  const removeFromList = (
    list: string[],
    setList: (v: string[]) => void,
    index: number
  ) => {
    setList(list.filter((_, j) => j !== index));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    saveBrand({
      id: generateId(),
      name: name.trim(),
      website: website.trim(),
      klaviyoAccount: klaviyoAccount.trim(),
      description: description.trim(),
      voiceTone: voiceTone.trim(),
      targetAudience: targetAudience.trim(),
      brandPersonality: brandPersonality.trim(),
      emailExamples: emailExamples.trim(),
      usps,
      competitors,
      products,
      cardinalRules,
      createdAt: new Date().toISOString(),
    });
    refreshBrands();
    router.push("/brands");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Add Brand</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Create a brand profile for campaign and flow generation
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Brand Name <span className="text-destructive">*</span>
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. CPX, Vapor Fresh"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Website</label>
          <div className="flex gap-2">
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleResearch}
              disabled={!website.trim() || isResearching}
              className="shrink-0"
            >
              {isResearching ? (
                <Loader2 className="size-3 mr-1 animate-spin" />
              ) : (
                <Globe className="size-3 mr-1" />
              )}
              {isResearching ? "Researching..." : "Auto-fill from URL"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Enter the website URL and click &quot;Auto-fill&quot; to have AI research and populate the brand profile
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Klaviyo Account
          </label>
          <Input
            value={klaviyoAccount}
            onChange={(e) => setKlaviyoAccount(e.target.value)}
            placeholder="Account name or ID"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Brand Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this brand sell? Who is their target customer?"
            rows={3}
            className="resize-none"
          />
        </div>

        <Separator />

        {/* Voice & Personality */}
        <div>
          <h2 className="text-sm font-semibold mb-4">Voice & Personality</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Voice & Tone
              </label>
              <Input
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                placeholder="e.g. Witty, casual, confident — like a smart friend"
              />
              <p className="text-xs text-muted-foreground mt-1">
                How does the brand sound? Casual, professional, playful, authoritative?
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Target Audience
              </label>
              <Input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Health-conscious millennials, 25-40, urban professionals"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Brand Personality
              </label>
              <Textarea
                value={brandPersonality}
                onChange={(e) => setBrandPersonality(e.target.value)}
                placeholder="e.g. We're the friend who knows everything about supplements. We don't lecture — we share what actually works."
                rows={3}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                If the brand was a person, how would they talk?
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* USPs */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Unique Selling Propositions
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            What makes this brand different from competitors?
          </p>
          <div className="flex gap-2 mb-2">
            <Input
              value={uspInput}
              onChange={(e) => setUspInput(e.target.value)}
              placeholder="Add a USP..."
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.preventDefault(), addToList(usps, setUsps, uspInput, setUspInput))
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => addToList(usps, setUsps, uspInput, setUspInput)}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {usps.map((u, i) => (
              <Badge key={i} variant="secondary" className="text-xs gap-1">
                {u}
                <X
                  className="size-3 cursor-pointer"
                  onClick={() => removeFromList(usps, setUsps, i)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Competitors */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Competitors
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={competitorInput}
              onChange={(e) => setCompetitorInput(e.target.value)}
              placeholder="Add a competitor..."
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.preventDefault(),
                addToList(competitors, setCompetitors, competitorInput, setCompetitorInput))
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addToList(competitors, setCompetitors, competitorInput, setCompetitorInput)
              }
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {competitors.map((c, i) => (
              <Badge key={i} variant="outline" className="text-xs gap-1">
                {c}
                <X
                  className="size-3 cursor-pointer"
                  onClick={() => removeFromList(competitors, setCompetitors, i)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Products */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Products</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              placeholder="Add a product..."
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.preventDefault(),
                addToList(products, setProducts, productInput, setProductInput))
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addToList(products, setProducts, productInput, setProductInput)
              }
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {products.map((p, i) => (
              <Badge key={i} variant="secondary" className="text-xs gap-1">
                {p}
                <X
                  className="size-3 cursor-pointer"
                  onClick={() => removeFromList(products, setProducts, i)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Cardinal Rules */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Cardinal Rules
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Rules the AI must always follow for this brand (e.g. &quot;Never
            mention competitor X&quot;, &quot;Always use casual tone&quot;)
          </p>
          <div className="flex gap-2 mb-2">
            <Input
              value={ruleInput}
              onChange={(e) => setRuleInput(e.target.value)}
              placeholder="Add a rule..."
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.preventDefault(),
                addToList(cardinalRules, setCardinalRules, ruleInput, setRuleInput))
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addToList(cardinalRules, setCardinalRules, ruleInput, setRuleInput)
              }
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cardinalRules.map((r, i) => (
              <Badge key={i} variant="outline" className="text-xs gap-1">
                {r}
                <X
                  className="size-3 cursor-pointer"
                  onClick={() =>
                    removeFromList(cardinalRules, setCardinalRules, i)
                  }
                />
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Email Examples */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Email Examples
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Paste examples of emails in this brand&apos;s voice. The AI uses these as
            reference for tone and style.
          </p>
          <Textarea
            value={emailExamples}
            onChange={(e) => setEmailExamples(e.target.value)}
            placeholder="Paste example email copy here. Include subject lines, body copy, CTAs — anything that captures the brand voice..."
            rows={8}
            className="resize-none font-mono text-xs"
          />
        </div>

        <Separator />

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save Brand
          </Button>
          <Button variant="outline" onClick={() => router.push("/brands")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
