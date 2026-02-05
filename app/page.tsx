"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Hexagon,
  Upload,
  Heart,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Download,
  X,
} from "lucide-react";

// Simple variation patterns - no heavy processing
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

  const hashtags = [
    "#truth", "#conscious", "#authentic", "#presence", "#awakening"
  ];

  return {
    name: style.name,
    hook: hooks[style.style],
    caption: content,
    hashtags: hashtags.slice(0, 3 + (index % 2)),
  };
}

export default function HomePage() {
  const [mode, setMode] = useState<"landing" | "express">("landing");
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
    
    // Small delay for feel, then generate locally
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
      // Fallback
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
    setMode("landing");
  };

  // Express Mode - Signal into the Field
  if (mode === "express") {
    return (
      <div className="min-h-screen bg-background">
        {/* Minimal header */}
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <button onClick={reset} className="flex items-center gap-2">
              <Hexagon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <span className="font-serif text-lg text-foreground">Signal Portal</span>
            </button>
            <Button variant="ghost" size="sm" onClick={reset}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-6 py-12 md:py-20">
          {/* Before variation is generated */}
          {!variation && (
            <div className="space-y-10">
              <div className="text-center">
                <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                  Emit Your Signal
                </h1>
                <p className="mt-3 text-muted-foreground">
                  No login required. Drop your truth and see how it resonates.
                </p>
              </div>

              {/* File upload area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="cursor-pointer rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center transition-colors hover:border-primary/50 hover:bg-card/80"
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
                        className="mx-auto max-h-64 rounded-xl"
                        controls={false}
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="mx-auto max-h-64 rounded-xl object-contain"
                      />
                    )}
                    <p className="text-sm text-muted-foreground">{file?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="text-foreground">Drop your content here</p>
                    <p className="text-sm text-muted-foreground">
                      Video or image (optional)
                    </p>
                  </div>
                )}
              </div>

              {/* Expression textarea */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  What is this expressing?
                </label>
                <Textarea
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="Share the essence of what you want to communicate..."
                  className="min-h-32 resize-none rounded-xl border-border bg-card text-base"
                />
              </div>

              {/* Emit button */}
              <Button
                onClick={emitSignal}
                disabled={!expression.trim() || isProcessing}
                className="h-14 w-full rounded-xl text-lg"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    Sensing resonance...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Emit Signal
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* After variation is generated */}
          {variation && (
            <div className="space-y-10">
              <div className="text-center">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                  <Sparkles className="h-4 w-4" />
                  {variation.name}
                </div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Your Signal, Refined
                </h2>
              </div>

              {/* Preview with file */}
              {filePreview && (
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  {file?.type.startsWith("video") ? (
                    <video
                      src={filePreview}
                      className="w-full"
                      controls
                      playsInline
                    />
                  ) : (
                    <img
                      src={filePreview}
                      alt="Your content"
                      className="w-full object-contain"
                    />
                  )}
                </div>
              )}

              {/* Hook */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Opening Hook</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(variation.hook, "hook")}
                  >
                    {copied === "hook" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-lg font-medium text-foreground">{variation.hook}</p>
                </div>
              </div>

              {/* Caption */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Caption</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(variation.caption, "caption")}
                  >
                    {copied === "caption" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="whitespace-pre-wrap text-foreground">{variation.caption}</p>
                </div>
              </div>

              {/* Hashtags */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Hashtags</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(variation.hashtags.join(" "), "hashtags")}
                  >
                    {copied === "hashtags" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variation.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={tryAnother}
                  className="h-12 flex-1 rounded-xl bg-transparent"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Another Style
                </Button>
                <Button
                  onClick={() =>
                    copyToClipboard(
                      `${variation.hook}\n\n${variation.caption}\n\n${variation.hashtags.join(" ")}`,
                      "all"
                    )
                  }
                  className="h-12 flex-1 rounded-xl"
                >
                  {copied === "all" ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied Everything
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>

              {/* Download if file exists */}
              {filePreview && file && (
                <a
                  href={filePreview}
                  download={file.name}
                  className="block"
                >
                  <Button variant="outline" className="h-12 w-full rounded-xl bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download Content
                  </Button>
                </a>
              )}

              {/* CTA to join */}
              <div className="rounded-2xl border border-border bg-card/50 p-6 text-center">
                <p className="text-muted-foreground">
                  Want automated distribution across all platforms?
                </p>
                <Link href="/auth/initiate" className="mt-3 inline-block">
                  <Button variant="link" className="text-primary">
                    Join the field
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Start over */}
              <Button
                variant="ghost"
                onClick={reset}
                className="w-full text-muted-foreground"
              >
                Start Over
              </Button>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Landing Mode
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Sacred geometry background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
          <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="70" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
              {[0, 30, 60, 90, 120, 150].map((angle) => (
                <line
                  key={angle}
                  x1="200"
                  y1="10"
                  x2="200"
                  y2="390"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  transform={`rotate(${angle} 200 200)`}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <Hexagon className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-xl font-medium text-foreground">
              The Purpose Initiation
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="h-11 rounded-xl px-5">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-16 text-center md:pb-32 md:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-primary" />
            <span>A platform built on love, truth, and service</span>
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl md:leading-tight text-balance">
            Emit Your Signal{" "}
            <span className="text-primary">Into the Field</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">
            No account needed. Drop your raw expression, see how it resonates, 
            and receive optimized variations ready to share across all platforms.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 w-full rounded-xl px-8 text-base sm:w-auto"
              onClick={() => setMode("express")}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try It Now
            </Button>
            <Link href="/auth/initiate">
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-full rounded-xl px-8 text-base sm:w-auto bg-transparent"
              >
                Join the Collective
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Free to use. No login required.
          </p>
        </div>
      </header>

      {/* Simple How It Works */}
      <section className="border-y border-border bg-card/50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Simple as Breathing
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
                1. Drop Content
              </h3>
              <p className="text-muted-foreground">
                Upload a video or image, describe what it expresses
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
                2. Receive Variations
              </h3>
              <p className="text-muted-foreground">
                See your truth refined with hooks, captions, and hashtags
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
                3. Share Freely
              </h3>
              <p className="text-muted-foreground">
                Copy and post to any platform. Your essence, amplified.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="h-14 rounded-xl px-10 text-base"
              onClick={() => setMode("express")}
            >
              Emit Your Signal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <Hexagon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <span className="font-serif text-lg font-medium text-foreground">
                The Purpose Initiation
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A unified field for conscious creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
