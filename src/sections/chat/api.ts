import type { SendPayload, ChatResponse } from "./types";

export async function sendToAssistant(payload: SendPayload): Promise<ChatResponse> {
  // Sustituye por tu backend cuando esté listo:
  // const res = await fetch(import.meta.env.VITE_API_URL + "/chat", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Network error");
  // return (await res.json()) as ChatResponse;

  // Mock: simple y seguro, centrado en salud mental
  const last = payload.messages.at(-1)?.content ?? "";
  const canned = [
    "Gracias por compartirlo. ¿Te gustaría intentar una respiración 4-7-8?",
    "Puedo sugerirte recursos y un plan de seguridad. ¿Por dónde quieres empezar?",
    "Pedir ayuda está bien. ¿Hay alguien de confianza con quien puedas hablar hoy?",
  ];
  const text =
    /respir|ansied|estr[eé]s|depres/i.test(last)
      ? "Probemos 4-7-8: Inhala 4s, retén 7s, exhala 8s. Repite 4 veces. ¿Cómo te sientes?"
      : canned[Math.floor(Math.random() * canned.length)];

  await new Promise((r) => setTimeout(r, 600));
  return {
    id: crypto.randomUUID(),
    message: { id: crypto.randomUUID(), role: "assistant", content: text, createdAt: Date.now() },
  };
}
