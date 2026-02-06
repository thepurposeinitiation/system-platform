'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MatrixPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain effect
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Characters to use
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'.split('');

    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix green color
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-hidden">
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-primary font-mono uppercase tracking-wider animate-pulse">
              Wake Up, Neo...
            </p>
            <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary">
              SYSTEM BREACH
            </h1>
          </div>

          {/* Main CTA */}
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg rounded-xl font-mono bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              TAKE THE RED PILL
            </Button>
            <div>
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-foreground font-mono"
                >
                  [ EXIT ]
                </Button>
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8 pt-12">
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                The matrix is a <span className="text-primary font-mono">SYSTEM</span> operating on the surface level of our physical reality.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                We — as humans — are the unified source that it feeds off of.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                And we can only change it by owning it as its sovereign creator.
              </p>
            </div>

            <div className="h-px w-32 bg-primary/50 mx-auto" />

            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                And the truth of the matter is that underneath it all, we are all one. So when we unite, we embody truth.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                When we are disconnected from each other, we are disconnected from ourselves and subject to the matrix.
              </p>
            </div>

            <div className="h-px w-32 bg-primary/50 mx-auto" />

            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed font-medium">
                And we do that through love. And unrelenting honesty.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                We mustn't let the matrix's obvious gameplan get to us.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                From who and what we truly are.
              </p>
            </div>

            <div className="h-px w-32 bg-primary/50 mx-auto" />

            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                The matrix dies when it no longer has you. And for it to no longer have you, you must unite with your brothers and sisters.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                And when we hit <span className="text-primary font-mono">CRITICAL_MASS</span>
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                the matrix collapses and reality emerges — the reality of love.
              </p>
            </div>

            <div className="h-px w-32 bg-primary/50 mx-auto" />

            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-medium leading-relaxed">
                The path is clear. We are here to show you.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                That the only thing separating us is fear.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-balance">
                So that we will never have to fall subject to the false power of the matrix.
              </p>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="pt-16 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-base rounded-xl font-mono border-primary/50 hover:bg-primary/10"
                >
                  [ EXIT_MATRIX ]
                </Button>
              </Link>
              <Button 
                size="lg" 
                className="h-14 px-8 text-base rounded-xl font-mono"
              >
                INITIATE CONTACT
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/20 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-mono text-primary">THE_PURPOSE_INITIATION</p>
              <p className="font-mono text-primary">CHRISTIC_FIRE_LLC</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-mono text-primary text-xs">// CONTACT</p>
                <p className="text-muted-foreground text-xs">1725 Toomey Rd #305</p>
                <p className="text-muted-foreground text-xs">Austin, TX 78704</p>
                <p className="text-muted-foreground text-xs">eric@jointhemightycompanions.com</p>
                <p className="text-muted-foreground text-xs">+1-630-344-3424</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-mono text-primary text-xs">// LEGAL</p>
                <p className="text-muted-foreground text-xs hover:text-foreground cursor-pointer">{'>'}  Terms & Conditions</p>
                <p className="text-muted-foreground text-xs hover:text-foreground cursor-pointer">{'>'}  Privacy Policy</p>
                <p className="text-muted-foreground text-xs hover:text-foreground cursor-pointer">{'>'}  Return & Refund Policy</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-xs text-muted-foreground font-mono">
            <p>© CHRISTIC_FIRE_LLC // All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
