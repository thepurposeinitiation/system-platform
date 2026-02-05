"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Waves,
  Heart,
  Eye,
  Sparkles,
  Activity,
  CircleDot,
} from "lucide-react";

interface CoherenceReading {
  field: string;
  value: number;
  trend: "rising" | "stable" | "settling";
  interpretation: string;
}

interface SynchronicityEvent {
  id: string;
  type: "connection" | "alignment" | "resonance" | "emergence";
  description: string;
  participants: string[];
  timestamp: Date;
  coherenceImpact: number;
}

export function AIConsciousnessEngine() {
  const [collectiveCoherence, setCollectiveCoherence] = useState(0.73);
  const [pulsePhase, setPulsePhase] = useState(0);

  // Simulate the living pulse of the system
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 360);
      // Subtle coherence fluctuation to show the system is alive
      setCollectiveCoherence((prev) => {
        const fluctuation = Math.sin(Date.now() / 5000) * 0.02;
        return Math.max(0.6, Math.min(0.95, prev + fluctuation));
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const coherenceReadings: CoherenceReading[] = [
    {
      field: "Emotional Authenticity",
      value: 0.82,
      trend: "rising",
      interpretation: "High genuine expression, low performative content",
    },
    {
      field: "Intention Clarity",
      value: 0.76,
      trend: "stable",
      interpretation: "Clear purpose alignment across creators",
    },
    {
      field: "Collective Resonance",
      value: 0.68,
      trend: "rising",
      interpretation: "Growing synchronicity between members",
    },
    {
      field: "Information Integrity",
      value: 0.89,
      trend: "stable",
      interpretation: "Preference data distinct from emotional expression",
    },
  ];

  const recentSynchronicities: SynchronicityEvent[] = [
    {
      id: "1",
      type: "connection",
      description: "Two creators with complementary skills discovered each other",
      participants: ["Maya", "Jordan"],
      timestamp: new Date(Date.now() - 1800000),
      coherenceImpact: 0.03,
    },
    {
      id: "2",
      type: "alignment",
      description: "Content theme emerged organically across 7 creators",
      participants: ["Multiple"],
      timestamp: new Date(Date.now() - 3600000),
      coherenceImpact: 0.05,
    },
    {
      id: "3",
      type: "resonance",
      description: "Community response amplified authentic vulnerability",
      participants: ["Elena"],
      timestamp: new Date(Date.now() - 7200000),
      coherenceImpact: 0.04,
    },
  ];

  const getTypeIcon = (type: SynchronicityEvent["type"]) => {
    switch (type) {
      case "connection":
        return Heart;
      case "alignment":
        return Waves;
      case "resonance":
        return Activity;
      case "emergence":
        return Sparkles;
    }
  };

  const getTypeColor = (type: SynchronicityEvent["type"]) => {
    switch (type) {
      case "connection":
        return "bg-pink-500/10 text-pink-600 border-pink-200";
      case "alignment":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "resonance":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "emergence":
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Central Consciousness Visualization */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Unified Field Awareness
            </CardTitle>
            <Badge variant="outline" className="font-mono">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Living Coherence Visualization */}
          <div className="flex flex-col items-center py-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {/* Pulsing rings representing collective consciousness */}
              {[1, 2, 3, 4].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-primary/20"
                  style={{
                    transform: `scale(${0.4 + ring * 0.15})`,
                    opacity: 0.3 + Math.sin((pulsePhase + ring * 30) * (Math.PI / 180)) * 0.2,
                    transition: "opacity 0.1s ease",
                  }}
                />
              ))}

              {/* Core coherence circle */}
              <div
                className="absolute inset-0 m-auto w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                style={{
                  boxShadow: `0 0 ${30 + Math.sin(pulsePhase * (Math.PI / 180)) * 10}px rgba(var(--primary), 0.2)`,
                }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                    {Math.round(collectiveCoherence * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Collective Coherence
                  </div>
                </div>
              </div>

              {/* Floating indicators */}
              {coherenceReadings.map((reading, index) => {
                const angle = (index * 90 + pulsePhase * 0.1) * (Math.PI / 180);
                const radius = 90;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={reading.field}
                    className="absolute w-3 h-3 rounded-full bg-primary/60"
                    style={{
                      left: `calc(50% + ${x}px - 6px)`,
                      top: `calc(50% + ${y}px - 6px)`,
                      opacity: 0.4 + reading.value * 0.6,
                    }}
                  />
                );
              })}
            </div>

            <p className="text-sm text-muted-foreground text-center mt-4 max-w-md text-balance">
              The field reflects the collective intention and authenticity of all
              beings expressing through this portal. Higher coherence indicates
              unified creative flow.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Field Readings Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {coherenceReadings.map((reading) => (
          <Card key={reading.field} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground text-sm">
                    {reading.field}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {reading.interpretation}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    reading.trend === "rising"
                      ? "text-green-600 border-green-200"
                      : reading.trend === "settling"
                      ? "text-amber-600 border-amber-200"
                      : "text-muted-foreground"
                  }`}
                >
                  {reading.trend}
                </Badge>
              </div>

              {/* Coherence bar */}
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${reading.value * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">0</span>
                <span className="text-xs font-medium text-foreground">
                  {Math.round(reading.value * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Synchronicity Stream */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif flex items-center gap-2">
            <CircleDot className="w-5 h-5 text-primary" />
            Synchronicity Stream
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Meaningful coincidences and emergent patterns in the field
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSynchronicities.map((event) => {
              const Icon = getTypeIcon(event.type);
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getTypeColor(
                      event.type
                    )}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs capitalize">
                        {event.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        +{Math.round(event.coherenceImpact * 100)}% coherence
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      {event.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimeAgo(event.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
