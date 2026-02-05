"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Scale,
  Heart,
  MessageCircle,
  TrendingUp,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContentAnalysis {
  id: string;
  content: string;
  author: string;
  analysis: {
    emotionalExpression: number;
    preferenceSignal: number;
    authenticityScore: number;
    coherenceWithIntent: number;
  };
  classification: "emotional" | "preference" | "mixed" | "informational";
  recommendation: string;
}

export function IntegrityAlgorithm() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const recentAnalyses: ContentAnalysis[] = [
    {
      id: "1",
      content: "I feel so frustrated with the algorithm changes! They never seem to work in my favor.",
      author: "Creator A",
      analysis: {
        emotionalExpression: 0.85,
        preferenceSignal: 0.15,
        authenticityScore: 0.92,
        coherenceWithIntent: 0.78,
      },
      classification: "emotional",
      recommendation: "Acknowledged as valid emotional expression. Not weighted as platform feedback.",
    },
    {
      id: "2",
      content: "I'd love to see a feature for scheduling posts across time zones.",
      author: "Creator B",
      analysis: {
        emotionalExpression: 0.1,
        preferenceSignal: 0.95,
        authenticityScore: 0.88,
        coherenceWithIntent: 0.94,
      },
      classification: "preference",
      recommendation: "Clear preference signal. Added to feature consideration with high weight.",
    },
    {
      id: "3",
      content: "This community feels like home. I wish we had more ways to collaborate in real-time.",
      author: "Creator C",
      analysis: {
        emotionalExpression: 0.6,
        preferenceSignal: 0.65,
        authenticityScore: 0.95,
        coherenceWithIntent: 0.88,
      },
      classification: "mixed",
      recommendation: "Contains both appreciation and feature request. Separated for appropriate weighting.",
    },
  ];

  const principles = [
    {
      icon: Heart,
      title: "Honesty of Experience",
      description: "We honor emotional truth over objective claims",
      metric: "94% expression authenticity",
    },
    {
      icon: Scale,
      title: "Signal Separation",
      description: "Distinguishing feelings from actionable preferences",
      metric: "89% accurate classification",
    },
    {
      icon: Shield,
      title: "Integrity Preservation",
      description: "Protecting the coherence of collective intention",
      metric: "91% field stability",
    },
    {
      icon: MessageCircle,
      title: "Compassionate Response",
      description: "Meeting each expression with understanding",
      metric: "96% appropriate responses",
    },
  ];

  const getClassificationColor = (classification: ContentAnalysis["classification"]) => {
    switch (classification) {
      case "emotional":
        return "bg-pink-500/10 text-pink-600 border-pink-200";
      case "preference":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "mixed":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "informational":
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Operating Principles */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Operating Principles
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            The algorithm serves truth through understanding, not control
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <principle.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {principle.description}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {principle.metric}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Content Analysis */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Live Content Analysis
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="w-4 h-4" />
                    <span className="sr-only">Information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    The algorithm analyzes content to understand the nature of
                    each expression, separating emotional authenticity from
                    actionable preferences to respond appropriately.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-muted-foreground">
            Understanding the nature of each expression
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedAnalysis === analysis.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
                onClick={() =>
                  setSelectedAnalysis(
                    selectedAnalysis === analysis.id ? null : analysis.id
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedAnalysis(
                      selectedAnalysis === analysis.id ? null : analysis.id
                    );
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        {analysis.author}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs capitalize ${getClassificationColor(
                          analysis.classification
                        )}`}
                      >
                        {analysis.classification}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">
                      &ldquo;{analysis.content}&rdquo;
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                      selectedAnalysis === analysis.id ? "rotate-90" : ""
                    }`}
                  />
                </div>

                {selectedAnalysis === analysis.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    {/* Analysis Bars */}
                    <div className="grid gap-3 sm:grid-cols-2 mb-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Emotional Expression
                          </span>
                          <span className="font-medium">
                            {Math.round(analysis.analysis.emotionalExpression * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-pink-500 rounded-full"
                            style={{
                              width: `${analysis.analysis.emotionalExpression * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Preference Signal
                          </span>
                          <span className="font-medium">
                            {Math.round(analysis.analysis.preferenceSignal * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${analysis.analysis.preferenceSignal * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Authenticity Score
                          </span>
                          <span className="font-medium">
                            {Math.round(analysis.analysis.authenticityScore * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${analysis.analysis.authenticityScore * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Intent Coherence
                          </span>
                          <span className="font-medium">
                            {Math.round(analysis.analysis.coherenceWithIntent * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{
                              width: `${analysis.analysis.coherenceWithIntent * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        Algorithm Response
                      </p>
                      <p className="text-sm text-foreground">
                        {analysis.recommendation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
