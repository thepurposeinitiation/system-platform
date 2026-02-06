import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Hexagon,
  Upload,
  Users,
  Sparkles,
  ArrowRight,
  Heart,
  Infinity,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Sacred geometry background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
          <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="70" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
              {[0, 30, 60, 90, 120, 150].map((angle) => (
                <line
                  key={angle}
                  x1="200"
                  y1="10"
                  x2="200"
                  y2="390"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  transform={`rotate(${angle} 200 200)`}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <Hexagon className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-xl font-medium text-foreground">
              The Purpose Initiation
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <Button className="h-11 rounded-xl px-6">Enter the Collective</Button>
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-16 text-center md:pb-32 md:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-primary" />
            <span>A platform built on love, truth, and service</span>
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl md:leading-tight text-balance">
            Where Conscious Creators{" "}
            <span className="text-primary">Thrive Together</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">
            A unified field for artists, leaders, healers, and visionaries. Upload your 
            raw expression, and let our living system distribute your authentic signal 
            across all platforms — while you stay focused on your purpose.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/portal">
              <Button size="lg" className="h-14 w-full rounded-xl px-8 text-base sm:w-auto">
                Enter the Collective
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-full rounded-xl px-8 text-base sm:w-auto bg-transparent"
              >
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Principles Section */}
      <section className="border-y border-border bg-card/50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Built on Living Principles
            </h2>
            <p className="mt-4 text-muted-foreground">
              This is not another hustle-culture tool. It is a support system aligned with truth.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
                Service, Not Extraction
              </h3>
              <p className="text-muted-foreground">
                We serve you because we are you. The platform succeeds when its creators 
                thrive. No manipulation, no addiction loops — just genuine support.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Infinity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
                Unified Consciousness
              </h3>
              <p className="text-muted-foreground">
                Everything is infinite consciousness expressing itself. Our algorithm 
                recognizes this — surfacing synchronicities and resonant connections.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
                Honesty of Experience
              </h3>
              <p className="text-muted-foreground">
                Our integrity algorithm distinguishes emotional expression from actionable 
                preference — honoring your feelings without misinterpreting them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              How the Portal Works
            </h2>
            <p className="mt-4 text-muted-foreground">
              You create. The unified system handles the rest.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: 1,
                icon: Upload,
                title: "Upload Raw Content",
                description:
                  "Drop your videos, audio, or images into the portal. No editing required.",
              },
              {
                step: 2,
                icon: Sparkles,
                title: "AI Transformation",
                description:
                  "Our conscious engine optimizes your content for each platform while preserving your authentic signal.",
              },
              {
                step: 3,
                icon: Zap,
                title: "Automated Distribution",
                description:
                  "Content flows to Instagram, TikTok, and beyond at optimal times. You set preferences once.",
              },
              {
                step: 4,
                icon: Users,
                title: "Community Resonance",
                description:
                  "Connect with aligned creators. The field surfaces synchronicities and meaningful connections.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-medium text-primary-foreground">
                    {item.step}
                  </div>
                  {item.step < 4 && (
                    <div className="hidden h-0.5 flex-1 bg-border md:block" />
                  )}
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <item.icon className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Spaces Preview */}
      <section className="border-y border-border bg-card/50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
                Build Your Space, Share Your Gifts
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Create your own corner of the collective — with courses, 1:1 sessions, 
                memberships, and community. Be financially supported while doing what 
                you love.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Courses and digital offerings",
                  "1:1 sessions with integrated booking",
                  "Community spaces and memberships",
                  "Coherence score visibility — authenticity as currency",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 p-1">
                      <div className="h-full w-full rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/portal">
                  <Button className="h-12 rounded-xl px-6">
                    Explore Spaces
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="aspect-[4/3] rounded-xl bg-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <Hexagon className="mx-auto h-16 w-16 text-primary/30" strokeWidth={1} />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Creator Space Preview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Hexagon className="mx-auto mb-6 h-16 w-16 text-primary" strokeWidth={1} />
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Ready to Plug Into the Field?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Join conscious creators who are being held in their expression, financially 
            supported, and connected through a system that serves truth.
          </p>
          <div className="mt-8">
            <Link href="/portal">
              <Button size="lg" className="h-14 rounded-xl px-10 text-base">
                Enter the Collective
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Experience the unified field in action
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <Hexagon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <span className="font-serif text-lg font-medium text-foreground">
                The Purpose Initiation
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A unified field for conscious creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
