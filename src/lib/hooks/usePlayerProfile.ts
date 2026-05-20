"use client";

import { useState, useEffect, useCallback } from "react";
import { type PlayerProfile } from "@/app/(app)/ia/data";

const STORAGE_KEY = "ls_club_profile";

const DEFAULT_PROFILE: PlayerProfile = {
  prenom: "Membre",
  handicap: 18,
  niveau: "intermediaire",
  pointsAmeliorer: [],
  objectif: "",
};

function loadFromStorage(): PlayerProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) } as PlayerProfile;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function usePlayerProfile() {
  const [profile, setProfile] = useState<PlayerProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    setProfile(loadFromStorage());
  }, []);

  const updateProfile = useCallback((updates: Partial<PlayerProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage unavailable
      }
      return updated;
    });
  }, []);

  return { profile, updateProfile };
}
