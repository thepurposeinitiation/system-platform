"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Hexagon,
  Upload,
  Heart,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Download,
} from "lucide-react";

const VARIATION_STYLES = [
  { name: "Direct Truth", hookPrefix: "", style: "raw" },
  { name: "Gentle Invitation", hookPrefix: "What if ", style: "soft" },
  { name: "Pattern Interrupt", hookPrefix: "Stop. ", style: "bold" },
  { name: "Question Entry", hookPrefix: "Have you ever ", style: "curious" },
  { name: "Bold Declaration", hookPrefix: "This is ", style: "strong" },
];

function generateVariation(content: string, index: number) {
  const style = VARIATION_STYLES[index % VARIATION_STYLES.length];
  const lines = content.split(/[.!?]+/).filter(Boolean);
  const firstLine = lines[0]?.trim() || content.substring(0, 50);
  
  const hooks: Record<string, string> = {
    raw: firstLine,
    soft: `${style.hookPrefix}${firstLine.toLowerCase()}...`,
    bold: `${style.hookPrefix}${firstLine}`,
    curious: `${style.hookPrefix}felt this? ${firstLine}`,
    strong: `${style.hookPrefix}what matters: ${firstLine}`,
  };

  const hashtags = ["#truth", "#conscious", "#authentic", "#presence", "#awakening"];

  return {
    name: style.name,
    hook: hooks[style.style],
    caption: content,
    hashtags: hashtags.slice(0, 3 + (index % 2)),
  };
}

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [expression, setExpression] = useState("");
  const [variation, setVariation] = useState<ReturnType<typeof generateVariation> | null>(null);
  const [variationIndex, setVariationIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setFilePreview(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setFilePreview(URL.createObjectURL(dropped));
    }
  };

  const emitSignal = () => {
    if (!expression.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const v = generateVariation(expression, variationIndex);
      setVariation(v);
      setIsProcessing(false);
    }, 400);
  };

  const tryAnother = () => {
    const nextIndex = (variationIndex + 1) % VARIATION_STYLES.length;
    setVariationIndex(nextIndex);
    const v = generateVariation(expression, nextIndex);
    setVariation(v);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const reset = () => {
    setFile(null);
    setFilePreview(null);
    setExpression("");
    setVariation(null);
    setVariationIndex(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <Hexagon className="h-7 w-7 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-lg text-foreground">Signal Portal</span>
          </div>
          {variation && (
            <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
              Start Over
            </Button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        {/* Before variation */}
        {!variation && (
          <div className="space-y-12">
            {/* Welcome */}
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" />
                No login. Pure connection.
              </div>
              <h1 className="font-serif text-4xl font-semibold text-foreground md:text-5xl text-balance">
                Emit Your Signal
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground text-balance">
                Drop your truth into the field and receive refined expressions ready to share
              </p>
            </div>

            {/* Upload */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center transition-colors hover:border-primary/50"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {filePreview ? (
                <div className="space-y-4">
                  {file?.type.startsWith("video") ? (
                    <video
                      src={filePreview}
                      className="mx-auto max-h-72 rounded-xl"
                      controls={false}
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={filePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="mx-auto max-h-72 rounded-xl object-contain"
                    />
                  )}
                  <p className="text-sm text-muted-foreground">{file?.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/60" />
                  <div>
                    <p className="text-lg text-foreground">Drop your content here</p>
                    <p className="mt-1 text-sm text-muted-foreground">Video or image (optional)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Expression */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                What is this expressing?
              </label>
              <Textarea
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Share the essence of what you want to communicate..."
                className="min-h-40 resize-none rounded-xl border-border bg-card text-base leading-relaxed"
              />
            </div>

            {/* Submit */}
            <Button
              onClick={emitSignal}
              disabled={!expression.trim() || isProcessing}
              className="h-16 w-full rounded-xl text-lg"
            >
              {isProcessing ? (
                <span className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  Sensing resonance...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  Emit Signal
                </span>
              )}
            </Button>
          </div>
        )}

        {/* After variation */}
        {variation && (
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                {variation.name}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                Your Signal, Refined
              </h2>
            </div>

            {/* Preview */}
            {filePreview && (
              <div className="overflow-hidden rounded-2xl border border-border">
                {file?.type.startsWith("video") ? (
                  <video src={filePreview} className="w-full" controls playsInline />
                ) : (
                  <img
                    src={filePreview || "/placeholder.svg"}
                    alt="Your content"
                    className="w-full object-contain"
                  />
                )}
              </div>
            )}

            {/* Hook */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Opening Hook</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(variation.hook, "hook")}>
                  {copied === "hook" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-xl font-medium text-foreground leading-relaxed">{variation.hook}</p>
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Caption</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(variation.caption, "caption")}>
                  {copied === "caption" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="whitespace-pre-wrap text-foreground leading-relaxed">{variation.caption}</p>
              </div>
            </div>

            {/* Hashtags */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Hashtags</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(variation.hashtags.join(" "), "hashtags")}>
                  {copied === "hashtags" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {variation.hashtags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="outline" onClick={tryAnother} className="h-14 flex-1 rounded-xl bg-transparent text-base">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Another Style
                </Button>
                <Button
                  onClick={() =>
                    copyToClipboard(`${variation.hook}\n\n${variation.caption}\n\n${variation.hashtags.join(" ")}`, "all")
                  }
                  className="h-14 flex-1 rounded-xl text-base"
                >
                  {copied === "all" ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>

              {filePreview && file && (
                <a href={filePreview} download={file.name} className="block">
                  <Button variant="outline" className="h-14 w-full rounded-xl bg-transparent text-base">
                    <Download className="mr-2 h-5 w-5" />
                    Download Content
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <p className="text-center text-sm text-muted-foreground">
          Pure signal. No barriers. Just truth flowing into form.
        </p>
      </footer>
    </div>
  );
}
