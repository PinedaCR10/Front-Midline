import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    setTheme(stored ?? (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header
      className="w-full bg-[color:var(--ml-pink)]"
      style={{ borderBottom: `1px solid var(--ml-ink)` }} // ← línea con color de letras
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <span className="text-[18px] font-semibold tracking-tight" style={{ color: "var(--ml-ink)" }}>
          MindLine
        </span>

        <button
          aria-label="Cambiar tema"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/60 shadow-sm backdrop-blur hover:bg-white/70 dark:bg-white/10"
          style={{ color: "var(--ml-ink)" }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
