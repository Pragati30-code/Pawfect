// frontend/src/lib/api.ts

import axios from "axios";
import { AuthResponse, Message } from "@/types/index";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pawfect_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────
export const authApi = {
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>("/api/auth/register", { name, email, password }),
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/api/auth/login", { email, password }),
};

// ── Chat ──────────────────────────────────────────────
export const chatApi = {
  send: (messages: Message[]) =>
    api.post<{ message: string }>("/api/chat", { messages }),
};

// ── Session helpers ───────────────────────────────────
export const saveAuth = (token: string, name: string, email: string) => {
  localStorage.setItem("pawfect_token", token);
  localStorage.setItem("pawfect_user", JSON.stringify({ name, email }));
};

export const getUser = (): { name: string; email: string } | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("pawfect_user");
  return raw ? JSON.parse(raw) : null;
};

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("pawfect_token");
};

export const logout = () => {
  localStorage.removeItem("pawfect_token");
  localStorage.removeItem("pawfect_user");
};