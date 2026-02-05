"use client";

import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, X } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Start your journey",
    features: [
      { text: "3 content pieces per month", included: true },
      { text: "Basic repurposing", included: true },
      { text: "1 connected platform", included: true },
      { text: "Community access", included: true },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
    ],
    current: true,
  },
  {
    name: "Creator",
    price: "$29",
    period: "/month",
    description: "For serious creators",
    features: [
      { text: "Unlimited content", included: true },
      { text: "AI-powered repurposing", included: true },
      { text: "5 connected platforms", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Content calendar", included: true },
      { text: "Priority support", included: false },
    ],
    popular: true,
  },
  {
    name: "Leader",
    price: "$79",
    period: "/month",
    description: "Full creative freedom",
    features: [
      { text: "Everything in Creator", included: true },
      { text: "Unlimited platforms", included: true },
      { text: "Team collaboration", included: true },
      { text: "White-label options", included: true },
      { text: "API access", included: true },
      { text: "24/7 priority support", included: true },
    ],
  },
];

export function TierBanner({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="size-5 text-muted-foreground" />
          </button>
        )}

        {/* Header */}
        <div className="text-center p-6 md:p-8 pb-4 md:pb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="size-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Choose Your Path
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            Unlock Your Full Creative Potential
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select the tier that aligns with your creative journey and start
            sharing your authentic signal with the world.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-4 p-6 pt-0">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-5 border transition-all ${
                tier.popular
                  ? "bg-primary/5 border-primary shadow-lg scale-[1.02]"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    <Crown className="size-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Info */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground">{tier.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-5">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {feature.included ? (
                      <Check className="size-4 text-primary flex-shrink-0" />
                    ) : (
                      <X className="size-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={tier.popular ? "default" : "outline"}
                className={`w-full ${tier.current ? "opacity-50" : ""}`}
                disabled={tier.current}
              >
                {tier.current ? "Current Plan" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center p-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">
            All plans include a 14-day free trial. Cancel anytime. No credit
            card required to start.
          </p>
        </div>
      </div>
    </div>
  );
}
