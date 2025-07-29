// src/hooks/useChatLogic.ts
import { useState } from "react";

export interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
}

export const useChatLogic = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"MindCare" | "Motivator" | "StressRelief">("MindCare");

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const resetChat = () => {
    setMessages([]);
  };

  const handleAssistantReply = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, mode: selectedMode }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        sender: "assistant",
        text: data.reply || "⚠️ No response from assistant",
        audio_url: data.audio_url,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { sender: "assistant", text: "⚠️ Something went wrong" }]);
    } finally {
      setLoading(false);
    }
  };

  const stopAssistant = () => {
    // Optional: implement session stop if backend supports it
    setLoading(false);
  };

  return {
    messages,
    input,
    setInput,
    loading,
    sendMessage,
    stopAssistant,
    selectedMode,
    setSelectedMode,
    addMessage,
    handleAssistantReply,
    setLoading,
    resetChat,
  };
};
