"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  X,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Home,
  Upload,
  Users,
  Sparkles,
  LayoutGrid,
  Eye,
} from "lucide-react";

interface MainNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MainNavigation({
  activeSection,
  onSectionChange,
}: MainNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "portal", label: "Portal", icon: Upload, description: "Content intake & distribution" },
    { id: "community", label: "Community", icon: Users, description: "Connect & discover" },
    { id: "spaces", label: "Spaces", icon: LayoutGrid, description: "Courses & offerings" },
    { id: "consciousness", label: "Field", icon: Eye, description: "Unified awareness" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => onSectionChange("portal")}
          >
            {/* Sacred Geometry Logo Mark */}
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-primary"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/60"
                />
                <circle
                  cx="20"
                  cy="12"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/40"
                />
                <circle
                  cx="26.93"
                  cy="16"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/40"
                />
                <circle
                  cx="26.93"
                  cy="24"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/40"
                />
                <circle
                  cx="20"
                  cy="28"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/40"
                />
                <circle
                  cx="13.07"
                  cy="24"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/40"
                />
                <circle
                  cx="13.07"
                  cy="16"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/40"
                />
                <circle cx="20" cy="20" r="2" fill="currentColor" className="text-primary" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-semibold text-foreground leading-tight">
                The Purpose Initiation
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Living Platform
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors min-h-[44px] ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Help */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex min-w-[44px] min-h-[44px]"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="sr-only">Help</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-11 w-11 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt="User avatar" />
                    <AvatarFallback className="bg-primary/20 text-primary font-medium">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center gap-3 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="User avatar" />
                    <AvatarFallback className="bg-primary/20 text-primary font-medium">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      Jordan Davis
                    </span>
                    <span className="text-xs text-muted-foreground">Creator Tier</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="min-h-[44px]">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Space</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="min-h-[44px]">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="min-h-[44px] text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden min-w-[44px] min-h-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors min-h-[48px] w-full text-left ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => {
                    onSectionChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div>{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
