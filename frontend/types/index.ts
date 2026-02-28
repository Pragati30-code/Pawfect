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

export interface ConversationSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationDetail {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}