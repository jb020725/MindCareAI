// src/hooks/useChatLogic.ts
import { useState, useRef } from "react";
import { sendMessage as callGemini } from "../api/chat";
import type { Message } from "../api/chat";

export interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
}

export const useChatLogic = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "assistant",
      text: "👋 Hello there. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"MindCare" | "Motivator" | "StressRelief">("MindCare");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play();
  };

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleAssistantReply = (reply: string, audio_url?: string) => {
    addMessage({
      sender: "assistant",
      text: reply,
      audio_url,
    });
    if (audio_url) playAudio(audio_url);
  };

  const formatHistory = (): Message[] => {
    return messages.map(({ sender, text }) => ({ sender, text }));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    addMessage({ sender: "user", text: input });
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(input, selectedMode, formatHistory());
      handleAssistantReply(reply);
    } catch (err) {
      handleAssistantReply("⚠️ Failed to get a response.");
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        sender: "assistant",
        text: "👋 Hello there. How are you feeling today?",
      },
    ]);
    setInput("");
  };

  return {
    messages,
    input,
    loading,
    selectedMode,
    setSelectedMode,
    setInput,
    sendMessage,
    addMessage,
    handleAssistantReply,
    playAudio,
    setLoading,
    resetChat,
  };
};
