"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Zap,
  Film,
  Scissors,
  Sparkles,
  Share2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "active" | "complete" | "error";
  progress: number;
  duration?: string;
}

interface ContentItem {
  id: string;
  name: string;
  thumbnail?: string;
  type: "video" | "audio" | "image";
  stages: PipelineStage[];
  currentStage: number;
  isProcessing: boolean;
}

const defaultStages: Omit<PipelineStage, "status" | "progress" | "duration">[] = [
  {
    id: "ingest",
    name: "Ingestion",
    description: "Analyzing source content",
    icon: <Film className="w-4 h-4" />,
  },
  {
    id: "transform",
    name: "Transformation",
    description: "Adapting for platforms",
    icon: <Scissors className="w-4 h-4" />,
  },
  {
    id: "enhance",
    name: "Enhancement",
    description: "AI optimization",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "distribute",
    name: "Distribution",
    description: "Publishing to channels",
    icon: <Share2 className="w-4 h-4" />,
  },
];

function createInitialStages(): PipelineStage[] {
  return defaultStages.map((stage, index) => ({
    ...stage,
    status: index === 0 ? "active" : "pending",
    progress: index === 0 ? 0 : 0,
  }));
}

export function ProcessingPipeline() {
  const [items, setItems] = useState<ContentItem[]>([
    {
      id: "1",
      name: "Morning_Meditation_Raw.mp4",
      type: "video",
      stages: createInitialStages(),
      currentStage: 0,
      isProcessing: true,
    },
    {
      id: "2",
      name: "Leadership_Talk_Episode_12.mp4",
      type: "video",
      stages: defaultStages.map((stage) => ({
        ...stage,
        status: "complete" as const,
        progress: 100,
        duration: "2m 34s",
      })),
      currentStage: 4,
      isProcessing: false,
    },
  ]);

  // Simulate processing for active items
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => {
          if (!item.isProcessing) return item;

          const newStages = [...item.stages];
          const currentStageIndex = item.currentStage;

          if (currentStageIndex >= newStages.length) {
            return { ...item, isProcessing: false };
          }

          const currentStage = newStages[currentStageIndex];
          
          if (currentStage.progress < 100) {
            currentStage.progress = Math.min(
              100,
              currentStage.progress + Math.random() * 8
            );
          } else {
            currentStage.status = "complete";
            currentStage.duration = `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 60)}s`;
            
            if (currentStageIndex + 1 < newStages.length) {
              newStages[currentStageIndex + 1].status = "active";
              return {
                ...item,
                stages: newStages,
                currentStage: currentStageIndex + 1,
              };
            } else {
              return {
                ...item,
                stages: newStages,
                isProcessing: false,
              };
            }
          }

          return { ...item, stages: newStages };
        })
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const activeItems = items.filter((item) => item.isProcessing);
  const completedItems = items.filter((item) => !item.isProcessing);

  return (
    <div className="space-y-8">
      {/* Pipeline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-medium text-foreground">
            Processing Pipeline
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Content flows through our unified transformation engine
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Zap className="w-3 h-3" />
            {activeItems.length} Processing
          </Badge>
          <Badge variant="outline" className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {completedItems.length} Complete
          </Badge>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-secondary/50 border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Flow Stages</CardTitle>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Active
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Complete
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                Pending
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Stage Flow Diagram */}
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {defaultStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center flex-1 min-w-0">
                {/* Stage Node */}
                <div className="flex flex-col items-center gap-2 min-w-[80px]">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
                      {stage.icon}
                    </div>
                    {/* Animated ring for active stage */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: "2s" }} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{stage.name}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                {index < defaultStages.length - 1 && (
                  <div className="flex-1 flex items-center px-2">
                    <div className="h-0.5 flex-1 bg-border relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Processing Items */}
      {activeItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Currently Processing</h3>
          <div className="space-y-3">
            {activeItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Film className="w-6 h-6 text-muted-foreground" />
                    </div>

                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <Badge variant="secondary" className="shrink-0 gap-1">
                          <Clock className="w-3 h-3" />
                          Processing
                        </Badge>
                      </div>

                      {/* Stage Progress */}
                      <div className="space-y-2">
                        {item.stages.map((stage, index) => (
                          <div
                            key={stage.id}
                            className={`flex items-center gap-3 ${
                              stage.status === "pending" ? "opacity-50" : ""
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                stage.status === "complete"
                                  ? "bg-primary text-primary-foreground"
                                  : stage.status === "active"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {stage.status === "complete" ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <span className="text-xs font-medium">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-foreground">{stage.name}</span>
                                {stage.status === "active" && (
                                  <span className="text-xs text-muted-foreground">
                                    {Math.round(stage.progress)}%
                                  </span>
                                )}
                                {stage.duration && (
                                  <span className="text-xs text-muted-foreground">
                                    {stage.duration}
                                  </span>
                                )}
                              </div>
                              {stage.status === "active" && (
                                <Progress value={stage.progress} className="h-1" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="min-w-[44px] min-h-[44px]">
                        <Pause className="w-4 h-4" />
                        <span className="sr-only">Pause</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Items */}
      {completedItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Ready for Distribution</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {completedItems.map((item) => (
              <Card key={item.id} className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        4 platform versions ready
                      </p>
                    </div>
                    <Button size="sm" className="min-h-[44px]">
                      Distribute
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Processed", value: "127", icon: Film },
          { label: "Avg. Process Time", value: "4m 23s", icon: Clock },
          { label: "Success Rate", value: "99.2%", icon: CheckCircle2 },
          { label: "Active Flows", value: activeItems.length.toString(), icon: Zap },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
