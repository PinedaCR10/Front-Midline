import { useState } from "react";
import {
  FaHistory,
  FaFilePdf,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

type Msg = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string | number | Date;
};

type Conversation = {
  id: string;
  date: string;
  messages: Msg[];
};

const LS_KEY = "ml_conversations";

function loadHistory(): Conversation[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveHistory(convs: Conversation[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(convs));
  } catch {/* ignore */}
}

function normalizeMessages(msgs: Msg[]) {
  // lo esencial para comparar
  return msgs.map((m) => ({
    r: m.role,
    c: m.content,
    t: new Date(m.createdAt).getTime(),
  }));
}

function sameConversation(a: Msg[], b: Msg[]) {
  return JSON.stringify(normalizeMessages(a)) === JSON.stringify(normalizeMessages(b));
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[m]!));
}

export default function Functions({ messages }: { messages: Msg[] }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [history, setHistory] = useState<Conversation[]>(() => loadHistory());

  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(history.length / pageSize));
  const pageItems = history.slice(page * pageSize, page * pageSize + pageSize);

  /** Guarda la conversación actual si:
   * - hay mensajes
   * - y no es igual a la última guardada (evita duplicados)
   */
  const saveConversationIfNeeded = () => {
    if (!messages.length) return;

    const latest = history[0];
    const isDuplicate = latest && sameConversation(latest.messages, messages);
    if (isDuplicate) return;

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      date: new Date().toISOString(),
      messages: messages.map((m) => ({
        ...m,
        createdAt: new Date(m.createdAt).toString(),
      })),
    };

    const updated = [newConv, ...history].slice(0, 200); // límite sano
    setHistory(updated);
    saveHistory(updated);
  };

  const deleteConversation = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    saveHistory(updated);
    setSelectedConv(null);
    // Recalcular paginación si quedaste fuera de rango
    if (page > 0 && page * pageSize >= updated.length) {
      setPage((p) => Math.max(0, p - 1));
    }
  };

  const exportPdf = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"/>
      <title>Chat MindLine</title>
      <style>
        body{font-family:Arial,Helvetica,sans-serif;margin:24px;color:#111}
        .msg{margin:0 0 12px}
        .bubble{display:inline-block;max-width:72%;padding:10px 12px;border-radius:14px;background:#f2f2f2}
        .me .bubble{background:#5B3E46;color:#fff}
        .time{font-size:10px;opacity:.6;margin-top:4px}
      </style></head><body>
      <h2>Conversación</h2>
      ${
        messages.map(m => `
          <div class="msg ${m.role === "user" ? "me" : ""}">
            <div class="bubble">${escapeHtml(String(m.content))}</div>
            <div class="time">${new Date(m.createdAt).toLocaleString()}</div>
          </div>
        `).join("")
      }
      <script>window.onload=()=>setTimeout(()=>window.print(),150)</script>
      </body></html>`;
    const w = window.open("", "_blank", "width=900,height=1000");
    if (!w) return;
    w.document.open(); w.document.write(html); w.document.close(); w.focus();
  };

  return (
    <div className="flex w-full justify-center gap-3">
      <button
        type="button"
        onClick={() => {
          saveConversationIfNeeded(); // ⬅️ GUARDA ANTES DE ABRIR
          setOpen(true);
          setPage(0);
          setSelectedConv(null);
        }}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow-[0_2px_0_rgba(91,62,70,0.25)]"
        style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
      >
        <FaHistory /> Historial de chats
      </button>

      <button
        type="button"
        onClick={exportPdf}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow-[0_2px_0_rgba(91,62,70,0.25)]"
        style={{ background: "var(--ml-pink)", color: "var(--ml-ink)" }}
      >
        <FaFilePdf /> Exportar chat (PDF)
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className="w-[min(92vw,560px)] rounded-2xl p-5 shadow-xl overflow-y-auto max-h-[85vh]"
            style={{ background: "#fff", color: "#5B3E46" }} // texto oscuro
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {selectedConv ? "Conversación guardada" : "Historial de conversaciones"}
              </h3>
              <button
                type="button"
                onClick={() => { setSelectedConv(null); setOpen(false); }}
                className="rounded-md px-2 py-1 hover:bg-black/5"
                style={{ color: "#5B3E46" }}
              >
                <FaTimes />
              </button>
            </div>

            {/* LISTA */}
            {!selectedConv && (
              <>
                {pageItems.length === 0 && (
                  <p className="text-sm opacity-70">No hay conversaciones guardadas.</p>
                )}

                <ul className="space-y-2">
                  {pageItems.map((conv, idx) => (
                    <li
                      key={conv.id}
                      className="rounded-lg border p-3 cursor-pointer transition hover:bg-[var(--ml-pink)]"
                      style={{ borderColor: "rgba(0,0,0,.1)", color: "#5B3E46" }}
                      onClick={() => setSelectedConv(conv)}
                    >
                      <div className="text-sm font-medium">
                        Conversación {page * pageSize + idx + 1}
                      </div>
                      <div className="text-xs opacity-70">
                        {new Date(conv.date).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* PAGINACIÓN */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <button
                    type="button"
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-1 disabled:opacity-40"
                    style={{ color: "#5B3E46" }}
                  >
                    <FaChevronLeft /> Anterior
                  </button>
                  <div className="text-xs opacity-70">Página {page + 1} de {totalPages}</div>
                  <button
                    type="button"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-1 disabled:opacity-40"
                    style={{ color: "#5B3E46" }}
                  >
                    Siguiente <FaChevronRight />
                  </button>
                </div>
              </>
            )}

            {/* DETALLE */}
            {selectedConv && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {selectedConv.messages.map((m) => (
                    <div key={m.id} className={`${m.role === "user" ? "text-right" : "text-left"}`}>
                      <div
                        className={`inline-block rounded-xl px-3 py-2 text-sm ${
                          m.role === "user" ? "bg-[var(--ml-pink)]" : "bg-gray-100"
                        }`}
                        style={{ color: "#5B3E46" }}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-3 border-t border-black/10">
                  <button
                    type="button"
                    onClick={() => setSelectedConv(null)}
                    className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm"
                    style={{ background: "var(--ml-pink)", color: "#5B3E46" }}
                  >
                    <FaArrowLeft /> Regresar
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteConversation(selectedConv.id)}
                    className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm"
                    style={{ background: "#e4b5b5", color: "#5B3E46" }}
                  >
                    <FaTrash /> Eliminar conversación
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
