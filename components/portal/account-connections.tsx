"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Plus,
  ExternalLink,
  RefreshCw,
  Settings,
  Unlink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlatformAccount {
  id: string;
  platform: string;
  handle: string;
  avatar?: string;
  followers: number;
  connected: boolean;
  lastSync?: string;
}

const platformConfig = {
  instagram: {
    name: "Instagram",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    textColor: "text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  tiktok: {
    name: "TikTok",
    color: "bg-black",
    textColor: "text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  youtube: {
    name: "YouTube",
    color: "bg-red-600",
    textColor: "text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  facebook: {
    name: "Facebook",
    color: "bg-blue-600",
    textColor: "text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    color: "bg-blue-700",
    textColor: "text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  x: {
    name: "X",
    color: "bg-black",
    textColor: "text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
};

function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function AccountConnections() {
  const [accounts, setAccounts] = useState<PlatformAccount[]>([
    {
      id: "1",
      platform: "instagram",
      handle: "@purposeflow",
      followers: 12400,
      connected: true,
      lastSync: "2 min ago",
    },
    {
      id: "2",
      platform: "tiktok",
      handle: "@purposeflow",
      followers: 45200,
      connected: true,
      lastSync: "5 min ago",
    },
  ]);

  const [syncing, setSyncing] = useState<string | null>(null);

  const availablePlatforms = Object.keys(platformConfig).filter(
    (key) => !accounts.some((acc) => acc.platform === key && acc.connected)
  );

  const handleSync = (accountId: string) => {
    setSyncing(accountId);
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, lastSync: "Just now" } : acc
        )
      );
      setSyncing(null);
    }, 1500);
  };

  const handleDisconnect = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, connected: false } : acc
      )
    );
  };

  const handleConnect = (platform: string) => {
    // Simulate OAuth connection
    const newAccount: PlatformAccount = {
      id: crypto.randomUUID(),
      platform,
      handle: `@purposeflow`,
      followers: Math.floor(Math.random() * 50000),
      connected: true,
      lastSync: "Just now",
    };
    setAccounts((prev) => [...prev, newAccount]);
  };

  const connectedAccounts = accounts.filter((acc) => acc.connected);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-medium text-foreground">
            Connected Platforms
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Link your social accounts to enable automated distribution
          </p>
        </div>

        {/* Add Platform */}
        {availablePlatforms.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-h-[44px] gap-2 bg-transparent">
                <Plus className="w-4 h-4" />
                Add Platform
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {availablePlatforms.map((key) => {
                const config = platformConfig[key as keyof typeof platformConfig];
                return (
                  <DropdownMenuItem
                    key={key}
                    className="min-h-[44px] gap-3"
                    onClick={() => handleConnect(key)}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${config.color} ${config.textColor} flex items-center justify-center`}
                    >
                      {config.icon}
                    </div>
                    <span>{config.name}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Connected Accounts Grid */}
      {connectedAccounts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {connectedAccounts.map((account) => {
            const config = platformConfig[account.platform as keyof typeof platformConfig];
            const isSyncing = syncing === account.id;

            return (
              <Card key={account.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Platform Header */}
                  <div
                    className={`${config.color} ${config.textColor} p-4 flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        {config.icon}
                      </div>
                      <div>
                        <p className="font-medium">{config.name}</p>
                        <p className="text-sm opacity-90">{account.handle}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>

                  {/* Account Stats */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-semibold text-foreground">
                          {formatFollowers(account.followers)}
                        </p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Last synced</p>
                        <p className="text-sm font-medium text-foreground">{account.lastSync}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 min-h-[44px]"
                        onClick={() => handleSync(account.id)}
                        disabled={isSyncing}
                      >
                        <RefreshCw
                          className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`}
                        />
                        {isSyncing ? "Syncing..." : "Sync Now"}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="min-w-[44px] min-h-[44px]">
                            <Settings className="w-4 h-4" />
                            <span className="sr-only">Platform settings</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="min-h-[44px]">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="min-h-[44px]">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="min-h-[44px] text-destructive focus:text-destructive"
                            onClick={() => handleDisconnect(account.id)}
                          >
                            <Unlink className="w-4 h-4 mr-2" />
                            Disconnect
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No platforms connected
            </h3>
            <p className="text-muted-foreground mb-4">
              Connect your first social platform to start distributing content
            </p>
          </CardContent>
        </Card>
      )}

      {/* Distribution Flow Indicator */}
      {connectedAccounts.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Unified Distribution Ready</p>
                <p className="text-sm text-muted-foreground">
                  Content you upload will be optimized and distributed to{" "}
                  {connectedAccounts.map((acc) => platformConfig[acc.platform as keyof typeof platformConfig].name).join(" and ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
