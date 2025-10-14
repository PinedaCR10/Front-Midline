import { useRef } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";
import { useChat } from "./useChat";

export default function Chat() {
  const { messages, send, pending, error } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const v = (inputRef.current?.value ?? "").trim();
    if (!v) return;
    send(v);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="flex min-h-[calc(100vh-48px)] flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur dark:bg-black/30"
           style={{ borderBottom: `1px solid var(--ml-ink)` }}>
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
          <h2 className="text-[15px] font-semibold" style={{ color: "var(--ml-ink)" }}>
            Chat Anónimo de Apoyo
          </h2>
          <button
            onClick={() => history.back()}
            className="text-sm opacity-80 hover:opacity-100"
            style={{ color: "var(--ml-ink)" }}
          >
            Terminar chat
          </button>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 pb-2">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className={[
                "max-w-[80%] rounded-2xl px-4 py-3 shadow-[0_4px_0_rgba(91,62,70,0.25)]",
                isUser ? "self-end" : "self-start",
              ].join(" ")}
              style={{
                background: isUser ? "var(--ml-pink)" : "rgba(0,0,0,0.06)",
                color: "var(--ml-ink)",
              }}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
              <span className="mt-1 block text-[10px] opacity-60">
                {new Date(m.createdAt).toLocaleTimeString()}
              </span>
            </motion.div>
          );
        })}

        {/* Escribiendo... */}
        {pending && (
          <div className="self-start rounded-2xl bg-black/5 px-3 py-2"
               style={{ color: "var(--ml-ink)" }}>
            <div className="flex items-center gap-1">
              {[0,1,2].map(i => (
                <motion.span key={i} className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--ml-ink)" }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mx-auto w-full max-w-4xl px-4 pb-2 text-xs text-red-600">{error}</p>
      )}

      {/* Input */}
      <form onSubmit={submit}
            className="sticky bottom-0 z-10 w-full bg-white/85 backdrop-blur dark:bg-black/30"
            style={{ borderTop: `1px solid var(--ml-ink)` }}>
        <div className="mx-auto flex max-w-4xl items-center gap-2 px-4 py-3">
          <input
            ref={inputRef}
            className="h-12 flex-1 rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none
                       focus:ring-2 focus:ring-[color:var(--ml-ink)]/20 dark:bg-white/10"
            placeholder="Escribe tu mensaje…"
            style={{ color: "var(--ml-ink)" }}
            disabled={pending}
          />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full
                       shadow-[0_4px_0_rgba(91,62,70,0.25)] disabled:opacity-50"
            style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
            aria-label="Enviar"
            title="Enviar"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}