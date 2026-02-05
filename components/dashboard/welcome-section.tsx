"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Sparkles } from "lucide-react";

export function WelcomeSection() {
  const profileProgress = 75;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/10 border border-border p-6 md:p-8">
      {/* Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Welcome back
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
            Ready to share your authentic signal with the world?
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
            Your content has the power to inspire. Let{"'"}s create, repurpose,
            and distribute with intention today.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <Button size="lg" className="gap-2 rounded-full">
            Create New Content
            <ArrowRight className="size-4" />
          </Button>

          {/* Profile Completion */}
          <div className="flex items-center gap-3 bg-card/50 rounded-full px-4 py-2 border border-border">
            <div className="flex-1 min-w-32">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                  Profile Complete
                </span>
                <span className="text-xs font-medium text-foreground">
                  {profileProgress}%
                </span>
              </div>
              <Progress value={profileProgress} className="h-1.5" />
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              Complete
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
