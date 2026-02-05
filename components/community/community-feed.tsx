"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Users,
  MessageSquare,
  Heart,
  Search,
  Filter,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Bell,
} from "lucide-react";

interface CommunityMember {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  role: string;
  type: "creator" | "supporter" | "leader";
  coherenceResonance: number;
  sharedInterests: string[];
  isOnline: boolean;
}

interface FeedItem {
  id: string;
  author: {
    name: string;
    initials: string;
    avatar: string;
  };
  content: string;
  type: "post" | "offering" | "milestone" | "synchronicity";
  timestamp: Date;
  engagement: {
    hearts: number;
    comments: number;
  };
  coherenceBoost: number;
}

export function CommunityFeed() {
  const [searchQuery, setSearchQuery] = useState("");

  const suggestedConnections: CommunityMember[] = [
    {
      id: "1",
      name: "Aria Sun",
      initials: "AS",
      avatar: "",
      role: "Voice Coach & Song Writer",
      type: "creator",
      coherenceResonance: 0.89,
      sharedInterests: ["Authentic Expression", "Sound", "Creativity"],
      isOnline: true,
    },
    {
      id: "2",
      name: "Marcus Light",
      initials: "ML",
      avatar: "",
      role: "Conscious Marketing Guide",
      type: "leader",
      coherenceResonance: 0.85,
      sharedInterests: ["Leadership", "Strategy", "Alignment"],
      isOnline: false,
    },
    {
      id: "3",
      name: "Luna Heart",
      initials: "LH",
      avatar: "",
      role: "Community Supporter",
      type: "supporter",
      coherenceResonance: 0.92,
      sharedInterests: ["Connection", "Growth", "Service"],
      isOnline: true,
    },
  ];

  const feedItems: FeedItem[] = [
    {
      id: "1",
      author: { name: "Maya Rivers", initials: "MR", avatar: "" },
      content:
        "Just completed my first content batch through the portal. The automation handled everything beautifully - 12 pieces distributed across platforms while I focused on creating. This is what aligned support looks like.",
      type: "milestone",
      timestamp: new Date(Date.now() - 3600000),
      engagement: { hearts: 47, comments: 12 },
      coherenceBoost: 0.02,
    },
    {
      id: "2",
      author: { name: "Jordan Chen", initials: "JC", avatar: "" },
      content:
        "New offering available: 'Lead from Within' - a 6-week journey for conscious leaders ready to align their business with their deeper purpose. Early enrollment open for community members.",
      type: "offering",
      timestamp: new Date(Date.now() - 7200000),
      engagement: { hearts: 89, comments: 24 },
      coherenceBoost: 0.03,
    },
    {
      id: "3",
      author: { name: "System", initials: "PI", avatar: "" },
      content:
        "Synchronicity detected: 5 creators independently posted about 'returning to simplicity' this morning. The collective is speaking - what wisdom wants to emerge through you today?",
      type: "synchronicity",
      timestamp: new Date(Date.now() - 10800000),
      engagement: { hearts: 134, comments: 31 },
      coherenceBoost: 0.05,
    },
  ];

  const getTypeColor = (type: FeedItem["type"]) => {
    switch (type) {
      case "post":
        return "bg-secondary text-foreground";
      case "offering":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "milestone":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "synchronicity":
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getMemberTypeColor = (type: CommunityMember["type"]) => {
    switch (type) {
      case "creator":
        return "bg-pink-500/10 text-pink-600 border-pink-200";
      case "supporter":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "leader":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search the community..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 min-h-[44px]"
          />
        </div>
        <Button variant="outline" className="gap-2 min-h-[44px] bg-transparent">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
        <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px] relative bg-transparent">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-semibold text-foreground">
              Community Flow
            </h2>
            <Button variant="ghost" size="sm" className="text-primary min-h-[44px]">
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending
            </Button>
          </div>

          {feedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                    <AvatarFallback
                      className={`font-medium ${
                        item.type === "synchronicity"
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {item.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-foreground">
                        {item.author.name}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs capitalize ${getTypeColor(item.type)}`}
                      >
                        {item.type}
                      </Badge>
                      {item.coherenceBoost > 0 && (
                        <span className="text-xs text-primary flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />+
                          {Math.round(item.coherenceBoost * 100)}% field
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        type="button"
                        className="flex items-center gap-1 text-muted-foreground hover:text-pink-500 transition-colors min-h-[44px]"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{item.engagement.hearts}</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">{item.engagement.comments}</span>
                      </button>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatTimeAgo(item.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full min-h-[44px] bg-transparent">
            Load More
          </Button>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Suggested Connections */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-serif flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Resonant Connections
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Based on field coherence alignment
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suggestedConnections.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      {member.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">
                          {member.name}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs capitalize ${getMemberTypeColor(
                            member.type
                          )}`}
                        >
                          {member.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {member.role}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(member.coherenceResonance * 100)}% resonance
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 min-h-[44px] min-w-[44px]">
                      <ChevronRight className="w-4 h-4" />
                      <span className="sr-only">View profile</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-serif font-bold text-foreground">
                    2,847
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active Creators
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-serif font-bold text-foreground">
                    156
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Live Offerings
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-serif font-bold text-foreground">
                    89%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Field Coherence
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-serif font-bold text-foreground">
                    34
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Today&apos;s Syncs
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
