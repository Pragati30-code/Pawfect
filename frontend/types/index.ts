// frontend/src/types/index.ts

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
}