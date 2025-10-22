import { Home, MessageCircle, Shield, Phone, Heart, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/diario", label: "Diario", icon: BookOpen },
  { to: "/seguridad", label: "Seguridad", icon: Shield },
  { to: "/recursos", label: "Recursos", icon: Phone },
  { to: "/ejercicios", label: "Ejercicios", icon: Heart },
];

function Item({ to, label, Icon }: { to: string; label: string; Icon: any }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px]",
          "hover:bg-white/45 dark:hover:bg-white/10", // no cambia color de texto/ícono
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20",
          isActive ? "bg-white/65 shadow-sm dark:bg-white/15" : "",
        ].join(" ")
      }
      style={{ color: "var(--ml-ink)" }}  // ← fija color de texto/ícono
    >
      <Icon size={18} />
      <span className="leading-none">{label}</span>
    </NavLink>
  );
}

export default function Navbar() {
  const content = (
    <nav className="mx-auto grid max-w-md grid-cols-6 items-center gap-1">
      {items.map((it) => (
        <Item key={it.to} to={it.to} label={it.label} Icon={it.icon} />
      ))}
    </nav>
  );

  return (
    <>
      <div className="hidden w-full border-b border-black/10 bg-[color:var(--ml-pink)] py-2 dark:border-white/10 md:block">
        {content}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[color:var(--ml-pink)] py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] dark:border-white/10 md:hidden">
        {content}
      </div>
    </>
  );
}
