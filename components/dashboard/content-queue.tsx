"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MoreHorizontal } from "lucide-react";

const queueItems = [
  {
    id: 1,
    title: "The Art of Conscious Leadership",
    platform: "Instagram",
    platformIcon: "IG",
    type: "Reel",
    scheduledFor: "Today, 2:00 PM",
    status: "ready",
    thumbnail: "/content-1.jpg",
  },
  {
    id: 2,
    title: "Morning Movement Practice",
    platform: "TikTok",
    platformIcon: "TT",
    type: "Video",
    scheduledFor: "Today, 5:30 PM",
    status: "processing",
    thumbnail: "/content-2.jpg",
  },
  {
    id: 3,
    title: "Finding Your Authentic Voice",
    platform: "Instagram",
    platformIcon: "IG",
    type: "Story",
    scheduledFor: "Tomorrow, 9:00 AM",
    status: "draft",
    thumbnail: "/content-3.jpg",
  },
  {
    id: 4,
    title: "Community Q&A Session Highlights",
    platform: "TikTok",
    platformIcon: "TT",
    type: "Video",
    scheduledFor: "Tomorrow, 12:00 PM",
    status: "ready",
    thumbnail: "/content-4.jpg",
  },
];

const statusConfig = {
  ready: { label: "Ready", variant: "default" as const },
  processing: { label: "Processing", variant: "secondary" as const },
  draft: { label: "Draft", variant: "outline" as const },
};

export function ContentQueue() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="font-serif text-lg">Content Queue</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Calendar className="size-4 mr-2" />
          View Calendar
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {queueItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative size-14 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                  <span className="text-xs font-bold text-primary/40">
                    {item.platformIcon}
                  </span>
                </div>
              </div>

              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {item.platform}
                  </span>
                  <span className="text-muted-foreground/50">{"/"}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Schedule & Status */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {item.scheduledFor}
                </div>
                <Badge variant={statusConfig[item.status].variant}>
                  {statusConfig[item.status].label}
                </Badge>
              </div>

              {/* Actions */}
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full bg-transparent">
            View All Scheduled Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
