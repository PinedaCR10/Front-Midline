import { MessageCircleHeart } from "lucide-react";
import { Link } from "react-router-dom";

const MOBILE_MINH = "calc(100vh - 48px - 64px)";
const DESKTOP_MINH = "calc(100vh - 48px - 48px)";

const HERO_IMG =
  "https://medlineplus.gov/images/MentalHealth_share.jpg";

export default function Hero() {
  return (
    <section
      className="relative mx-auto w-full max-w-6xl px-4 md:px-6 overflow-visible"
      style={{ minHeight: MOBILE_MINH }}
    >
      {/* Banda de imagen 50% superior, edge-to-edge */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-screen -translate-x-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        aria-hidden
      />
      {/* Overlay más fuerte para lectura */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-screen -translate-x-1/2 bg-gradient-to-b from-black/55 via-black/45 to-transparent" />

      <div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-8 md:gap-10"
        style={{ minHeight: DESKTOP_MINH }}
      >
        {/* Tarjeta translúcida detrás del título/descr. */}
        <header className="text-center">
          <div className="mx-auto max-w-[68ch] rounded-2xl bg-black/35 p-4 backdrop-blur-sm ring-1 ring-white/15 md:p-6">
            <h1 className="text-3xl font-semibold text-white md:text-5xl drop-shadow-md">
              ¡Tu bienestar mental importa!
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white md:text-base drop-shadow">
              MindLine te guía con materiales confiables, ejercicios cortos de regulación
              emocional y un plan de seguridad personal. Todo privado, claro y disponible 24/7.
            </p>
          </div>
        </header>

        {/* Separación MÁS amplia respecto a la imagen */}
        <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-5 md:mt-16 md:grid-cols-3">
          <Link
            to="/recursos"
            className="rounded-2xl px-5 py-5 text-center text-[15px] font-semibold shadow-[0_5px_0_rgba(91,62,70,0.25)] hover:translate-y-[1px] active:translate-y-[2px] transition-transform"
            style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
          >
            Recursos de ayuda
          </Link>

          <Link
            to="/seguridad"
            className="rounded-2xl px-5 py-5 text-center text-[15px] font-semibold shadow-[0_5px_0_rgba(91,62,70,0.25)] hover:translate-y-[1px] active:translate-y-[2px] transition-transform"
            style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
          >
            Plan de seguridad
          </Link>

          <Link
            to="/ejercicios"
            className="rounded-2xl px-5 py-5 text-center text-[15px] font-semibold shadow-[0_5px_0_rgba(91,62,70,0.25)] hover:translate-y-[1px] active:translate-y-[2px] transition-transform"
            style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
          >
            Ejercicios de salud mental
          </Link>
        </div>

        {/* Botón flotante: lo dejamos como lo movimos antes */}
        <Link
          to="/chat"
          aria-label="Chat"
          className="fixed inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/5 shadow-[0_6px_0_rgba(91,62,70,0.25)] md:static md:self-end md:translate-y-2"
          style={{ background: "var(--ml-pink)", color: "var(--ml-ink)", bottom: "112px", right: "32px" }}
        >
          <MessageCircleHeart size={26} />
        </Link>
      </div>

      {/* espacio para la navbar móvil */}
      <div className="h-16 md:h-0" />
    </section>
  );
}
