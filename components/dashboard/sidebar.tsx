"use client";

import React from "react"

import { cn } from "@/lib/utils";
import {
  BarChart3,
  Compass,
  Crown,
  FolderOpen,
  Home,
  Layers,
  Send,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/", active: true },
  { icon: Video, label: "Content Studio", href: "/studio" },
  { icon: Layers, label: "Repurpose", href: "/repurpose" },
  { icon: Send, label: "Distribution", href: "/distribute" },
  { icon: FolderOpen, label: "Media Library", href: "/library" },
  { icon: BarChart3, label: "Insights", href: "/insights" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: Compass, label: "Discover", href: "/discover" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar h-[calc(100vh-64px)] sticky top-16">
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>
      </nav>

      {/* Upgrade Card */}
      <div className="p-4">
        <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="size-5 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              Upgrade to Pro
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Unlock unlimited distribution, advanced analytics, and priority
            support.
          </p>
          <button
            type="button"
            className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Plans
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="border-t border-border p-4">
        {bottomItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </div>
    </aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="size-5" />
      {label}
    </button>
  );
}
