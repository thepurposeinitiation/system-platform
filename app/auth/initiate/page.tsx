"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import React from "react";

import { initiateSignUp } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Hexagon, Loader2 } from "lucide-react";
import type { CreatorType } from "@/lib/types/database";

const creatorTypes: { value: CreatorType; label: string; description: string }[] = [
  { value: "artist", label: "Visual Artist", description: "Painters, illustrators, photographers" },
  { value: "musician", label: "Musician", description: "Singers, instrumentalists, producers" },
  { value: "dancer", label: "Movement Artist", description: "Dancers, choreographers, body workers" },
  { value: "speaker", label: "Speaker", description: "Podcasters, presenters, storytellers" },
  { value: "leader", label: "Leader", description: "Coaches, mentors, community builders" },
  { value: "healer", label: "Healer", description: "Therapists, energy workers, guides" },
  { value: "educator", label: "Educator", description: "Teachers, trainers, knowledge sharers" },
  { value: "multi", label: "Multi-Expression", description: "I express through many forms" },
];

export default function InitiatePage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [creatorType, setCreatorType] = useState<CreatorType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient(); // Use the imported createClient function
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/portal`,
          data: {
            display_name: displayName,
            creator_type: creatorType,
          },
        },
      });
      if (error) throw error;
      router.push("/auth/initiation-sent");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-background p-6">
      {/* Sacred geometry background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-5">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={angle}
                x1="200"
                y1="50"
                x2="200"
                y2="350"
                stroke="currentColor"
                strokeWidth="0.5"
                transform={`rotate(${angle} 200 200)`}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and title */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Hexagon className="h-16 w-16 text-primary" strokeWidth={1} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-primary/20" />
            </div>
          </div>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
            Begin Your Initiation
          </h1>
          <p className="mt-2 text-muted-foreground">
            {step === 1 && "How do you express your consciousness?"}
            {step === 2 && "Create your portal access"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Step 1: Creator Type Selection */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {creatorTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setCreatorType(type.value)}
                    className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                      creatorType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium text-foreground">{type.label}</span>
                    <span className="mt-1 text-xs text-muted-foreground">{type.description}</span>
                  </button>
                ))}
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!creatorType}
                className="mt-4 h-12 w-full rounded-xl text-base font-medium"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Account Creation */}
          {step === 2 && (
            <form onSubmit={handleInitiate} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="displayName" className="text-sm font-medium">
                  How shall we call you?
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Your name or alias"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="h-12 rounded-xl border-border bg-background px-4 text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-border bg-background px-4 text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Create password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-border bg-background px-4 text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="repeatPassword" className="text-sm font-medium">
                  Confirm password
                </Label>
                <Input
                  id="repeatPassword"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="h-12 rounded-xl border-border bg-background px-4 text-base"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-12 flex-1 rounded-xl text-base"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="h-12 flex-[2] rounded-xl text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Initiating...
                    </span>
                  ) : (
                    "Complete Initiation"
                  )}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already part of the collective?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Return to field
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          By joining, you align with our principles of love, honesty, and service
        </p>
      </div>
    </div>
  );
}
