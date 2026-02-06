import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Sparkles, Target, Layers, Zap } from "lucide-react";

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="text-2xl font-serif font-bold text-foreground">
              The Purpose Initiation
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="rounded-xl">Home</Button>
              </Link>
              <Link href="/portal">
                <Button className="rounded-xl">Enter Portal</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Transformational Coaching Package
            </div>
            <h1 className="font-serif text-5xl font-bold leading-tight text-foreground lg:text-7xl text-balance">
              Turn Your Passion Into Your Purpose
            </h1>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed text-balance">
              A transformational coaching package designed to help you package your gifts into a thriving, sustainable service that honors who you truly are.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-14 rounded-xl px-8 text-base">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 rounded-xl px-8 text-base">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive">
                The Problem
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl text-balance">
                Living a Half-Fulfilled Life
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Too many talented creatives, coaches, and purpose-driven entrepreneurs find themselves trapped in work that doesn't light them up. They know they have gifts to share with the world, but they're stuck in the exhausting cycle of running a business that feels like a burden rather than a blessing.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                You might be an incredible dancer, a gifted singer, a natural leader, or a talented creative - but somewhere along the way, you stopped living in your joy. Instead, you became a slave to structure, forced marketing tactics, and a business model that drains rather than sustains you.
              </p>
            </div>
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                  What If You Could Live Fully in Your Passion?
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Express Your True Self</h4>
                      <p className="text-sm text-muted-foreground">
                        Lead from the love of your being, sharing your authentic gifts without compromise or hesitation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Enjoy Your Labor</h4>
                      <p className="text-sm text-muted-foreground">
                        Build a sustainable service where your work feels effortless because it flows from your passion.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Give Your Gifts</h4>
                      <p className="text-sm text-muted-foreground">
                        Serve humanity with what makes you come alive, creating genuine impact and fulfillment.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 lg:py-32 bg-accent/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Our Solution
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl text-balance">
              A Complete System for Passionate Living
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We've created a comprehensive coaching package that combines deep personal transformation with practical business systems. This isn't just about building a business... it's about refining your true signal, clarifying your identity, and creating a life where your passion and your livelihood are one.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Identity Refinement
                </h3>
                <p className="text-muted-foreground">
                  Discover and clarify your true self, your authentic signal, and the unique gifts only you can share with the world.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Layers className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Service Packaging
                </h3>
                <p className="text-muted-foreground">
                  Transform your passion into a compelling, sustainable service that allows others to benefit from your gifts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Automated Marketing
                </h3>
                <p className="text-muted-foreground">
                  Implement effortless outreach systems that work for you, so you can focus on what you love instead of forced tactics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl text-balance">
              The Transformation Journey
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
              Your path to thriving through four carefully designed phases
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { phase: "01", title: "Discover", subtitle: "Uncover your core message" },
              { phase: "02", title: "Refine", subtitle: "Clarify your unique identity" },
              { phase: "03", title: "Package", subtitle: "Design offerings that sell" },
              { phase: "04", title: "Automate", subtitle: "Scale reach with systems" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                    {item.phase}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.subtitle}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase Details */}
      <section className="py-24 lg:py-32 bg-accent/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-24">
            {/* Phase 1 & 2 */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Phase 1 & 2
                </div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Discover and Refine Your True Signal
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  In the first phase, we guide you to reconnect with who you truly are beneath the layers of expectation and conditioning. This isn't surface-level work - we're helping you identify your authentic signal, the unique frequency only you can broadcast to the world.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Then we refine that signal into a clear, powerful identity. Whether you're a creator, entertainer, coach, or founder, we help you articulate your essence in a way that attracts the right people and opportunities.
                </p>
              </div>
              <Card className="border-2">
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {[
                      "Deep identity work and self-discovery",
                      "Clarifying your unique gifts and perspective",
                      "Developing authentic leadership presence",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Phase 3 */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Card className="border-2 order-2 lg:order-1">
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {[
                      "Service Design: Create offerings that align with your passion",
                      "Communicate Value: Articulate your unique gifts",
                      "Sustainable Pricing: Charge in alignment with your worth",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <div className="order-1 lg:order-2">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Phase 3
                </div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Package Your Passion Into a Sustainable Service
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Once you're clear on your true signal, we help you package your passion into a service that serves others while sustaining you. This is where your inner world meets practical reality - where your gifts become your livelihood.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You'll learn how to structure your offerings in a way that honors your energy, attracts ideal clients, and creates genuine transformation for those you serve.
                </p>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Phase 4
                </div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Automate Your Marketing, Amplify Your Impact
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Here's where everything comes together. We implement marketing & outreach systems that work for you automatically, so you never have to feel like a slave to forced outreach or exhausting promotional tactics.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Your marketing becomes an extension of your authentic signal - effortless, natural, and aligned. Instead of constantly hustling for clients, you'll have systems that consistently attract the right people.
                </p>
              </div>
              <Card className="border-2">
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {[
                      "Automated Systems: Set up once, then let them work for you",
                      "Authentic Outreach: Marketing that feels natural",
                      "Consistent Flow: Ideal clients find you",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl text-balance">
              Everything You Need to Thrive as Your True Self
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Personal Coaching", description: "Deep, transformational work to refine your identity and clarify your true signal" },
              { title: "Service Design Package", description: "Step-by-step guidance to package your passion into a sustainable offering" },
              { title: "Marketing Systems", description: "Done-with-you systems that attract ideal clients while you focus on your craft" },
              { title: "Ongoing Support", description: "Community and guidance as you step fully into living your purpose" },
            ].map((item, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl text-balance mb-6">
            Your Life Is Waiting
          </h2>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-8">
            Stop Living Half-Fulfilled
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            You weren't meant to spend your life in work that doesn't honor who you truly are. Your passion isn't a luxury—it's your compass, your gift to the world, and the foundation for a life of genuine fulfillment.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Imagine waking up every day excited to share your gifts. Imagine building a service that sustains you financially while feeding your soul. Imagine business that feels effortless because it flows from your authentic self.
          </p>
          <p className="text-xl font-semibold text-foreground mb-10">
            This is possible. This is what we help you create.
          </p>
          <Button size="lg" className="h-16 rounded-xl px-10 text-lg">
            Begin Your Transformation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 The Purpose Initiation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
