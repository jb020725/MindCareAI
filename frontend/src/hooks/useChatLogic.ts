// src/hooks/useChatLogic.ts
import { useState } from "react";

export interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
}

export const useChatLogic = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]); // ✅ No assistant message on init
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"MindCare" | "Motivator" | "StressRelief">("MindCare");

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const resetChat = () => {
    setMessages([]); // ✅ No assistant message on reset either
    setInput("");
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    addMessage(userMessage);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          mode: selectedMode,
        }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();

      addMessage({
        sender: "assistant",
        text: data.reply,
        audio_url: data.audio_url,
      });
    } catch (err) {
      console.error("❌ Error sending message:", err);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleAssistantReply = (userInput: string) => {
    setInput(userInput);
    sendMessage();
  };

  const stopAssistant = () => {
    setLoading(false);
  };

  return {
    messages,
    input,
    setInput,
    loading,
    setLoading,
    selectedMode,
    setSelectedMode,
    addMessage,
    sendMessage,
    stopAssistant,
    handleAssistantReply,
    resetChat,
  };
};
