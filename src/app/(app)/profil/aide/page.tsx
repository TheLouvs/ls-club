"use client";

import { ArrowLeft, ChevronRight, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faq = [
  {
    question: "Comment modifier mon index ?",
    answer: "Rendez-vous dans Paramètres > Mon profil pour mettre à jour votre index officiel.",
  },
  {
    question: "Comment accéder aux vidéos ?",
    answer: "Toutes les vidéos sont disponibles dans la section Bibliothèque, organisées par thème.",
  },
  {
    question: "Comment contacter Laurent ?",
    answer: "Laurent est disponible via Lolo IA pour des conseils personnalisés, ou lors des sessions live.",
  },
  {
    question: "Comment gérer mon abonnement ?",
    answer: "Depuis Mon Profil > Abonnement, vous pouvez consulter et gérer votre plan Premium.",
  },
];

export default function AidePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="px-4 py-4 md:px-8 max-w-3xl mx-auto w-full">

      <div className="flex items-center gap-3 mb-4">
        <Link href="/profil" className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          <ArrowLeft size={15} style={{ color: "#7A8A7A" }} />
        </Link>
        <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7A8A7A" }}>
          Aide & Support
        </p>
      </div>

      {/* FAQ */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1" style={{ color: "#7A8A7A" }}>
        QUESTIONS FRÉQUENTES
      </p>
      <div className="card-white overflow-hidden mb-4">
        {faq.map(({ question, answer }, i) => (
          <div key={question} style={{ borderTop: i > 0 ? "1px solid #2A4A35" : "none" }}>
            <button
              className="flex items-center gap-3 px-4 py-3.5 w-full text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>{question}</span>
              <ChevronRight
                size={13}
                style={{
                  color: "#3A4A3A",
                  transform: openIndex === i ? "rotate(90deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {openIndex === i && (
              <p className="px-4 pb-3.5 text-xs leading-relaxed" style={{ color: "#7A8A7A" }}>{answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1" style={{ color: "#7A8A7A" }}>
        NOUS CONTACTER
      </p>
      <div className="card-white p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,168,76,0.12)" }}>
            <Mail size={15} style={{ color: "#C9A84C" }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>Email support</p>
            <p className="text-xs" style={{ color: "#7A8A7A" }}>support@lsclub.fr</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "#C9A84C", color: "#0F2318" }}>
          <MessageCircle size={14} />
          Envoyer un message
        </button>
      </div>

      {/* Version */}
      <p className="text-center text-[11px]" style={{ color: "#3A4A3A" }}>LS Club v1.0.0</p>

    </div>
  );
}
