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
    <section className="px-5 py-8 md:py-12 max-w-3xl mx-auto" style={{ background: "#0F2318" }}>
      <div className="text-center mb-8 md:mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7A8A7A" }}>
          En 3 étapes
        </p>
        <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
          Comment ça marche
        </h2>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-5">
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
        {/* Vertical connector (mobile only) */}
        <div
          className="md:hidden absolute pointer-events-none"
          style={{
            left: 31,
            top: 32,
            bottom: 32,
            width: 1,
            backgroundImage: "linear-gradient(to bottom, #C9A84C 0 6px, transparent 6px 12px)",
            backgroundSize: "1px 12px",
            opacity: 0.45,
            zIndex: 0,
          }}
        />

        {steps.map(({ n, icon: Icon, title, body }) => (
          <div key={n} className="relative z-10 flex md:flex-col md:items-center md:text-center md:px-2 items-start gap-5 md:gap-0 pb-7 md:pb-0 last:pb-0">
            {/* Number badge */}
            <div
              className="flex-shrink-0 flex items-center justify-center font-serif font-bold md:mx-auto md:mb-3"
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
            {/* Content */}
            <div className="flex-1 pt-3 md:pt-0">
              {/* Icon (desktop only — redundant on mobile) */}
              <div className="hidden md:flex justify-center mb-3">
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
          </div>
        ))}
      </div>
    </section>
  );
}
