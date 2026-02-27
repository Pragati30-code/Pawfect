// frontend/src/app/chat/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { chatApi, getUser, logout, isLoggedIn } from "@/lib/api";
import { Message } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowUp, LogOut } from "lucide-react";

// ── Constants ─────────────────────────────────────────

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm **Pawfect**, your AI veterinary assistant.\n\nAsk me anything about your pet's health, nutrition, behavior, or general care. I'm here to help.\n\n*For emergencies, always contact a licensed vet immediately.*",
};

const SUGGESTIONS = [
  "My dog has been vomiting — what should I do?",
  "How often should I take my cat to the vet?",
  "What foods are toxic to dogs?",
  "My rabbit isn't eating. Is that normal?",
];

// ── Helpers ───────────────────────────────────────────

function renderContent(text: string) {
  const html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
  return { __html: html };
}

// ── Sub-components ────────────────────────────────────

function BotAvatar() {
  return (
    <Avatar className="h-7 w-7 shrink-0">
      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
        🐾
      </AvatarFallback>
    </Avatar>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="rounded-2xl rounded-bl-sm border bg-card px-4 py-3">
        <div className="flex items-center gap-1">
          {[0, 200, 400].map((d) => (
            <span
              key={d}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex items-end gap-2", isUser && "justify-end")}>
      {!isUser && <BotAvatar />}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border bg-card text-card-foreground"
        )}
        dangerouslySetInnerHTML={renderContent(message.content)}
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login"); return; }
    setUser(getUser());
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    const userMsg: Message = { role: "user", content: content.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "40px";

    try {
      const res = await chatApi.send(updated);
      setMessages([...updated, { role: "assistant", content: res.data.message }]);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setMessages(updated.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "40px";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const handleLogout = () => { logout(); router.push("/login"); };

  const initials = user?.name?.charAt(0).toUpperCase() ?? "?";
  const canSend = !!input.trim() && !loading;

  return (
    <div className="flex flex-col h-screen bg-background">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 h-14 border-b bg-background shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
            🐾
          </div>
          <span className="font-semibold text-sm tracking-tight">Pawfect</span>
          <Badge variant="secondary" className="text-xs font-normal hidden sm:flex">
            AI Vet Assistant
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground hidden sm:flex">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-secondary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span>{user?.name}</span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Sign out</span>
          </Button>
        </div>
      </header>

      {/* ── Messages ── */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg} />
          ))}

          {loading && <TypingIndicator />}

          {/* Suggestion chips — shown only before first user message */}
          {messages.length === 1 && !loading && (
            <div className="pt-4 space-y-3">
              <p className="text-xs text-muted-foreground text-center">
                Common questions to get started
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left px-3 py-2.5 rounded-lg border bg-card text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* ── Input ── */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end gap-2 rounded-xl border bg-card px-3 py-2 focus-within:ring-1 focus-within:ring-ring transition-shadow">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows={1}
              placeholder="Ask about your pet's health..."
              className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
            <Button
              size="icon"
              className="h-8 w-8 shrink-0 rounded-lg mb-0.5"
              onClick={() => sendMessage(input)}
              disabled={!canSend}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            For emergencies, contact a licensed veterinarian immediately.
          </p>
        </div>
      </div>
    </div>
  );
}