"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ExternalLink, Plus } from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    handle: "@conscious.creator",
    connected: true,
    followers: "12.4K",
    postsThisWeek: 8,
    engagement: 4.2,
    color: "bg-gradient-to-br from-pink-500 to-orange-400",
  },
  {
    name: "TikTok",
    handle: "@purposeinitiator",
    connected: true,
    followers: "8.7K",
    postsThisWeek: 12,
    engagement: 6.8,
    color: "bg-gradient-to-br from-gray-900 to-gray-700",
  },
  {
    name: "YouTube",
    handle: "Not connected",
    connected: false,
    followers: "-",
    postsThisWeek: 0,
    engagement: 0,
    color: "bg-gradient-to-br from-red-600 to-red-500",
  },
];

export function PlatformOverview() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="font-serif text-lg">
          Connected Platforms
        </CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="size-4 mr-2" />
          Add Platform
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className={`flex items-center gap-4 p-4 rounded-xl border ${
              platform.connected
                ? "bg-card border-border"
                : "bg-muted/30 border-dashed border-muted-foreground/30"
            }`}
          >
            {/* Platform Icon */}
            <div
              className={`size-12 rounded-xl ${platform.color} flex items-center justify-center text-white font-bold text-lg`}
            >
              {platform.name.charAt(0)}
            </div>

            {/* Platform Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">{platform.name}</h4>
                {platform.connected && (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Check className="size-3" />
                    Connected
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {platform.handle}
              </p>
            </div>

            {/* Stats */}
            {platform.connected ? (
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    {platform.followers}
                  </p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    {platform.postsThisWeek}
                  </p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="w-24">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      Engagement
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {platform.engagement}%
                    </span>
                  </div>
                  <Progress value={platform.engagement * 10} />
                </div>
              </div>
            ) : (
              <Button variant="outline" size="sm">
                <ExternalLink className="size-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
