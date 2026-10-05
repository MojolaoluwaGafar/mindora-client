import { useCallback, useEffect, useRef, useState } from "react";
import { streamChat, fetchHistory, endSession, errorMessage } from "../API";
import type { Message } from "../types/message";

// If no reply has started after this long, the server is probably waking up.
const SLOW_REPLY_MS = 8000;

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Restore the conversation after a refresh (the server keeps it for 1 hour).
  useEffect(() => {
    let cancelled = false;
    fetchHistory()
      .then((history) => { if (!cancelled && history.length) setMessages(history); })
      .catch(() => { /* No history or server asleep — start fresh. */ })
      .finally(() => { if (!cancelled) setRestoring(false); });
    return () => { cancelled = true; abortRef.current?.abort(); };
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);
    setSlow(false);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;
    const slowTimer = setTimeout(() => setSlow(true), SLOW_REPLY_MS);
    // The AI reply is created on the first streamed chunk, then extended by id.
    // Updaters stay pure (StrictMode may run them twice).
    const replyId = crypto.randomUUID();
    let started = false;
    let risk: Message["risk"];

    try {
      await streamChat(message, {
        signal: controller.signal,
        onMeta: (level) => { risk = level; },
        onDelta: (text) => {
          clearTimeout(slowTimer);
          setSlow(false);
          if (!started) {
            started = true;
            setMessages((prev) => [...prev, { id: replyId, sender: "ai", text, risk }]);
          } else {
            setMessages((prev) => prev.map((m) => (m.id === replyId ? { ...m, text: m.text + text } : m)));
          }
        },
      });
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") setError(errorMessage(err));
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
      setLoading(false);
    }
  }, []);

  const endChat = useCallback(async () => {
    abortRef.current?.abort();
    await endSession().catch(() => {});
    setMessages([]);
  }, []);

  return { sendMessage, endChat, messages, loading, slow, restoring, error };
}
