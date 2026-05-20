"use client";

import { useActionState, useEffect } from "react";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1.5px solid #2A4A35",
  fontSize: 14,
  color: "#F5F0E8",
  background: "#132B1E",
  outline: "none",
} as const;

export function InscriptionForm({
  action,
}: {
  action: (prev: unknown, data: FormData) => Promise<{ error: string } | void>;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  // Clear loading flag if server returns an error (redirect didn't happen)
  useEffect(() => {
    if (!pending && state && "error" in state && state.error) {
      sessionStorage.removeItem("ls_loading");
    }
  }, [pending, state]);

  return (
    <form
      action={formAction}
      className="space-y-4"
      onSubmit={() => sessionStorage.setItem("ls_loading", "1")}
    >
      <div>
        <label
          htmlFor="prenom"
          className="block text-xs font-semibold mb-1.5"
          style={{ color: "#C9A84C" }}
        >
          Prénom
        </label>
        <input
          id="prenom"
          name="prenom"
          type="text"
          autoComplete="given-name"
          required
          placeholder="Laurent"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2A4A35")}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold mb-1.5"
          style={{ color: "#C9A84C" }}
        >
          Adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="toi@exemple.fr"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2A4A35")}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold mb-1.5"
          style={{ color: "#C9A84C" }}
        >
          Mot de passe <span style={{ color: "#7A8A7A" }}>(8 caractères min.)</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2A4A35")}
        />
      </div>

      <div>
        <label
          htmlFor="confirm"
          className="block text-xs font-semibold mb-1.5"
          style={{ color: "#C9A84C" }}
        >
          Confirme le mot de passe
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2A4A35")}
        />
      </div>

      {!!(state && "error" in state && state.error) && (
        <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(232,160,32,0.1)", color: "#E8A020" }}>
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full font-bold text-sm py-3 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
        style={{ background: "#C9A84C", color: "#0F2318" }}
      >
        {pending ? "Création…" : "Créer mon compte — Gratuit 14 jours"}
      </button>

      <p className="text-center text-[11px]" style={{ color: "#7A8A7A" }}>
        Pas de CB · Annulation 1 clic
      </p>
    </form>
  );
}
