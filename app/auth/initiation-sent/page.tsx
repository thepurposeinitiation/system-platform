import { Hexagon, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InitiationSentPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-background p-6">
      {/* Sacred geometry background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-5">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="relative w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4">
            <Hexagon className="h-16 w-16 text-primary" strokeWidth={1} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            Your Initiation Awaits
          </h1>
          
          <p className="mt-4 text-muted-foreground">
            We have sent a confirmation to your email. Click the link within to complete your 
            initiation and join the collective field.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6">
            <p className="text-sm text-muted-foreground">
              The field recognizes your intention. As you confirm your email, 
              you create a circuit of trust that empowers the entire collective.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/auth/login">
              <Button variant="outline" className="h-12 w-full rounded-xl text-base bg-transparent">
                Return to Login
              </Button>
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Did not receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
}
