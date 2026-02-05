"use client";

import { Button } from "@/components/ui/button";
import { Layers, Plus, Send, Upload } from "lucide-react";

const actions = [
  {
    icon: Upload,
    label: "Upload Content",
    description: "Add raw video, audio, or images",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Layers,
    label: "Repurpose",
    description: "Transform content for platforms",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Send,
    label: "Distribute",
    description: "Schedule and publish content",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Plus,
    label: "New Project",
    description: "Start a content project",
    color: "bg-accent text-accent-foreground",
  },
];

export function QuickActions() {
  return (
    <section>
      <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto flex-col items-start gap-2 p-4 bg-card hover:bg-muted/50 border-border"
          >
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${action.color}`}
            >
              <action.icon className="size-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {action.description}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
}
