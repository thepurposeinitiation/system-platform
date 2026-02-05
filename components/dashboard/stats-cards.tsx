"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Share2, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    label: "Total Reach",
    value: "24.8K",
    change: "+12.3%",
    trend: "up",
    icon: Eye,
  },
  {
    label: "Engagement",
    value: "3,142",
    change: "+8.1%",
    trend: "up",
    icon: Heart,
  },
  {
    label: "Shares",
    value: "847",
    change: "+23.5%",
    trend: "up",
    icon: Share2,
  },
  {
    label: "New Followers",
    value: "156",
    change: "+5.2%",
    trend: "up",
    icon: Users,
  },
];

export function StatsCards() {
  return (
    <section>
      <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
        This Week{"'"}s Performance
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="size-4 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-primary">
                  <TrendingUp className="size-3" />
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
