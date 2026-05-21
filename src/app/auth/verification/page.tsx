import { redirect } from "next/navigation";
import { VerificationForm } from "./VerificationForm";

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  if (!email) redirect("/auth/inscription");

  return (
    <>
      <h1 className="font-serif font-bold text-2xl mb-1" style={{ color: "#F5F0E8" }}>
        Vérifie ton e-mail
      </h1>
      <VerificationForm email={decodeURIComponent(email)} />
    </>
  );
}
