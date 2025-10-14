import { MessageCircleHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants, type Transition } from "framer-motion";

const MOBILE_MINH = "calc(100vh - 48px - 64px)";
const DESKTOP_MINH = "calc(100vh - 48px - 48px)";

const HERO_IMG = "https://medlineplus.gov/images/MentalHealth_share.jpg";

/* ---------- Transitions y Variants con tipos ---------- */
const springSoft: Transition = { type: "spring", stiffness: 110, damping: 16 };
const springBtns: Transition  = { type: "spring", stiffness: 120, damping: 14 };

const fadeContainer = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay,
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: springSoft },
};

const btnItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: springBtns },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative mx-auto w-full max-w-6xl px-4 md:px-6 overflow-visible"
      style={{ minHeight: MOBILE_MINH }}
    >
      {/* Fondo 50% superior, edge-to-edge, con fade + leve zoom */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-screen -translate-x-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Overlay para lectura */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-screen -translate-x-1/2 bg-gradient-to-b from-black/55 via-black/45 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-8 md:gap-10"
        style={{ minHeight: DESKTOP_MINH }}
        variants={fadeContainer(0.05)}
        initial="hidden"
        animate="show"
      >
        {/* Card título/descripción */}
        <motion.header className="text-center" variants={fadeUp}>
          <div className="mx-auto max-w-[68ch] rounded-2xl bg-black/35 p-4 backdrop-blur-sm ring-1 ring-white/15 md:p-6">
            <h1 className="text-3xl font-semibold text-white md:text-5xl drop-shadow-md">
              ¡Tu bienestar mental importa!
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white md:text-base drop-shadow">
              MindLine te guía con materiales confiables, ejercicios cortos de regulación
              emocional y un plan de seguridad personal. Todo privado, claro y disponible 24/7.
            </p>
          </div>
        </motion.header>

        {/* Botones con stagger y separación suficiente */}
        <motion.div
          className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-5 md:mt-16 md:grid-cols-3"
          variants={fadeContainer(0.15)}
        >
          <motion.div variants={btnItem}>
            <Link
              to="/recursos"
              className="block rounded-2xl px-5 py-5 text-center text-[15px] font-semibold shadow-[0_5px_0_rgba(91,62,70,0.25)] transition-transform hover:translate-y-[1px] active:translate-y-[2px]"
              style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
            >
              Recursos de ayuda
            </Link>
          </motion.div>

          <motion.div variants={btnItem}>
            <Link
              to="/seguridad"
              className="block rounded-2xl px-5 py-5 text-center text-[15px] font-semibold shadow-[0_5px_0_rgba(91,62,70,0.25)] transition-transform hover:translate-y-[1px] active:translate-y-[2px]"
              style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
            >
              Plan de seguridad
            </Link>
          </motion.div>

          <motion.div variants={btnItem}>
            <Link
              to="/ejercicios"
              className="block rounded-2xl px-5 py-5 text-center text-[15px] font-semibold shadow-[0_5px_0_rgba(91,62,70,0.25)] transition-transform hover:translate-y-[1px] active:translate-y-[2px]"
              style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
            >
              Ejercicios de salud mental
            </Link>
          </motion.div>
        </motion.div>

        {/* Botón flotante con pop-in */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: prefersReducedMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springBtns, delay: 0.35 }}
          className="fixed md:static md:self-end md:translate-y-2"
          style={{ bottom: "112px", right: "32px" }}
        >
          <Link
            to="/chat"
            aria-label="Chat"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/5 shadow-[0_6px_0_rgba(91,62,70,0.25)]"
            style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
          >
            <MessageCircleHeart size={26} />
          </Link>
        </motion.div>
      </motion.div>

      {/* espacio para la navbar móvil */}
      <div className="h-16 md:h-0" />
    </section>
  );
}
