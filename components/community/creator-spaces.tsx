"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  BookOpen,
  Sparkles,
  MessageSquare,
  Heart,
  Play,
  ChevronRight,
  Plus,
  Star,
  Clock,
} from "lucide-react";

interface CreatorSpace {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  tagline: string;
  type: "coach" | "artist" | "leader" | "healer" | "educator";
  offerings: Offering[];
  followers: number;
  coherenceScore: number;
  isVerified: boolean;
}

interface Offering {
  id: string;
  title: string;
  type: "course" | "session" | "community" | "download" | "live";
  price: number | "free";
  description: string;
  enrollments: number;
}

export function CreatorSpaces() {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);

  const featuredSpaces: CreatorSpace[] = [
    {
      id: "1",
      name: "Maya Rivers",
      avatar: "",
      initials: "MR",
      tagline: "Embodied Movement & Authentic Expression",
      type: "artist",
      coherenceScore: 0.94,
      followers: 2847,
      isVerified: true,
      offerings: [
        {
          id: "1a",
          title: "Dance Your Truth",
          type: "course",
          price: 147,
          description: "8-week journey into embodied authentic expression",
          enrollments: 342,
        },
        {
          id: "1b",
          title: "Weekly Movement Circle",
          type: "live",
          price: "free",
          description: "Community practice every Sunday",
          enrollments: 89,
        },
      ],
    },
    {
      id: "2",
      name: "Jordan Chen",
      avatar: "",
      initials: "JC",
      tagline: "Conscious Leadership & Business Alignment",
      type: "leader",
      coherenceScore: 0.91,
      followers: 4521,
      isVerified: true,
      offerings: [
        {
          id: "2a",
          title: "Lead from Within",
          type: "course",
          price: 297,
          description: "Transform your leadership through self-awareness",
          enrollments: 567,
        },
        {
          id: "2b",
          title: "1:1 Alignment Session",
          type: "session",
          price: 250,
          description: "Personal guidance for your next evolution",
          enrollments: 124,
        },
      ],
    },
    {
      id: "3",
      name: "Elena Starlight",
      avatar: "",
      initials: "ES",
      tagline: "Sound Healing & Frequency Medicine",
      type: "healer",
      coherenceScore: 0.96,
      followers: 1923,
      isVerified: true,
      offerings: [
        {
          id: "3a",
          title: "Sonic Attunement Library",
          type: "download",
          price: 47,
          description: "12 healing frequency recordings",
          enrollments: 891,
        },
        {
          id: "3b",
          title: "Healer's Inner Circle",
          type: "community",
          price: 33,
          description: "Monthly membership with live sessions",
          enrollments: 156,
        },
      ],
    },
  ];

  const getTypeColor = (type: CreatorSpace["type"]) => {
    switch (type) {
      case "coach":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "artist":
        return "bg-pink-500/10 text-pink-600 border-pink-200";
      case "leader":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "healer":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "educator":
        return "bg-indigo-500/10 text-indigo-600 border-indigo-200";
    }
  };

  const getOfferingIcon = (type: Offering["type"]) => {
    switch (type) {
      case "course":
        return BookOpen;
      case "session":
        return Users;
      case "community":
        return MessageSquare;
      case "download":
        return Sparkles;
      case "live":
        return Play;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-serif font-semibold text-foreground">
            Creator Spaces
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover offerings from aligned creators in our community
          </p>
        </div>
        <Button className="gap-2 min-h-[44px]">
          <Plus className="w-4 h-4" />
          Create Your Space
        </Button>
      </div>

      {/* Featured Creators Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredSpaces.map((space) => (
          <Card
            key={space.id}
            className={`overflow-hidden transition-all cursor-pointer ${
              selectedSpace === space.id
                ? "ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() =>
              setSelectedSpace(selectedSpace === space.id ? null : space.id)
            }
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={space.avatar || "/placeholder.svg"} alt={space.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {space.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {space.name}
                    </h3>
                    {space.isVerified && (
                      <Star className="w-4 h-4 text-primary fill-primary shrink-0" />
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize mt-1 ${getTypeColor(
                      space.type
                    )}`}
                  >
                    {space.type}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-balance">
                {space.tagline}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Stats Row */}
              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  <span>{space.followers.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    {Math.round(space.coherenceScore * 100)}% coherence
                  </span>
                </div>
              </div>

              {/* Offerings Preview */}
              <div className="space-y-2">
                {space.offerings.slice(0, 2).map((offering) => {
                  const Icon = getOfferingIcon(offering.type);
                  return (
                    <div
                      key={offering.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {offering.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {offering.price === "free"
                            ? "Free"
                            : `$${offering.price}`}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                className="w-full mt-3 text-primary hover:text-primary min-h-[44px]"
              >
                View Full Space
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Your Space CTA */}
      <Card className="border-dashed border-2 bg-secondary/30">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-serif font-semibold text-foreground mb-1">
                Share Your Gifts with the Community
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg text-balance">
                Create your own space to offer courses, sessions, communities,
                and digital offerings. Be financially supported while serving
                your true purpose.
              </p>
            </div>
            <Button size="lg" className="gap-2 min-h-[48px] shrink-0">
              <Plus className="w-4 h-4" />
              Create Space
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
