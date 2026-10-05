import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type { Message, RiskLevel } from "../types/message";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
const SESSION_KEY = "chatSessionId";

export const getSessionId = () => {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

export const clearSessionId = () => localStorage.removeItem(SESSION_KEY);

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  // Render's free tier can take ~60s to wake up.
  timeout: 75_000,
});

api.interceptors.request.use((config) => {
  config.headers["x-session-id"] = getSessionId();
  return config;
});

/** Turns any API failure into a message we can show the user. */
export const errorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    if (err.response?.data?.message) return err.response.data.message;
    if (err.code === "ECONNABORTED") return "Mindora is taking too long to respond. Please try again.";
  }
  if (err instanceof TypeError || (err instanceof Error && err.message === "Network Error")) {
    // fetch() throws TypeError when the server can't be reached.
    return "Can't reach Mindora right now. Check your connection and try again.";
  }
  return err instanceof Error && err.message ? err.message : "Something went wrong";
};

/** Fire-and-forget ping so the Render server starts waking up before the user sends a message. */
export const warmUpServer = () => {
  fetch(BASE_URL, { method: "GET" }).catch(() => {});
};

export const fetchHistory = async (): Promise<Message[]> => {
  const res = await api.get("/api/history");
  return res.data.messages ?? [];
};

export const endSession = async () => {
  try {
    await api.delete("/api/session");
  } finally {
    clearSessionId();
  }
};

type StreamHandlers = {
  onMeta?: (risk: RiskLevel) => void;
  onDelta: (text: string) => void;
  signal?: AbortSignal;
};

/**
 * Sends a message and streams the reply. The server responds with
 * newline-delimited JSON events: meta → delta* → done | error.
 */
export async function streamChat(message: string, { onMeta, onDelta, signal }: StreamHandlers): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/aiChat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-session-id": getSessionId() },
    body: JSON.stringify({ message }),
    credentials: "include",
    signal,
  });

  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newline;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line) continue;

      const event = JSON.parse(line);
      if (event.type === "meta") onMeta?.(event.risk);
      else if (event.type === "delta") onDelta(event.text);
      else if (event.type === "error") throw new Error(event.message);
      else if (event.type === "done") return;
    }
  }
}

export default api;
