"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ls_club_index";
const DEFAULT_INDEX = 18.0;

interface IndexEntry {
  from: number;
  to: number;
  date: string;
}

interface IndexData {
  value: number;
  updatedAt: string | null;
  history: IndexEntry[];
}

function loadFromStorage(): IndexData {
  if (typeof window === "undefined") {
    return { value: DEFAULT_INDEX, updatedAt: null, history: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { value: DEFAULT_INDEX, updatedAt: null, history: [] };
    return JSON.parse(raw) as IndexData;
  } catch {
    return { value: DEFAULT_INDEX, updatedAt: null, history: [] };
  }
}

export function useGolfIndex() {
  const [data, setData] = useState<IndexData>(() => ({
    value: DEFAULT_INDEX,
    updatedAt: null,
    history: [],
  }));

  // Hydrate from localStorage after mount
  useEffect(() => {
    setData(loadFromStorage());
  }, []);

  const updateIndex = useCallback((newValue: number) => {
    setData((prev) => {
      const now = new Date().toISOString();
      const entry: IndexEntry = {
        from: prev.value,
        to: newValue,
        date: now,
      };
      const updated: IndexData = {
        value: newValue,
        updatedAt: now,
        history: [entry, ...prev.history].slice(0, 5),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage unavailable
      }
      return updated;
    });
  }, []);

  const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
  const daysSinceUpdate = updatedAt
    ? Math.floor((Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const neverSet = data.updatedAt === null;

  return {
    index: data.value,
    updatedAt,
    daysSinceUpdate,
    history: data.history,
    neverSet,
    updateIndex,
  };
}
