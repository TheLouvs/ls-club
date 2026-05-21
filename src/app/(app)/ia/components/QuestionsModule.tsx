"use client";

import { useState, useRef, useEffect, useCallback, useTransition } from "react";
import {
  Send, Paperclip, Target, TrendingUp, Map, Sparkles, Command, X, RotateCcw,
  Plus, ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { type Message, type PlayerProfile, MOCK_CONVERSATION } from "../data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Level = "debutant" | "intermediaire" | "avance";

type ConversationEntry = {
  id: string;
  date: string;
  snippet: string;
  messages: Message[];
};

// ─── localStorage persistence ──────────────────────────────────────────────────

const LS_CONV_KEY = "ls_ia_discussion_conv";
const LS_HIST_KEY = "ls_ia_discussion_history";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 h

type StoredConv = { messages: Message[]; startedAt: number };

function loadStoredConv(): Message[] {
  try {
    const raw = localStorage.getItem(LS_CONV_KEY);
    if (!raw) return FRESH_CONVERSATION;
    const stored: StoredConv = JSON.parse(raw);
    if (Date.now() - stored.startedAt > TTL_MS) return FRESH_CONVERSATION;
    return stored.messages;
  } catch {
    return FRESH_CONVERSATION;
  }
}

function saveConv(messages: Message[], startedAt: number) {
  if (!messages.some((m) => m.role === "user")) return;
  try {
    localStorage.setItem(LS_CONV_KEY, JSON.stringify({ messages, startedAt }));
  } catch {}
}

function loadHistory(): ConversationEntry[] {
  try {
    const raw = localStorage.getItem(LS_HIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: ConversationEntry[]) {
  try {
    localStorage.setItem(LS_HIST_KEY, JSON.stringify(history));
  } catch {}
}

function getInitialMessages(): Message[] {
  if (typeof window === "undefined") return FRESH_CONVERSATION;
  return loadStoredConv();
}

function getInitialStartedAt(): number {
  if (typeof window === "undefined") return Date.now();
  try {
    const raw = localStorage.getItem(LS_CONV_KEY);
    if (raw) {
      const stored: StoredConv = JSON.parse(raw);
      if (Date.now() - stored.startedAt <= TTL_MS) return stored.startedAt;
    }
  } catch {}
  return Date.now();
}

// Upsert the current conversation into the history list (always at the top)
function upsertHistory(
  conversations: ConversationEntry[],
  messages: Message[],
  startedAt: number
): ConversationEntry[] {
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length === 0) return conversations;
  const id = `conv-${startedAt}`;
  const entry: ConversationEntry = {
    id,
    date: new Date(startedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
    snippet:
      userMessages[0].content.slice(0, 60) +
      (userMessages[0].content.length > 60 ? "…" : ""),
    messages: [...messages],
  };
  return [entry, ...conversations.filter((c) => c.id !== id)];
}

// ─── Auto-resize textarea ─────────────────────────────────────────────────────

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const el = textareaRef.current;
      if (!el) return;
      if (reset) { el.style.height = `${minHeight}px`; return; }
      el.style.height = `${minHeight}px`;
      el.style.height = `${Math.max(minHeight, Math.min(el.scrollHeight, maxHeight ?? Infinity))}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const el = textareaRef.current;
    if (el) el.style.height = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    const onResize = () => adjustHeight();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

// ─── Typing dots ──────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center ml-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full mx-0.5"
          style={{ background: "#7ab84a", boxShadow: "0 0 4px rgba(122,184,74,0.4)" }}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── LS Avatar (coach) ───────────────────────────────────────────────────────

function LSAvatar({ size = 32 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: "#1a3a0a", border: "1px solid #3a6a1a" }}
    >
      <span
        className="font-bold"
        style={{ fontSize: size * 0.34, color: "#c0dd97", lineHeight: 1 }}
      >
        LS
      </span>
    </div>
  );
}

// ─── Markdown renderer ────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#c0dd97", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function MarkdownContent({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="space-y-1.5">
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Numbered list: "1. text"
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/s);
        if (numberedMatch) {
          return (
            <div key={i} className="flex gap-2">
              <span className="flex-shrink-0 font-bold text-xs mt-0.5" style={{ color: "#7ab84a" }}>
                {numberedMatch[1]}.
              </span>
              <span>{renderInline(numberedMatch[2])}</span>
            </div>
          );
        }

        // Bullet: "• text" or "- text"
        if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2">
              <span className="flex-shrink-0 mt-0.5" style={{ color: "#7ab84a" }}>•</span>
              <span>{renderInline(trimmed.slice(2))}</span>
            </div>
          );
        }

        return <p key={i}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLF_COMMANDS = [
  { icon: <Target size={14} />,     label: "Drill",     description: "Exercice ciblé",      prefix: "/drill"     },
  { icon: <TrendingUp size={14} />, label: "Conseil",   description: "Conseil technique",   prefix: "/conseil"   },
  { icon: <Map size={14} />,        label: "Stratégie", description: "Gestion de parcours", prefix: "/stratégie" },
  { icon: <Sparkles size={14} />,   label: "Analyse",   description: "Ma technique",        prefix: "/analyse"   },
];

const QUICK_CHIPS = [
  { label: "Mon drive 🏌️",          message: "Comment améliorer mon drive ?" },
  { label: "Mon putting ⛳",          message: "Comment améliorer mon putting ?" },
  { label: "Préparer un tournoi 🏆", message: "Comment préparer un tournoi stableford ?" },
  { label: "Analyser mon swing 📹",  message: "Peux-tu analyser mon swing et me donner les corrections prioritaires ?" },
];

const SUGGESTIONS = [
  "Comment améliorer mon putting ?",
  "Bonne posture pour le driver ?",
  "Comment sortir d'un bunker ?",
  "Gérer le stress en compétition",
];

const LEVEL_LABELS: Record<Level, string> = {
  debutant:      "Débutant",
  intermediaire: "Intermédiaire",
  avance:        "Avancé",
};

const FRESH_CONVERSATION: Message[] = [
  {
    role: "assistant",
    content: "Bonjour Laurent ! Je suis Lolo IA, votre assistant golf basé sur la méthode Laurent Seinger.\n\nJ'ai noté votre profil — index 18, vous travaillez sur le drive et le putting. Objectif : passer sous les 18.\n\nQue puis-je faire pour vous aujourd'hui ?",
  },
];


// ─── Module ───────────────────────────────────────────────────────────────────

export default function QuestionsModule({
  profile,
  level = "intermediaire",
  historyOpen = false,
  onHistoryClose,
}: {
  profile: PlayerProfile;
  level?: Level;
  historyOpen?: boolean;
  onHistoryClose?: () => void;
}) {
  const [messages, setMessages]         = useState<Message[]>(getInitialMessages);
  const [input, setInput]               = useState("");
  const [attachments, setAttachments]   = useState<string[]>([]);
  const [loading, setLoading]           = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showPalette, setShowPalette]   = useState(false);
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 });
  const [, startTransition]             = useTransition();
  const [conversations, setConversations] = useState<ConversationEntry[]>(() =>
    typeof window === "undefined" ? [] : loadHistory()
  );
  const [hasUserMessage, setHasUserMessage] = useState(
    () => getInitialMessages().some((m) => m.role === "user")
  );
  const [convStartedAt, setConvStartedAt] = useState<number>(getInitialStartedAt);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 48, maxHeight: 120 });

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Persist current conversation to localStorage and upsert into history on every message change
  useEffect(() => {
    if (!messages.some((m) => m.role === "user")) return;
    saveConv(messages, convStartedAt);
    setConversations((prev) => upsertHistory(prev, messages, convStartedAt));
  }, [messages, convStartedAt]);

  // Persist history to localStorage whenever it changes
  useEffect(() => { saveHistory(conversations); }, [conversations]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (input.startsWith("/") && !input.includes(" ")) {
      setShowPalette(true);
      const idx = GOLF_COMMANDS.findIndex((c) => c.prefix.startsWith(input));
      setActiveSuggestion(idx >= 0 ? idx : -1);
    } else {
      setShowPalette(false);
    }
  }, [input]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = document.querySelector("[data-cmd-btn]");
      if (
        paletteRef.current &&
        !paletteRef.current.contains(e.target as Node) &&
        !btn?.contains(e.target as Node)
      ) {
        setShowPalette(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setHasUserMessage(true);
    const updatedMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updatedMessages);
    setInput("");
    adjustHeight(true);
    startTransition(() => { setLoading(true); });
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          mode: "discuter",
          playerProfile: {
            niveau: profile.niveau,
            handicap: profile.handicap,
            pointsAmeliorer: profile.pointsAmeliorer,
            objectif: profile.objectif,
            objectifIndex: profile.objectifIndex,
            frequenceJeu: profile.frequenceJeu,
            typeJeu: profile.typeJeu,
            blessure: profile.blessure,
          },
        }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Désolé, je rencontre un problème technique. Réessayez dans un instant." }]);
    } finally {
      setLoading(false);
    }
  }

  function newConversation() {
    // Current conversation is already in history via upsertHistory effect — just start fresh
    try { localStorage.removeItem(LS_CONV_KEY); } catch {}
    const newStartedAt = Date.now();
    setConvStartedAt(newStartedAt);
    setMessages(FRESH_CONVERSATION);
    setHasUserMessage(false);
  }

  function loadConversation(entry: ConversationEntry) {
    const startedAt = parseInt(entry.id.replace("conv-", ""), 10) || Date.now();
    setConvStartedAt(startedAt);
    setMessages(entry.messages);
    setHasUserMessage(entry.messages.some((m) => m.role === "user"));
    // Persist loaded conversation as current so it resumes on next visit
    saveConv(entry.messages, startedAt);
    onHistoryClose?.();
  }

  function selectCommand(i: number) {
    setInput(GOLF_COMMANDS[i].prefix + " ");
    setShowPalette(false);
    textareaRef.current?.focus();
  }

  function addAttachment() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setAttachments((p) => [...p, ...files.map((f) => f.name)]);
    e.target.value = "";
  }

  function removeAttachment(i: number) {
    setAttachments((p) => p.filter((_, j) => j !== i));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (showPalette) {
      if (e.key === "ArrowDown")  { e.preventDefault(); setActiveSuggestion((p) => (p < GOLF_COMMANDS.length - 1 ? p + 1 : 0)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setActiveSuggestion((p) => (p > 0 ? p - 1 : GOLF_COMMANDS.length - 1)); }
      else if (e.key === "Tab" || e.key === "Enter") { e.preventDefault(); if (activeSuggestion >= 0) selectCommand(activeSuggestion); }
      else if (e.key === "Escape") { e.preventDefault(); setShowPalette(false); }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const showSuggestions = !hasUserMessage;

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">

      {/* ── History sidebar (inline) ─────────────────────────── */}
      <AnimatePresence initial={false}>
        {historyOpen && (
          <motion.div
            className="flex-shrink-0 flex flex-col overflow-hidden"
            style={{ background: "#0a1a0a", borderRight: "0.5px solid #1e3a1e" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-4 flex-shrink-0" style={{ borderBottom: "0.5px solid #1e3a1e" }}>
              <p className="font-semibold text-sm" style={{ color: "#e8f0ea" }}>Historique</p>
              <button
                onClick={onHistoryClose}
                className="transition-colors hover:text-[#8aab92]"
                style={{ color: "#4a6855" }}
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            {/* New conversation */}
            <div className="px-3 py-3 flex-shrink-0" style={{ borderBottom: "0.5px solid #1e3a1e" }}>
              <button
                onClick={newConversation}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
                style={{ background: "#3a6a1a", color: "#c0dd97" }}
              >
                <Plus size={13} />
                Nouvelle conversation
              </button>
            </div>

            {/* Entries */}
            <div className="flex-1 overflow-y-auto py-2">
              {conversations.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-1 px-2 py-0.5 transition-colors hover:bg-[#0d200d] group"
                >
                  <button
                    onClick={() => loadConversation(entry)}
                    className="flex-1 text-left px-2 py-2.5 min-w-0"
                  >
                    <p className="text-[10px] font-semibold mb-0.5" style={{ color: "#4a6855" }}>{entry.date}</p>
                    <p className="text-xs leading-snug truncate" style={{ color: "#8aab92" }}>{entry.snippet}</p>
                  </button>
                  <button
                    onClick={() => setConversations((prev) => prev.filter((c) => c.id !== entry.id))}
                    className="flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#4a6855" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#c06060")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4a6855")}
                    title="Supprimer"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat column ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

      {/* ── Message history ─────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 relative">

        {/* Reset button */}
        <div className="flex justify-end mb-1">
          <motion.button
            type="button"
            onClick={() => {
              try { localStorage.removeItem(LS_CONV_KEY); } catch {}
              const newStartedAt = Date.now();
              setConvStartedAt(newStartedAt);
              setMessages(FRESH_CONVERSATION);
              setAttachments([]);
              setInput("");
              adjustHeight(true);
              setHasUserMessage(false);
            }}
            whileTap={{ scale: 0.9, rotate: -180 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
            style={{ color: "#4a6855", background: "transparent", border: "1px solid transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#8aab92"; e.currentTarget.style.borderColor = "#1e3a1e"; e.currentTarget.style.background = "#0d200d"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#4a6855"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}
            title="Réinitialiser la conversation"
          >
            <RotateCcw size={12} />
            <span>Réinitialiser</span>
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={cn("flex gap-2.5 items-end", msg.role === "user" && "flex-row-reverse")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              {/* Avatar — LS for coach, initials for user */}
              {msg.role === "assistant" ? (
                <LSAvatar size={32} />
              ) : (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
                  style={{ background: "#0d200d", border: "0.5px solid #1e3a1e" }}
                >
                  <span className="text-[9px] font-bold" style={{ color: "#4a6855" }}>ME</span>
                </div>
              )}

              {/* Bubble */}
              <div
                className="max-w-[78%] px-4 py-3 text-sm leading-relaxed"
                style={
                  msg.role === "assistant"
                    ? { background: "#0d200d", border: "0.5px solid #1e3a1e", borderRadius: "14px 14px 14px 4px", color: "#e8f0ea" }
                    : { background: "linear-gradient(135deg, #1a3a0a, #2d5a1b)", border: "0.5px solid #3a6a1a", borderRadius: "14px 14px 4px 14px", color: "#e8f0ea" }
                }
              >
                {msg.role === "assistant"
                  ? <MarkdownContent text={msg.content} />
                  : msg.content
                }
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing bubble */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="flex gap-2.5 items-end"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
            >
              <LSAvatar size={32} />
              <div
                className="px-4 py-3"
                style={{ background: "#0d200d", border: "0.5px solid #1e3a1e", borderRadius: "14px 14px 14px 4px" }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick suggestions grid (empty state) */}
        {showSuggestions && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#4a6855" }}>
              Questions fréquentes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-sm px-4 py-3 rounded-xl transition-all hover:brightness-110 active:scale-95"
                  style={{ background: "#0d200d", border: "0.5px solid #1e3a1e", color: "#8aab92" }}
                >
                  <span style={{ color: "#c9a84c" }} className="mr-2">›</span>{s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input area ──────────────────────────────────────── */}
      <div className="px-4 py-4 relative" style={{ borderTop: "0.5px solid #1e3a1e", background: "#0a1a0a" }}>

        {/* Command palette */}
        <AnimatePresence>
          {showPalette && (
            <motion.div
              ref={paletteRef}
              className="absolute left-4 right-4 bottom-full mb-2 rounded-xl overflow-hidden z-50 shadow-2xl"
              style={{ background: "#0a1a0a", border: "0.5px solid #1e3a1e" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
            >
              {GOLF_COMMANDS.map((cmd, i) => (
                <motion.button
                  key={cmd.prefix}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left transition-colors cursor-pointer"
                  style={
                    activeSuggestion === i
                      ? { background: "rgba(90,173,117,0.12)", color: "#e8f0ea" }
                      : { color: "#8aab92" }
                  }
                  onClick={() => selectCommand(i)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <span style={{ color: activeSuggestion === i ? "#5aad75" : "#4a6855" }}>{cmd.icon}</span>
                  <span className="font-medium">{cmd.label}</span>
                  <span className="opacity-40 text-[11px]">{cmd.prefix}</span>
                  <span className="ml-auto opacity-40 text-[11px]">{cmd.description}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input card */}
        <div
          className="rounded-2xl overflow-visible"
          style={{ background: "#0d200d", border: "0.5px solid #1e3a1e", position: "relative" }}
        >
          {/* Focus ring */}
          <AnimatePresence>
            {inputFocused && (
              <motion.span
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "0 0 0 2px rgba(90,173,117,0.25)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Textarea */}
          <div className="px-4 pt-3 pb-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); adjustHeight(); }}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={`Posez votre question, ${profile.prenom}… (niveau ${LEVEL_LABELS[level]})`}
              className="w-full bg-transparent text-sm outline-none resize-none leading-relaxed placeholder:text-[#4a6855]"
              style={{ color: "#e8f0ea", minHeight: "48px", overflow: "hidden" }}
            />
          </div>

          {/* Attachment chips */}
          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div
                className="px-4 pb-2 flex gap-2 flex-wrap"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {attachments.map((file, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(90,173,117,0.08)", border: "1px solid rgba(90,173,117,0.15)", color: "#8aab92" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <span>{file}</span>
                    <button
                      onClick={() => removeAttachment(i)}
                      style={{ color: "#4a6855" }}
                      className="hover:text-[#8aab92] transition-colors"
                    >
                      <X size={11} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions bar */}
          <div
            className="flex items-center justify-between gap-3 px-3 py-2"
            style={{ borderTop: "0.5px solid #1e3a1e" }}
          >
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <motion.button
                type="button"
                onClick={addAttachment}
                whileTap={{ scale: 0.94 }}
                className="p-2 rounded-lg transition-colors relative group"
                style={{ color: "#4a6855" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#8aab92")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a6855")}
                title="Ajouter une image ou vidéo"
              >
                <Paperclip size={15} />
                <motion.span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(90,173,117,0.06)" }}
                />
              </motion.button>

              <motion.button
                type="button"
                data-cmd-btn
                onClick={(e) => { e.stopPropagation(); setShowPalette((p) => !p); }}
                whileTap={{ scale: 0.94 }}
                className="p-2 rounded-lg transition-colors relative group"
                style={showPalette
                  ? { background: "rgba(90,173,117,0.12)", color: "#5aad75" }
                  : { color: "#4a6855" }}
                onMouseEnter={(e) => { if (!showPalette) e.currentTarget.style.color = "#8aab92"; }}
                onMouseLeave={(e) => { if (!showPalette) e.currentTarget.style.color = "#4a6855"; }}
                title="Commandes (/)"
              >
                <Command size={15} />
                <motion.span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(90,173,117,0.06)" }}
                />
              </motion.button>
            </div>

            <motion.button
              type="button"
              onClick={() => sendMessage(input)}
              whileHover={input.trim() && !loading ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.96 }}
              disabled={!input.trim() || loading}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: "#3a6a1a",
                color: "#c0dd97",
                opacity: (!input.trim() || loading) ? 0.4 : 1,
                boxShadow: input.trim() && !loading ? "0 2px 10px rgba(58,106,26,0.3)" : "none",
              }}
            >
              <Send size={13} />
              <span>Envoyer</span>
            </motion.button>
          </div>
        </div>

        {/* Quick-send chips — visible before first user message */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              className="flex flex-wrap gap-1.5 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {QUICK_CHIPS.map((chip, i) => (
                <motion.button
                  key={chip.label}
                  onClick={() => sendMessage(chip.message)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95"
                  style={{ background: "#0d200d", border: "0.5px solid #2d5a1b", color: "#7ab84a" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#132a13"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#0d200d"; }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {chip.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-[10px] mt-3" style={{ color: "#2d4a35" }}>
          Lolo IA · Basé sur la méthode Seinger
        </p>
      </div>

      {/* ── Floating "thinking" toast ────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full shadow-xl"
            style={{ background: "#0d200d", border: "0.5px solid #1e3a1e" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <LSAvatar size={24} />
            <div className="flex items-center gap-2 text-xs" style={{ color: "#8aab92" }}>
              <span>Lolo réfléchit</span>
              <TypingDots />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cursor glow when focused ─────────────────────────── */}
      {inputFocused && (
        <motion.div
          className="fixed w-[36rem] h-[36rem] rounded-full pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(45,102,64,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: mousePos.x - 288, y: mousePos.y - 288 }}
          transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.5 }}
        />
      )}

      </div>
    </div>
  );
}
