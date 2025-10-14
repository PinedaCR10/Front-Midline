import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "./types";
import { sendToAssistant } from "./api";

const ON_TOPIC = /(salud|mental|ansiedad|estr[eé]s|depresi[oó]n|autocuidado|apoyo|respiraci[oó]n|seguridad|crisis)/i;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "¡Hola! Soy MindLine. ¿Qué te gustaría conversar hoy? (puedo sugerir ejercicios o recursos).",
      createdAt: Date.now(),
    },
  ]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending]);

  const send = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setError(null);

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);

    // filtro de dominio
    if (!ON_TOPIC.test(text)) {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Intentemos mantenernos en temas de salud mental y autocuidado. ¿Te apoyo con un ejercicio breve?",
          createdAt: Date.now(),
        },
      ]);
      return;
    }

    setPending(true);
    try {
      const payload = {
        topic: "salud_mental" as const,
        messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
      };
      const res = await sendToAssistant(payload);
      setMessages((m) => [...m, res.message]);
    } catch (e: any) {
      setError(e?.message ?? "Error de red");
    } finally {
      setPending(false);
    }
  }, [messages]);

  return { messages, send, pending, error, endRef };
}
