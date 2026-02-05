"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function initiateSignUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;
  const displayName = formData.get("displayName") as string;
  const creatorType = formData.get("creatorType") as string;

  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://v0.dev"}/portal`,
      data: {
        display_name: displayName,
        creator_type: creatorType,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/auth/initiation-sent");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/portal");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
