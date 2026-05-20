import { UserPlus, Play, TrendingUp } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: UserPlus,
    title: "Renseigne ton index",
    body: "Lolo IA calibre ton plan en 2 minutes. Aucun questionnaire interminable.",
  },
  {
    n: "02",
    icon: Play,
    title: "Suis le programme",
    body: "Vidéos, IA coach, reconnaissance de parcours — adaptés à ton niveau, sans détour.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Mesure tes progrès",
    body: "Score, index, badges. Tu vois la courbe monter — semaine après semaine.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-12 max-w-3xl mx-auto" style={{ background: "#0F2318" }}>
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7A8A7A" }}>
          En 3 étapes
        </p>
        <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
          Comment ça marche
        </h2>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Dotted connector (desktop only) */}
        <div
          className="hidden md:block absolute top-9 left-[16%] right-[16%] pointer-events-none"
          style={{
            height: 2,
            backgroundImage: "linear-gradient(to right, #C9A84C 0 8px, transparent 8px 16px)",
            backgroundSize: "16px 2px",
            opacity: 0.7,
            zIndex: 0,
          }}
        />
        {steps.map(({ n, icon: Icon, title, body }) => (
          <div key={n} className="relative text-center md:px-2 z-10">
            <div
              className="mx-auto mb-3 flex items-center justify-center font-serif font-bold"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#1B3A2A",
                color: "#C9A84C",
                fontSize: 22,
                boxShadow: "0 4px 16px rgba(201,168,76,0.2)",
                border: "1px solid #C9A84C",
              }}
            >
              {n}
            </div>
            <div className="flex justify-center mb-3">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 36, height: 36, background: "rgba(201,168,76,0.1)" }}
              >
                <Icon size={18} style={{ color: "#C9A84C" }} />
              </div>
            </div>
            <h3 className="font-bold text-base mb-1.5" style={{ color: "#F5F0E8" }}>
              {title}
            </h3>
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.72)", lineHeight: 1.7 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
