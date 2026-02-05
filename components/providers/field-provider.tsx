"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  useCollectiveField,
  useEmitPulse,
  useProfile,
} from "@/hooks/use-field";
import type { CollectiveFieldState, FieldPulse } from "@/lib/types/database";

interface FieldContextType {
  fieldState: CollectiveFieldState;
  isConnected: boolean;
  emitPulse: (
    pulseType: FieldPulse["pulse_type"],
    intensity?: number,
    metadata?: Record<string, unknown>
  ) => Promise<FieldPulse | null>;
  profile: {
    id: string;
    display_name: string | null;
    coherence_score: number;
    authenticity_index: number;
    intention_clarity: number;
    creator_type: string | null;
    tier: string;
  } | null;
  isLoadingProfile: boolean;
}

const FieldContext = createContext<FieldContextType | null>(null);

export function FieldProvider({ children }: { children: ReactNode }) {
  const { fieldState, isConnected } = useCollectiveField();
  const { emitPulse } = useEmitPulse();
  const { profile, isLoading: isLoadingProfile } = useProfile();

  return (
    <FieldContext.Provider
      value={{
        fieldState,
        isConnected,
        emitPulse,
        profile,
        isLoadingProfile,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
}

export function useField() {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("useField must be used within a FieldProvider");
  }
  return context;
}
