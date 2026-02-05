"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";

const communityMembers = [
  {
    name: "Maya Chen",
    role: "Movement Artist",
    avatar: "/avatar-1.jpg",
    initials: "MC",
    online: true,
  },
  {
    name: "Alex Rivera",
    role: "Vocal Coach",
    avatar: "/avatar-2.jpg",
    initials: "AR",
    online: true,
  },
  {
    name: "Sam Taylor",
    role: "Leadership Coach",
    avatar: "/avatar-3.jpg",
    initials: "ST",
    online: false,
  },
  {
    name: "Jordan Lee",
    role: "Visual Artist",
    avatar: "/avatar-4.jpg",
    initials: "JL",
    online: true,
  },
];

const recentActivity = [
  {
    user: "Maya Chen",
    action: "shared your reel",
    time: "2h ago",
    icon: Heart,
  },
  {
    user: "Alex Rivera",
    action: "commented on your post",
    time: "4h ago",
    icon: MessageCircle,
  },
  {
    user: "Sam Taylor",
    action: "started following you",
    time: "6h ago",
    icon: Heart,
  },
];

export function CommunitySection() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="font-serif text-lg">Community</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View All
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Online Members */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Active Now
          </p>
          <div className="flex items-center gap-2">
            {communityMembers
              .filter((m) => m.online)
              .map((member) => (
                <div key={member.name} className="relative group">
                  <Avatar className="size-10 border-2 border-card ring-2 ring-primary/20">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-primary border-2 border-card" />
                </div>
              ))}
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full bg-transparent"
            >
              <span className="text-xs text-muted-foreground">+12</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Recent Activity
          </p>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                  <activity.icon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
