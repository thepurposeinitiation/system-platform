import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FieldProvider } from "@/components/providers/field-provider";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Update last_active_at for field coherence calculations (ignore errors if profile doesn't exist yet)
  try {
    await supabase
      .from("profiles")
      .update({ last_active_at: new Date().toISOString() })
      .eq("id", user.id);
  } catch {
    // Profile may not exist yet, this is okay
  }

  return <FieldProvider>{children}</FieldProvider>;
}
