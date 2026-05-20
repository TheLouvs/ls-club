import Link from "next/link";
import { InscriptionForm } from "./InscriptionForm";
import { register } from "./actions";

export default function InscriptionPage() {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <h1
          className="font-serif font-bold text-2xl"
          style={{ color: "#F5F0E8" }}
        >
          Crée ton compte
        </h1>
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
          style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
        >
          14 jours gratuits
        </span>
      </div>
      <p className="text-sm mb-7" style={{ color: "#7A8A7A" }}>
        Rejoins 2 400+ golfeurs qui progressent avec la méthode Laurent Seinger.
      </p>

      <InscriptionForm action={register} />

      <p className="mt-6 text-center text-xs" style={{ color: "#7A8A7A" }}>
        Déjà membre ?{" "}
        <Link
          href="/auth/connexion"
          className="font-semibold hover:underline"
          style={{ color: "#C9A84C" }}
        >
          Se connecter
        </Link>
      </p>
    </>
  );
}
