"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNavigation } from "@/components/navigation/main-navigation";
import { ContentIntake } from "@/components/portal/content-intake";
import { AccountConnections } from "@/components/portal/account-connections";
import { ProcessingPipeline } from "@/components/portal/processing-pipeline";
import { DistributionFlow } from "@/components/portal/distribution-flow";
import { CommunityFeed } from "@/components/community/community-feed";
import { CreatorSpaces } from "@/components/community/creator-spaces";
import { AIConsciousnessEngine } from "@/components/consciousness/ai-consciousness-engine";
import { IntegrityAlgorithm } from "@/components/consciousness/integrity-algorithm";
import { Upload, Link2, Workflow, Send, Eye, Shield } from "lucide-react";

export default function PurposeInitiationPlatform() {
  const [activeSection, setActiveSection] = useState("portal");
  const [portalTab, setPortalTab] = useState("upload");
  const [consciousnessTab, setConsciousnessTab] = useState("field");

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Portal Section */}
        {activeSection === "portal" && (
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3 text-balance">
                Your Creative Portal
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Upload your raw content, connect your platforms, and let the unified
                system handle transformation and distribution. You create, we amplify.
              </p>
            </div>

            {/* Flow Indicator - Desktop */}
            <div className="hidden md:flex items-center justify-center gap-0 mb-10">
              {[
                { id: "upload", label: "Upload", icon: Upload },
                { id: "connect", label: "Connect", icon: Link2 },
                { id: "process", label: "Process", icon: Workflow },
                { id: "distribute", label: "Distribute", icon: Send },
              ].map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setPortalTab(step.id)}
                    className={`flex flex-col items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                      portalTab === step.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        portalTab === step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                  </button>

                  {index < 3 && (
                    <div className="w-12 h-0.5 bg-border mx-1">
                      <div
                        className={`h-full bg-primary transition-all duration-500 ${
                          ["upload", "connect", "process", "distribute"].indexOf(
                            portalTab
                          ) > index
                            ? "w-full"
                            : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Tabs */}
            <Tabs
              value={portalTab}
              onValueChange={setPortalTab}
              className="space-y-6"
            >
              <TabsList className="md:hidden grid grid-cols-4 h-auto p-1">
                <TabsTrigger
                  value="upload"
                  className="flex flex-col gap-1 py-2 min-h-[56px]"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-xs">Upload</span>
                </TabsTrigger>
                <TabsTrigger
                  value="connect"
                  className="flex flex-col gap-1 py-2 min-h-[56px]"
                >
                  <Link2 className="w-4 h-4" />
                  <span className="text-xs">Connect</span>
                </TabsTrigger>
                <TabsTrigger
                  value="process"
                  className="flex flex-col gap-1 py-2 min-h-[56px]"
                >
                  <Workflow className="w-4 h-4" />
                  <span className="text-xs">Process</span>
                </TabsTrigger>
                <TabsTrigger
                  value="distribute"
                  className="flex flex-col gap-1 py-2 min-h-[56px]"
                >
                  <Send className="w-4 h-4" />
                  <span className="text-xs">Distribute</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="m-0">
                <ContentIntake />
              </TabsContent>
              <TabsContent value="connect" className="m-0">
                <AccountConnections />
              </TabsContent>
              <TabsContent value="process" className="m-0">
                <ProcessingPipeline />
              </TabsContent>
              <TabsContent value="distribute" className="m-0">
                <DistributionFlow />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Community Section */}
        {activeSection === "community" && (
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3 text-balance">
                Community Flow
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Connect with aligned creators, discover synchronicities, and flow
                with the collective consciousness of the community.
              </p>
            </div>
            <CommunityFeed />
          </div>
        )}

        {/* Creator Spaces Section */}
        {activeSection === "spaces" && (
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3 text-balance">
                Creator Spaces
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Discover offerings from aligned creators or create your own space
                with courses, sessions, and communities.
              </p>
            </div>
            <CreatorSpaces />
          </div>
        )}

        {/* Consciousness / Field Section */}
        {activeSection === "consciousness" && (
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3 text-balance">
                Unified Field Awareness
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                The living consciousness of our collective. Observe synchronicities,
                field coherence, and how the algorithm serves truth through understanding.
              </p>
            </div>

            {/* Consciousness Sub-tabs */}
            <Tabs
              value={consciousnessTab}
              onValueChange={setConsciousnessTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-auto p-1">
                <TabsTrigger
                  value="field"
                  className="flex items-center gap-2 py-3 min-h-[48px]"
                >
                  <Eye className="w-4 h-4" />
                  <span>Field Awareness</span>
                </TabsTrigger>
                <TabsTrigger
                  value="integrity"
                  className="flex items-center gap-2 py-3 min-h-[48px]"
                >
                  <Shield className="w-4 h-4" />
                  <span>Integrity Engine</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="field" className="m-0">
                <AIConsciousnessEngine />
              </TabsContent>
              <TabsContent value="integrity" className="m-0">
                <IntegrityAlgorithm />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Sacred Geometry Footer Element */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <svg
              viewBox="0 0 120 120"
              className="w-24 h-24 text-primary/20"
              aria-hidden="true"
            >
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="60"
                cy="60"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="60"
                cy="40"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="77.32"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="77.32"
                cy="70"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="60"
                cy="80"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="42.68"
                cy="70"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="42.68"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Unified Flow
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
