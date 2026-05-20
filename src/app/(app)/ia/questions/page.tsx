"use client";

import { useState } from "react";
import IAHeader from "../components/IAHeader";
import QuestionsModule from "../components/QuestionsModule";
import { usePlayerProfile } from "@/lib/hooks/usePlayerProfile";

type Level = "debutant" | "intermediaire" | "avance";

export default function QuestionsPage() {
  const [level, setLevel] = useState<Level>("intermediaire");
  const [historyOpen, setHistoryOpen] = useState(true);
  const { profile } = usePlayerProfile();

  return (
    <div className="flex flex-col h-full" style={{ background: "#071009" }}>
      <IAHeader
        mode="questions"
        level={level}
        onLevelChange={setLevel}
        onHistoryOpen={() => setHistoryOpen((p) => !p)}
      />
      <QuestionsModule
        profile={profile}
        level={level}
        historyOpen={historyOpen}
        onHistoryClose={() => setHistoryOpen(false)}
      />
    </div>
  );
}
