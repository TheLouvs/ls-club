"use client";

import { useActionState } from "react";
import { verifyCode, resendCode } from "./actions";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1.5px solid #2A4A35",
  fontSize: 14,
  color: "#F5F0E8",
  background: "#132B1E",
  outline: "none",
  letterSpacing: "0.3em",
  textAlign: "center" as const,
} as const;

export function VerificationForm({ email }: { email: string }) {
  const [verifyState, verifyAction, verifyPending] = useActionState(verifyCode, null);
  const [resendState, resendAction, resendPending] = useActionState(resendCode, null);

  const masked = email.replace(/(.{2}).+(@.+)/, "$1…$2");

  return (
    <>
      <p className="text-sm mb-7" style={{ color: "#7A8A7A" }}>
        Un code à 6 chiffres a été envoyé à{" "}
        <span style={{ color: "#C9A84C", fontWeight: 600 }}>{masked}</span>
      </p>

      <form action={verifyAction} className="space-y-4">
        <input type="hidden" name="email" value={email} />

        <div>
          <label htmlFor="code" className="block text-xs font-semibold mb-1.5" style={{ color: "#C9A84C" }}>
            Code de confirmation
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
            placeholder="· · · · · ·"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2A4A35")}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
          />
        </div>

        {!!(verifyState && "error" in verifyState && verifyState.error) && (
          <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(232,160,32,0.1)", color: "#E8A020" }}>
            {verifyState.error}
          </p>
        )}

        <button
          type="submit"
          disabled={verifyPending}
          className="w-full font-bold text-sm py-3 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
          style={{ background: "#C9A84C", color: "#0F2318" }}
        >
          {verifyPending ? "Vérification…" : "Confirmer mon compte"}
        </button>
      </form>

      <div className="mt-5 pt-5" style={{ borderTop: "1px solid #2A4A35" }}>
        <p className="text-xs mb-3 text-center" style={{ color: "#7A8A7A" }}>
          Tu n&apos;as pas reçu le code ?
        </p>
        <form action={resendAction}>
          <input type="hidden" name="email" value={email} />
          <button
            type="submit"
            disabled={resendPending}
            className="w-full text-sm py-2.5 rounded-xl transition-opacity hover:opacity-80 disabled:opacity-50 font-semibold"
            style={{ background: "transparent", border: "1.5px solid #2A4A35", color: "#C9A84C" }}
          >
            {resendPending ? "Envoi…" : "Renvoyer le code"}
          </button>
        </form>
        {!!(resendState && "success" in resendState && resendState.success) && (
          <p className="text-xs mt-2 text-center" style={{ color: "#5a8a50" }}>
            {resendState.success}
          </p>
        )}
        {!!(resendState && "error" in resendState && resendState.error) && (
          <p className="text-xs mt-2 text-center" style={{ color: "#E8A020" }}>
            {resendState.error}
          </p>
        )}
      </div>
    </>
  );
}
