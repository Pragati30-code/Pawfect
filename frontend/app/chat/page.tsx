"use client";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  chatApi,
  conversationApi,
  getUser,
  logout,
  isLoggedIn,
} from "@/lib/api";
import { Message, ConversationSummary } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  LogOut,
  Plus,
  Trash2,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm **Pawfect**, your AI veterinary assistant.\n\nAsk me anything about your pet's health, nutrition, behavior, or general care.\n\n*For emergencies, always contact a licensed vet immediately.*",
};

const SUGGESTIONS = [
  "My dog has been vomiting — what should I do?",
  "How often should I take my cat to the vet?",
  "What foods are toxic to dogs?",
  "My rabbit isn't eating. Is that normal?",
];

// ── Helpers ───────────────────────────────────────────

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
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
            : "rounded-bl-sm border bg-card text-card-foreground",
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            ul: ({ children }) => (
              <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
            ),
            li: ({ children }) => <li>{children}</li>,
            h1: ({ children }) => (
              <h1 className="font-semibold text-base mb-1">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-semibold mb-1">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-medium mb-1">{children}</h3>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-2">
                <table className="text-xs border-collapse w-full">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => <thead>{children}</thead>,
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr className="border-b border-border">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="border border-border px-2 py-1.5 bg-muted font-medium text-left whitespace-nowrap">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-border px-2 py-1.5 align-top">
                {children}
              </td>
            ),
            code: ({ children }) => (
              <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-border pl-3 italic text-muted-foreground mb-2">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="border-border my-2" />,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    setUser(getUser());
    loadConversations();
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const loadConversations = async () => {
    try {
      const res = await conversationApi.list();
      setConversations(res.data);
    } catch {
      // silently fail
    }
  };

  const loadConversation = async (id: string) => {
    setLoadingHistory(true);
    try {
      const res = await conversationApi.get(id);
      setMessages(res.data.messages);
      setActiveConversationId(id);
    } catch {
      toast.error("Failed to load conversation");
    } finally {
      setLoadingHistory(false);
    }
  };

  const startNewChat = () => {
    setMessages([WELCOME]);
    setActiveConversationId(null);
    if (textareaRef.current) textareaRef.current.style.height = "40px";
  };

  const deleteConversation = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await conversationApi.delete(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) startNewChat();
      toast.success("Conversation deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: Message = { role: "user", content: content.trim() };
    const updated = [
      ...messages.filter((m) => !(m.role === "assistant" && m === WELCOME)),
      userMsg,
    ];

    // Keep welcome msg in UI but don't send it to backend
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "40px";

    // Only send actual user/assistant messages to backend (not the welcome message)
    const historyToSend = updated.filter((m) => m !== WELCOME);

    try {
      const res = await chatApi.send(
        historyToSend,
        activeConversationId ?? undefined,
      );
      const assistantMsg: Message = {
        role: "assistant",
        content: res.data.message,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // Update conversation id and refresh sidebar
      if (!activeConversationId) {
        setActiveConversationId(res.data.conversationId);
        await loadConversations();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = user?.name?.charAt(0).toUpperCase() ?? "?";
  const canSend = !!input.trim() && !loading;
  const showSuggestions =
    messages.length === 1 && messages[0] === WELCOME && !loading;
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "flex flex-col border-r bg-background transition-all duration-200 shrink-0",
          sidebarOpen ? "w-64" : "w-0 overflow-hidden",
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-3 h-14 border-b shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs">
              🐾
            </div>
            <span className="font-semibold text-sm">Pawfect</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* New chat button */}
        <div className="px-3 py-3 shrink-0">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 h-8 text-xs"
            onClick={startNewChat}
          >
            <Plus className="h-3.5 w-3.5" />
            New chat
          </Button>
        </div>

        <Separator />

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8 px-4">
              No conversations yet. Start chatting!
            </p>
          ) : (
            <div className="space-y-0.5 px-2">
              {conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => loadConversation(c.id)}
                  className={cn(
                    "group flex items-start justify-between gap-1 rounded-md px-2 py-2 cursor-pointer hover:bg-accent transition-colors",
                    activeConversationId === c.id && "bg-accent",
                  )}
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate leading-tight">
                        {c.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(c.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteConversation(e, c.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-0.5 hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* User info at bottom */}
        <div className="px-3 py-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-secondary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                {user?.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </aside>
      {/* ── Main chat area ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex items-center gap-2 px-4 h-14 border-b shrink-0">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={startNewChat}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm font-medium truncate">
              {activeConversationId
                ? (conversations.find((c) => c.id === activeConversationId)
                    ?.title ?? "Chat")
                : "New chat"}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs font-normal shrink-0">
            AI Vet
          </Badge>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {loadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
              {messages.map((msg, i) => (
                <ChatBubble key={i} message={msg} />
              ))}

              {loading && <TypingIndicator />}

              {showSuggestions && (
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
          )}
        </main>
        {/* Input */}
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
    </div>
  );
}
