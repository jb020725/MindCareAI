// src/hooks/useChatLogic.ts
import { useState, useRef } from "react";
import { sendMessage as callGemini, cancelSession } from "../api/chat";
import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
}

export const useChatLogic = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMode, _setSelectedMode] = useState("MindCare"); // 👈 wrapped setter
  const sessionIdRef = useRef(uuidv4());
  const wasCancelledRef = useRef(false);

  const setSelectedMode = (newMode: string) => {
    _setSelectedMode(newMode);
    setMessages([]);
    setInput("");
    sessionIdRef.current = uuidv4();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    wasCancelledRef.current = false;

    try {
      const response = await callGemini(
        input,
        selectedMode,
        messages,
        sessionIdRef.current
      );

      if (!wasCancelledRef.current) {
        const assistantMessage: ChatMessage = {
          sender: "assistant",
          text: response.reply,
          audio_url: response.audio_url,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error("Gemini error:", err);
    } finally {
      setLoading(false);
      sessionIdRef.current = uuidv4();
      wasCancelledRef.current = false;
    }
  };

  const stopAssistant = async () => {
  try {
    wasCancelledRef.current = true;
    await cancelSession(sessionIdRef.current);

    // Add visible UI feedback
    const stoppedMessage: ChatMessage = {
      sender: "assistant",
      text: "⚠️ Response stopped.",
    };
    setMessages((prev) => [...prev, stoppedMessage]);
  } catch (err) {
    console.error("Cancel session failed:", err);
  } finally {
    setLoading(false);
    sessionIdRef.current = uuidv4();
  }
};

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleAssistantReply = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
    setLoading(false);
    sessionIdRef.current = uuidv4();
  };

  const resetChat = () => {
    setInput("");
    setMessages([]);
    sessionIdRef.current = uuidv4();
  };

  return {
    messages,
    input,
    setInput,
    loading,
    sendMessage,
    stopAssistant,
    selectedMode,
    setSelectedMode, // 👈 returns custom setter
    addMessage,
    handleAssistantReply,
    setLoading,
    resetChat,
  };
};
