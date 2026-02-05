"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Calendar,
  Clock,
  Globe,
  Send,
  CheckCircle2,
  Circle,
  ChevronDown,
  Eye,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ScheduledPost {
  id: string;
  contentName: string;
  platforms: string[];
  scheduledTime: Date;
  status: "scheduled" | "published" | "pending";
  engagement?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  platforms: string[];
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
};

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function DistributionFlow() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      contentName: "Morning Meditation Guide",
      platforms: ["instagram", "tiktok"],
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: "scheduled",
    },
    {
      id: "2",
      contentName: "Leadership Talk Episode 12",
      platforms: ["instagram", "tiktok"],
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "scheduled",
    },
    {
      id: "3",
      contentName: "Weekly Affirmations",
      platforms: ["instagram"],
      scheduledTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "published",
      engagement: {
        views: 12400,
        likes: 890,
        comments: 45,
        shares: 67,
      },
    },
  ]);

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: "1",
      name: "Auto-optimize for TikTok",
      description: "Automatically crop and add captions for TikTok format",
      enabled: true,
      platforms: ["tiktok"],
    },
    {
      id: "2",
      name: "Peak Time Distribution",
      description: "Schedule posts for optimal engagement times",
      enabled: true,
      platforms: ["instagram", "tiktok"],
    },
    {
      id: "3",
      name: "Cross-Platform Sync",
      description: "Publish to all connected platforms simultaneously",
      enabled: false,
      platforms: ["instagram", "tiktok"],
    },
  ]);

  const [openSections, setOpenSections] = useState<string[]>(["scheduled", "automation"]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const toggleAutomation = (id: string) => {
    setAutomationRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const upcomingPosts = scheduledPosts.filter((p) => p.status === "scheduled");
  const publishedPosts = scheduledPosts.filter((p) => p.status === "published");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-medium text-foreground">
            Distribution Flow
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Automated content delivery across your connected channels
          </p>
        </div>
        <Button className="min-h-[44px] gap-2">
          <Calendar className="w-4 h-4" />
          Schedule Content
        </Button>
      </div>

      {/* Distribution Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Scheduled", value: upcomingPosts.length, icon: Clock, color: "text-primary" },
          { label: "Published Today", value: "3", icon: Send, color: "text-primary" },
          { label: "Total Reach", value: "45.2K", icon: Globe, color: "text-primary" },
          { label: "Avg. Engagement", value: "8.4%", icon: Heart, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Scheduled Posts */}
      <Collapsible open={openSections.includes("scheduled")}>
        <Card>
          <CollapsibleTrigger asChild onClick={() => toggleSection("scheduled")}>
            <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Scheduled Posts ({upcomingPosts.length})
                </CardTitle>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openSections.includes("scheduled") ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {upcomingPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{post.contentName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-muted-foreground">
                              {platformIcons[platform]}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.scheduledTime)}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      <Circle className="w-2 h-2 mr-1 fill-current text-amber-500" />
                      Scheduled
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Automation Rules */}
      <Collapsible open={openSections.includes("automation")}>
        <Card>
          <CollapsibleTrigger asChild onClick={() => toggleSection("automation")}>
            <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Automation Rules
                </CardTitle>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openSections.includes("automation") ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {automationRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{rule.name}</p>
                        <div className="flex items-center gap-1">
                          {rule.platforms.map((platform) => (
                            <span key={platform} className="text-muted-foreground">
                              {platformIcons[platform]}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                    </div>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleAutomation(rule.id)}
                      className="shrink-0"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Recently Published */}
      {publishedPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Recently Published
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {publishedPosts.map((post) => (
                <div key={post.id} className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{post.contentName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-muted-foreground">
                              {platformIcons[platform]}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.scheduledTime)}
                        </span>
                      </div>
                    </div>
                    <Badge variant="default" className="shrink-0 bg-primary/20 text-primary hover:bg-primary/30">
                      Published
                    </Badge>
                  </div>

                  {/* Engagement Stats */}
                  {post.engagement && (
                    <div className="grid grid-cols-4 gap-2 ml-14">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {formatNumber(post.engagement.views)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="w-3 h-3" />
                        {formatNumber(post.engagement.likes)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageCircle className="w-3 h-3" />
                        {formatNumber(post.engagement.comments)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Share className="w-3 h-3" />
                        {formatNumber(post.engagement.shares)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Flow Status Indicator */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Send className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Distribution Engine Active</p>
              <p className="text-sm text-muted-foreground">
                Your content is flowing automatically to Instagram and TikTok based on your automation rules.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
