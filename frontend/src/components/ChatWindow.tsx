// src/components/ChatWindow.tsx
import { useEffect, useRef } from "react";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  loading: boolean;
}

const ChatWindow = ({ messages, loading }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-white to-blue-50">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-xl px-4 py-3 rounded-xl shadow-sm ${
            msg.sender === "user"
              ? "ml-auto bg-blue-100 text-right"
              : "mr-auto bg-white border"
          }`}
        >
          <p className="whitespace-pre-wrap">{msg.text}</p>
        </div>
      ))}
      {loading && <div className="text-sm text-gray-500">MindCare is typing...</div>}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
