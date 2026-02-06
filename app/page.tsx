import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#faf8f5', color: '#1a1816' }}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10" style={{ 
        background: 'linear-gradient(to bottom, #faf8f5, #faf8f5, rgba(230, 225, 215, 0.2))' 
      }} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main headline */}
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
              into what's holding you back
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
              THE PURPOSE
              <br />
              <span className="text-primary">INITIATION</span>
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="#transformation">
              <Button size="lg" className="h-14 px-8 text-base rounded-xl min-w-[220px]">
                Start Your Transformation
              </Button>
            </Link>
            <Link href="/matrix">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base rounded-xl min-w-[220px] bg-transparent border-primary/50 hover:bg-primary/10"
              >
                EXIT MATRIX
              </Button>
            </Link>
          </div>

          {/* Subheading */}
          <div className="pt-12 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              Emitting a signal so clean that everything falls under one and the same category:
            </p>
            <p className="text-xl md:text-2xl font-medium mt-6 text-balance">
              We do that by breaking the matrix of illusory paradigms
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 text-balance">
              Come. Let's break it together
            </p>
          </div>

          <div className="pt-8">
            <p className="text-base md:text-lg text-foreground font-medium">
              You who are ready for radical ownership of what you want
            </p>
            <p className="text-base md:text-lg text-foreground font-medium mt-2">
              And to stop lying to yourself
            </p>
          </div>

          <div className="pt-4">
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl">
              Book Your Call
            </Button>
          </div>
        </div>
      </section>

      {/* The Journey - 4 Phases */}
      <section id="transformation" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Phase 01 */}
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary/60">01</div>
              <h3 className="font-serif text-2xl font-semibold">The First Shift</h3>
              <p className="text-xl font-medium text-primary">Clarity Breaks Through</p>
              <p className="text-muted-foreground leading-relaxed">
                "I finally know what I actually want."
              </p>
            </div>

            {/* Phase 02 */}
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary/60">02</div>
              <h3 className="font-serif text-2xl font-semibold">Fear Activated</h3>
              <p className="text-xl font-medium text-primary">The Threshold</p>
              <p className="text-muted-foreground leading-relaxed">
                Fear of letting go of the old identity. Fear that honoring truth will require changing everything.
              </p>
            </div>

            {/* Phase 03 */}
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary/60">03</div>
              <h3 className="font-serif text-2xl font-semibold">The Embodiment Phase</h3>
              <p className="text-xl font-medium text-primary">Expression → Embodiment</p>
              <p className="text-muted-foreground leading-relaxed">
                Truth becomes a lived reality instead of a hidden idea.
              </p>
            </div>

            {/* Phase 04 */}
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary/60">04</div>
              <h3 className="font-serif text-2xl font-semibold">The Dream Outcome</h3>
              <p className="text-xl font-medium text-primary">Purpose Emerges</p>
              <p className="text-muted-foreground leading-relaxed">
                Purpose emerges naturally. Life feels aligned, alive, meaningful, inspired.
              </p>
            </div>
          </div>

          {/* Journey progression labels */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>Confusion</span>
            <span>→</span>
            <span>Awareness</span>
            <span>→</span>
            <span>Expression</span>
            <span>→</span>
            <span>Embodiment</span>
            <span>→</span>
            <span className="font-semibold text-primary">Purpose</span>
          </div>
        </div>
      </section>

      {/* The Guides Section */}
      <section className="py-24 px-6 border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-lg text-muted-foreground mb-4">
              Three guides united by a shared mission: to help you discover your purpose and live it fully.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Jon */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-muted/50 mb-6" />
              <h3 className="font-serif text-2xl font-semibold">Jon</h3>
              <p className="text-primary font-medium">Guide and Co-Founder</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Jon's journey began in the depths of childhood trauma. Through radical ownership, something extraordinary opened—the intuitive sight of the Soul. Awakening cracked him wide open: he began experiencing heightened perception, and the ability to mirror the truth of a person's being with precision. His gift is illumination. Jon sees what others can't—or won't—see: the unconscious patterns and shadows that quietly limit a person's life. Those willing to step into his field experience profound clarity, liberation, and a direct encounter with themselves. He carries himself like a firebreathing dragon of truth: he is relentlessly honest and loving at the same time.
              </p>
            </div>

            {/* Eric */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-muted/50 mb-6" />
              <h3 className="font-serif text-2xl font-semibold">Eric</h3>
              <p className="text-primary font-medium">CEO and Co-Founder</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Eric's spiritual path began at 20 after a profound mystical awakening led him into 7 years of deep meditation and self-realization. Despite early corporate success, he felt unfulfilled... and three years of chronic, full body, eczema and psoriasis became the catalyst for a deep initiation. Through radical expression and the guidance of the Holy Spirit, Eric realized his symptoms were messages calling him back into alignment. As he healed, he surrendered his old life, leaving behind every dollar and possession, and committed himself fully to service. Today, Eric helps high performers reconnect with their soul, express their truth, and live their purpose.
              </p>
            </div>

            {/* Camden */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-muted/50 mb-6" />
              <h3 className="font-serif text-2xl font-semibold">Camden</h3>
              <p className="text-primary font-medium">Clarity Architect and Co-Founder</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Camden is relentlessly curious and unafraid to burn it all down for truth. After chasing meaning through knowledge and self-improvement, he chose devotion — trusting that love and God are the only things that actually satisfy.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-muted-foreground">
              We want to give love and receive love... and our ultimate way of doing that is to offer clarity and wisdom so you can practically do so yourself, and never deviate from YOUR soul's calling:
            </p>
            <p className="text-xl font-medium mt-6">
              And together we can go deeper than ever
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            The version of you who has already won in all aspects of life is waiting on the other side of this conversation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-base rounded-xl min-w-[220px]">
              Start Your Transformation
            </Button>
            <Link href="/matrix">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base rounded-xl min-w-[220px] bg-transparent border-primary/50 hover:bg-primary/10"
              >
                EXIT MATRIX
              </Button>
            </Link>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            <p>Eric: +1-630-344-3424</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© Christic Fire LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
