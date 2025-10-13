import { Link } from "react-router-dom";
import { Mail, Phone, Heart, Shield, MessageCircle } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-12"
      style={{
        background: "var(--ml-pink)",
        color: "var(--ml-ink)",
        borderTop: `1px solid var(--ml-ink)`,
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Marca */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">MindLine</h3>
            <p className="text-sm/6 opacity-90">
              Recursos, ejercicios y un plan de seguridad personal para tu bienestar mental.
              Privado, claro y disponible 24/7.
            </p>
          </div>

          {/* Navegación */}
          <nav className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide opacity-90">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/chat" className="inline-flex items-center gap-2"><MessageCircle size={16}/> Chat</Link></li>
              <li><Link to="/seguridad" className="inline-flex items-center gap-2"><Shield size={16}/> Seguridad</Link></li>
              <li><Link to="/recursos" className="inline-flex items-center gap-2"><Phone size={16}/> Recursos</Link></li>
              <li><Link to="/ejercicios" className="inline-flex items-center gap-2"><Heart size={16}/> Ejercicios</Link></li>
            </ul>
          </nav>

          {/* Ayuda / Contacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide opacity-90">Ayuda</h4>
            <ul className="space-y-2 text-sm">
              <li className="inline-flex items-center gap-2"><Mail size={16}/> soporte@mindline.app</li>
              <li className="inline-flex items-center gap-2"><Phone size={16}/> +506 0000 0000</li>
            </ul>
            <p className="text-xs opacity-90">
              Si estás en peligro inmediato, llama a emergencias: 9-1-1 (CR/US) o 1-1-2 (UE).
            </p>
          </div>

          {/* Nota legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide opacity-90">Nota</h4>
            <p className="text-sm/6 opacity-90">
              MindLine no sustituye atención médica o psicológica profesional. Busca ayuda especializada si la necesitas.
            </p>
          </div>
        </div>

        {/* Separador fino con mismo color de texto */}
        <div className="my-8 h-px w-full opacity-30" style={{ background: "var(--ml-ink)" }} />

        {/* Créditos / Legal */}
        <div className="flex flex-col items-start justify-between gap-2 text-xs opacity-95 md:flex-row">
          <p>© {year} MindLine. Todos los derechos reservados.</p>
          <p>
            Pagina web desarrollada por <strong>Visual View Creations</strong>, todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Espacio para que la navbar móvil no lo tape */}
      <div className="h-16 md:h-0" />
    </footer>
  );
}
