// src/pages/Chat.tsx
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatBubble from "@/components/chat/ChatBubble";
import Layout from "@/components/Layout";
import InputBox from "@/components/chat/InputBox";
import { useVoiceRecorder } from "@/components/voice/useVoiceRecorder";
import { useChatLogic } from "@/hooks/useChatLogic";
import { sendMessage as sendMessageAPI } from "@/api/chat";

const MODE_META = {
  MindCare: { label: "MindCare", emoji: "🧠" },
  Motivator: { label: "Motivator", emoji: "⚡" },
  StressRelief: { label: "Stress Relief", emoji: "🌿" },
};

interface MessageType {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
}

const Chat = () => {
  const [searchParams] = useSearchParams();
  const {
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
  } = useChatLogic();

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset chat when mode changes
  useEffect(() => {
    resetChat();
  }, [selectedMode]);

  const handleAssistantReplyWrapper = (transcript: string): void => {
    console.log("🎙 Received voice transcript:", transcript);
    if (!transcript || !transcript.trim()) {
      console.warn("⚠️ Empty transcript ignored.");
      return;
    }

    const newMessages = [...messages, { sender: "user", text: transcript } as MessageType];
    addMessage({ sender: "user", text: transcript });
    setLoading(true);

    sendMessageAPI(transcript, selectedMode)
      .then((data) => {
        addMessage({
          sender: "assistant",
          text: data.reply,
          audio_url: data.audio_url,
        });
      })
      .catch(() => {
        addMessage({
          sender: "assistant",
          text: "⚠️ No response from backend.",
        });
      })
      .finally(() => setLoading(false));
  };

  // ✅ voice hook: includes full toggle logic
  const {
    startRecording,
    stopRecording,
    isRecording,
  } = useVoiceRecorder(handleAssistantReplyWrapper, selectedMode);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam && ["MindCare", "Motivator", "StressRelief"].includes(modeParam)) {
      setSelectedMode(modeParam as "MindCare" | "Motivator" | "StressRelief");
      resetChat();
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const modeInfo = MODE_META[selectedMode];
  const hasUserMessages = messages.some((m) => m.sender === "user");
  const shouldCenter = !hasUserMessages && messages.length === 0;

  return (
    <Layout
      sidebar={
        <Sidebar
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          resetChat={resetChat}
        />
      }
    >
      <div className={`flex flex-col h-full ${shouldCenter ? "justify-center" : ""}`}>
        <div className="sticky top-0 z-10 p-4 border-b bg-white flex justify-center items-center relative">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>{modeInfo.emoji}</span>
            <span>{modeInfo.label}</span>
          </h2>
          <button
            onClick={resetChat}
            className="absolute right-4 text-xs px-3 py-1 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Clear Chat
          </button>
        </div>

        <div className="flex flex-col flex-1">
          <div className="overflow-y-auto px-4 py-4 space-y-4 transition-all duration-300 flex-1">
            {shouldCenter && (
              <div className="text-center text-3xl font-semibold text-gray-600 mt-12">
          How can I help you today?
              </div>
            )}

            <div className="w-full">
              {messages.map((msg, idx) => (
          <ChatBubble
            key={idx}
            sender={msg.sender}
            text={msg.text}
            audio_url={msg.audio_url}
            loading={
              loading &&
              idx === messages.length - 1 &&
              msg.sender === "assistant"
            }
          />
              ))}
              {loading && <ChatBubble sender="assistant" text="" loading />}
              <div ref={chatEndRef} />
            </div>
          </div>

          <InputBox
            input={input}
            setInput={setInput}
            onSend={sendMessage}
            onMicClick={startRecording}
            onMicStop={stopRecording}
            isRecording={isRecording}
            loading={loading}
            inputRef={inputRef}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
