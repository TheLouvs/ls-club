import Link from "next/link";
import { ConnexionForm } from "./ConnexionForm";
import { login } from "./actions";

export default function ConnexionPage() {
  return (
    <>
      <h1
        className="font-serif font-bold text-2xl mb-1"
        style={{ color: "#F5F0E8" }}
      >
        Bon retour
      </h1>
      <p className="text-sm mb-7" style={{ color: "#7A8A7A" }}>
        Connecte-toi à ton espace LS Club.
      </p>

      <ConnexionForm action={login} />

      <p className="mt-6 text-center text-xs" style={{ color: "#7A8A7A" }}>
        Pas encore membre ?{" "}
        <Link
          href="/auth/inscription"
          className="font-semibold hover:underline"
          style={{ color: "#C9A84C" }}
        >
          S&apos;inscrire — 14 jours gratuits
        </Link>
      </p>
    </>
  );
}
