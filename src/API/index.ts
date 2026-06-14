import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const getSessionId = () => {
  let id = localStorage.getItem("chatSessionId");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("chatSessionId", id);
  }
  return id;
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const sessionId = getSessionId();
  // console.log("Sending session:", sessionId);
  config.headers["x-session-id"] = sessionId;
  return config;
});

export default api;
