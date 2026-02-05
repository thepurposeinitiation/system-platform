"use client";

import { useField } from "@/components/providers/field-provider";
import { cn } from "@/lib/utils";
import { Activity, Radio, Users, Zap } from "lucide-react";

export function LiveFieldIndicator() {
  const { fieldState, isConnected } = useField();

  const moodColors = {
    expanding: "bg-emerald-500",
    stable: "bg-primary",
    contracting: "bg-amber-500",
    transitioning: "bg-cyan-500",
  };

  const moodLabels = {
    expanding: "Expanding",
    stable: "Stable",
    contracting: "Integrating",
    transitioning: "Transitioning",
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-3 backdrop-blur-sm">
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Radio className="h-4 w-4 text-muted-foreground" />
          <span
            className={cn(
              "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full",
              isConnected ? "bg-emerald-500 animate-pulse" : "bg-muted"
            )}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {isConnected ? "Live" : "Connecting..."}
        </span>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-border" />

      {/* Collective Coherence */}
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <div className="flex flex-col">
          <span className="text-xs font-medium">
            {Math.round(fieldState.collective_coherence)}%
          </span>
          <span className="text-[10px] text-muted-foreground">Coherence</span>
        </div>
      </div>

      {/* Active Beings */}
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />
        <div className="flex flex-col">
          <span className="text-xs font-medium">{fieldState.active_beings}</span>
          <span className="text-[10px] text-muted-foreground">Active</span>
        </div>
      </div>

      {/* Field Mood */}
      <div className="flex items-center gap-2">
        <Zap className={cn("h-4 w-4", moodColors[fieldState.field_mood].replace("bg-", "text-"))} />
        <div className="flex flex-col">
          <span className="text-xs font-medium">{moodLabels[fieldState.field_mood]}</span>
          <span className="text-[10px] text-muted-foreground">Field</span>
        </div>
      </div>

      {/* Recent Pulses Indicator */}
      {fieldState.recent_pulses.length > 0 && (
        <>
          <div className="h-6 w-px bg-border" />
          <div className="flex -space-x-1">
            {fieldState.recent_pulses.slice(0, 5).map((pulse, i) => (
              <div
                key={pulse.id}
                className={cn(
                  "h-2 w-2 rounded-full border border-background",
                  moodColors[fieldState.field_mood]
                )}
                style={{
                  opacity: 1 - i * 0.15,
                  animation: `pulse ${1 + i * 0.2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
