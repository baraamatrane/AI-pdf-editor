"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  createdAt: number;
};

export default function Chatpage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      role: "assistant",
      text: "Hi — I'm your PDF assistant. Ask me anything about your uploaded documents.",
      createdAt: Date.now() - 1000,
    },
  ]);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  function addMessage(msg: Message) {
    setMessages((m) => [...m, msg]);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      createdAt: Date.now(),
    };

    addMessage(userMsg);
    setInput("");
    setIsSending(true);

    // Simulate assistant response. Replace this with your real API call.
    await new Promise((r) => setTimeout(r, 700));

    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      text: `You asked: "${text}" — here's a short summary or answer (simulated).`,
      createdAt: Date.now(),
    };

    addMessage(assistantMsg);
    setIsSending(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-white rounded-lg shadow p-4">
      <header className="flex items-center justify-between border-b pb-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-black">Chat</h2>
          <p className="text-sm text-gray-500">Ask questions about your PDFs</p>
        </div>
        <div className="text-sm text-gray-500">Model: local-sim</div>
      </header>

      <main className="flex-1 overflow-y-auto px-2">
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[80%] px-4 py-2 rounded-lg break-words whitespace-pre-wrap ${
                m.role === "user"
                  ? "self-end bg-blue-600 text-white"
                  : "self-start bg-slate-100 text-black"
              }`}
            >
              <div className="text-sm">{m.text}</div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(m.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        <div ref={endRef} />
      </main>

      <footer className="mt-4 pt-4 border-t">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message and press Enter to send..."
            className="flex-1 min-h-[44px] max-h-40 resize-none rounded-md border p-2 focus:outline-none focus:ring"
          />

          <div className="flex flex-col">
            <button
              onClick={handleSend}
              disabled={isSending || input.trim() === ""}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-2">
          Shift+Enter for newline
        </div>
      </footer>
    </div>
  );
}
