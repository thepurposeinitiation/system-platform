"use client";

import { createClient } from "@/lib/supabase/client";
import type { FieldPulse, Synchronicity, CollectiveFieldState } from "@/lib/types/database";
import { useEffect, useState, useCallback } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";

// Hook to subscribe to the collective field state
export function useCollectiveField() {
  const [fieldState, setFieldState] = useState<CollectiveFieldState>({
    collective_coherence: 50,
    active_beings: 0,
    recent_pulses: [],
    recent_synchronicities: [],
    field_mood: "stable",
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel;

    async function initializeField() {
      try {
        // Fetch initial field state
        const { data: pulses } = await supabase
          .from("field_pulses")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20);

        const { data: synchronicities } = await supabase
          .from("synchronicities")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        // Count active beings (users active in last hour)
        const { count: activeBeings } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .gte("last_active_at", new Date(Date.now() - 3600000).toISOString());

        // Calculate collective coherence from active users
        const { data: coherenceData } = await supabase
          .from("profiles")
          .select("coherence_score")
          .gte("last_active_at", new Date(Date.now() - 86400000).toISOString());

        const avgCoherence = coherenceData?.length
          ? coherenceData.reduce((sum, p) => sum + (p.coherence_score || 50), 0) / coherenceData.length
          : 50;

        // Determine field mood based on recent activity
        const recentPulseCount = pulses?.filter(
          (p) => new Date(p.created_at).getTime() > Date.now() - 3600000
        ).length || 0;

        let mood: CollectiveFieldState["field_mood"] = "stable";
        if (recentPulseCount > 10) mood = "expanding";
        else if (recentPulseCount < 2) mood = "contracting";
        else if (synchronicities && synchronicities.length > 0) mood = "transitioning";

        setFieldState({
          collective_coherence: avgCoherence,
          active_beings: activeBeings || 0,
          recent_pulses: (pulses as FieldPulse[]) || [],
          recent_synchronicities: (synchronicities as Synchronicity[]) || [],
          field_mood: mood,
        });

        // Subscribe to real-time changes
        channel = supabase
          .channel("field_pulses")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "field_pulses" },
            (payload) => {
              const newPulse = payload.new as FieldPulse;
              setFieldState((prev) => ({
                ...prev,
                recent_pulses: [newPulse, ...prev.recent_pulses.slice(0, 19)],
                // Slightly increase coherence on new activity
                collective_coherence: Math.min(100, prev.collective_coherence + newPulse.intensity * 0.1),
              }));
            }
          )
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "synchronicities" },
            (payload) => {
              const newSync = payload.new as Synchronicity;
              setFieldState((prev) => ({
                ...prev,
                recent_synchronicities: [newSync, ...prev.recent_synchronicities.slice(0, 9)],
                field_mood: "transitioning",
              }));
            }
          )
          .subscribe((status) => {
            setIsConnected(status === "SUBSCRIBED");
          });
      } catch (error) {
        console.error("[v0] Error initializing field:", error);
        setIsConnected(false);
      }
    }

    initializeField();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return { fieldState, isConnected };
}

// Hook to emit a pulse when a user takes action
export function useEmitPulse() {
  const emitPulse = useCallback(
    async (
      pulseType: FieldPulse["pulse_type"],
      intensity: number = 0.5,
      metadata?: Record<string, unknown>
    ) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data, error } = await supabase
        .from("field_pulses")
        .insert({
          user_id: user.id,
          pulse_type: pulseType,
          intensity,
          metadata: metadata || {},
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to emit pulse:", error);
        return null;
      }

      return data;
    },
    []
  );

  return { emitPulse };
}

// Hook to get current user's profile with coherence data
export function useProfile() {
  const [profile, setProfile] = useState<{
    id: string;
    display_name: string | null;
    coherence_score: number;
    authenticity_index: number;
    intention_clarity: number;
    creator_type: string | null;
    tier: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user || !isMounted) {
          setIsLoading(false);
          return;
        }

        const { data } = await supabase
          .from("profiles")
          .select("id, display_name, coherence_score, authenticity_index, intention_clarity, creator_type, tier")
          .eq("id", user.id)
          .single();

        if (isMounted) {
          setProfile(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("[v0] Error fetching profile:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchProfile();

    // Subscribe to profile changes
    const channel = supabase
      .channel("profile_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        (payload) => {
          if (isMounted && payload.new.id === profile?.id) {
            setProfile(payload.new as typeof profile);
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [profile?.id]);

  return { profile, isLoading };
}

// Hook to subscribe to community feed with real-time updates
export function useCommunityFeed(spaceId?: string) {
  const [posts, setPosts] = useState<
    Array<{
      id: string;
      content: string;
      created_at: string;
      is_emotional_expression: boolean;
      coherence_contribution: number | null;
      author: { display_name: string; avatar_url: string | null };
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchPosts() {
      let query = supabase
        .from("community_posts")
        .select(
          `
          id,
          content,
          created_at,
          is_emotional_expression,
          coherence_contribution,
          author:profiles!user_id (
            display_name,
            avatar_url
          )
        `
        )
        .order("created_at", { ascending: false })
        .limit(50);

      if (spaceId) {
        query = query.eq("space_id", spaceId);
      } else {
        query = query.is("space_id", null);
      }

      const { data } = await query;
      setPosts((data as typeof posts) || []);
      setIsLoading(false);
    }

    fetchPosts();

    // Real-time subscription
    const channel = supabase
      .channel("community_posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_posts",
          filter: spaceId ? `space_id=eq.${spaceId}` : "space_id=is.null",
        },
        async (payload) => {
          // Fetch the complete post with author info
          const { data } = await supabase
            .from("community_posts")
            .select(
              `
              id,
              content,
              created_at,
              is_emotional_expression,
              coherence_contribution,
              author:profiles!user_id (
                display_name,
                avatar_url
              )
            `
            )
            .eq("id", payload.new.id)
            .single();

          if (data) {
            setPosts((prev) => [data as (typeof posts)[0], ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [spaceId]);

  return { posts, isLoading };
}
