function verificationEmailHtml(prenom: string, code: string): string {
  const digits = code.split("");
  const digitCells = digits
    .map(
      (d) =>
        `<td style="padding:0 5px;"><div style="width:44px;height:56px;background:#0F2318;border:1.5px solid #C9A84C;border-radius:10px;text-align:center;line-height:56px;font-size:28px;font-weight:800;color:#C9A84C;font-family:Georgia,serif;">${d}</div></td>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0F2318;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0F2318;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:28px;">
          <table cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="vertical-align:middle;padding-right:10px;">
              <div style="width:44px;height:44px;border-radius:12px;background:#1B3A2A;border:1.5px solid #C9A84C;text-align:center;line-height:44px;">
                <span style="font-weight:800;font-size:16px;color:#C9A84C;font-family:Georgia,serif;letter-spacing:-0.5px;">LS</span>
              </div>
            </td>
            <td style="vertical-align:middle;">
              <span style="font-weight:700;font-size:20px;color:#F5F0E8;font-family:Georgia,serif;">LS Club</span>
            </td>
          </tr></table>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#1B3A2A;border:1px solid #2A4A35;border-radius:16px;padding:40px 36px;">

          <!-- Gold top bar -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr><td style="height:3px;background:linear-gradient(90deg,#C9A84C,#E8C97A,#C9A84C);border-radius:2px;"></td></tr>
          </table>

          <!-- Title -->
          <p style="margin:0 0 6px;font-size:22px;font-weight:800;color:#F5F0E8;font-family:Georgia,serif;">Confirme ton adresse e-mail</p>
          <p style="margin:0 0 24px;font-size:15px;color:rgba(245,240,232,0.65);">Salut <strong style="color:#F5F0E8;">${prenom}</strong> ! Bienvenue sur LS Club.</p>

          <p style="margin:0 0 20px;font-size:14px;color:rgba(245,240,232,0.72);line-height:1.6;">
            Pour activer ton compte, entre ce code de confirmation dans l&rsquo;application. Il expire dans <strong style="color:#C9A84C;">15 minutes</strong>.
          </p>

          <!-- Code -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px;">
            <tr>${digitCells}</tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
            <tr><td style="height:1px;background:#2A4A35;"></td></tr>
          </table>

          <p style="margin:0;font-size:12px;color:rgba(245,240,232,0.4);line-height:1.6;">
            Si tu n&rsquo;as pas cr&eacute;&eacute; de compte LS Club, ignore simplement cet e-mail.<br>
            Ne partage jamais ce code avec quelqu&rsquo;un d&rsquo;autre.
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:rgba(245,240,232,0.25);">LS Club &middot; La m&eacute;thode Seinger</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendVerificationEmail(
  to: string,
  prenom: string,
  code: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY manquant");

  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  // En sandbox Resend (pas de domaine vérifié), on ne peut envoyer qu'à son propre email
  const recipient = process.env.RESEND_TEST_EMAIL ?? to;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipient,
      subject: `${code} — Ton code de confirmation LS Club`,
      html: verificationEmailHtml(prenom, code),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}
