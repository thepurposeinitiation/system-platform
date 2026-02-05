"use client";

import React from "react"

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Hexagon, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/portal");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-background p-6">
      {/* Sacred geometry background pattern */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-5">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
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
            The Purpose Initiation
          </h1>
          <p className="mt-2 text-muted-foreground">
            Return to the field
          </p>
        </div>

        {/* Login form */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
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
                Password
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

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="h-12 w-full rounded-xl text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Entering the field...
                </span>
              ) : (
                "Enter"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Ready to begin your initiation?{" "}
            <Link
              href="/auth/initiate"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Join the collective
            </Link>
          </div>
        </div>

        {/* Footer message */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          A unified field for conscious creators
        </p>
      </div>
    </div>
  );
}
