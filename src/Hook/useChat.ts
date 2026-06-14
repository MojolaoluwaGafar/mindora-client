import { useState } from "react";
import api from "../API";
import type { Message } from "../types/message";


export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/aiChat", { message });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, messages, loading, error };
}
