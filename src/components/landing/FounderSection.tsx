const credentials = [
  { value: "25 ans", label: "d'enseignement" },
  { value: "1 200+", label: "élèves coachés" },
  { value: "BE2", label: "Brevet d'État niveau 2" },
];

export function FounderSection() {
  return (
    <section className="px-5 py-10 max-w-3xl mx-auto">
      <div
        className="relative overflow-hidden p-7 md:p-10"
        style={{ background: "#1B3A2A", border: "1px solid #2A4A35", borderRadius: 24 }}
      >
        {/* Decorative blurs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -40,
            left: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)",
          }}
        />

        <div className="relative grid md:grid-cols-[160px_1fr] gap-6 md:gap-8 items-center">
          {/* Photo placeholder */}
          <div className="flex justify-center md:justify-start">
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 30%, #2D5020 0%, #1A3410 60%, #0D1A09 100%)",
                border: "3px solid #C9A84C",
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="font-serif font-bold"
                style={{ color: "#C9A84C", fontSize: 44, letterSpacing: -1 }}
              >
                LS
              </span>
            </div>
          </div>

          <div className="text-center md:text-left">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#C9A84C" }}
            >
              Le fondateur
            </p>
            <h2 className="font-serif font-bold text-xl md:text-2xl mb-3" style={{ color: "#FFFFFF" }}>
              Laurent Seinger,
              <br />
              <span style={{ color: "#E8C97A" }}>25 ans à former des golfeurs</span>
            </h2>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.85 }}>
              Pro depuis 25 ans, Brevet d&apos;État 2, Laurent a coaché plus de 1 200 élèves — des
              débutants jusqu&apos;aux joueurs de circuit. Il a construit LS Club pour offrir sa méthode à
              ceux qui n&apos;ont pas accès à un coaching régulier de qualité.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {credentials.map(({ value, label }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 10,
                    padding: "8px 6px",
                    textAlign: "center",
                  }}
                >
                  <p
                    className="font-serif font-bold"
                    style={{ color: "#E8C97A", fontSize: 16, lineHeight: 1.1 }}
                  >
                    {value}
                  </p>
                  <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <blockquote
              className="text-sm italic"
              style={{
                color: "rgba(255,255,255,0.85)",
                borderLeft: "2px solid #C9A84C",
                paddingLeft: 12,
                lineHeight: 1.7,
              }}
            >
              &ldquo;Le golf n&apos;est pas une question de talent. C&apos;est une question de méthode et de
              répétition. Mon job, c&apos;est de te donner les deux.&rdquo;
              <footer className="text-xs mt-2 not-italic" style={{ color: "rgba(255,255,255,0.45)" }}>
                — Laurent Seinger
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
