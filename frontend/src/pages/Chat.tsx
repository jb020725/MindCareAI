// src/pages/Chat.tsx
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import ChatBubble from "../components/chat/ChatBubble";
import VoiceRecorder from "../components/voice/VoiceRecorder";
import Layout from "../components/Layout";
import { useChatLogic, type ChatMessage } from "../hooks/useChatLogic";

type ModeKey = "MindCare" | "Motivator" | "StressRelief";

const MODE_META: Record<ModeKey, { label: string; subtitle: string; emoji: string }> = {
  MindCare: { label: "MindCare", subtitle: "Clarity & Balance", emoji: "🧠" },
  Motivator: { label: "Motivator", subtitle: "Energy & Drive", emoji: "⚡" },
  StressRelief: { label: "Stress Relief", subtitle: "Calm & Ease", emoji: "🌿" },
};

const Chat = () => {
  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get("mode");

  const {
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
    resetChat, // ✅ added
  } = useChatLogic();

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    if (urlMode && ["MindCare", "Motivator", "StressRelief"].includes(urlMode)) {
      setSelectedMode(urlMode as ModeKey);
      resetChat(); // ✅ clear chat when mode changes
    }
  }, [urlMode]);

  const modeInfo = MODE_META[selectedMode as ModeKey] ?? MODE_META["MindCare"];
  const isEmptyChat = messages.length === 0;

  return (
    <Layout sidebar={<Sidebar selectedMode={selectedMode} setSelectedMode={setSelectedMode} />}>
      <div className="sticky top-0 z-10 p-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span>{modeInfo.emoji}</span>
          <span>{modeInfo.label}</span>
        </h2>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">{modeInfo.subtitle}</p>
          <button
            onClick={resetChat}
            className="text-xs px-3 py-1 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {isEmptyChat ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center p-6 min-h-[calc(100vh-120px)]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              👋 Hello there. How are you feeling today?
            </h1>
            <p className="text-gray-500 max-w-md">
              I’m here to guide you. Start by typing a message below.
            </p>
          </div>

          {/* Centered input bar */}
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-2 border-t bg-white px-4 py-3 rounded-xl shadow-md border">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading && input.trim() !== "") {
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={sendMessage}
                disabled={loading || input.trim() === ""}
                className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                <svg className="w-6 h-6 transform rotate-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
              {loading && (
                <button
                  onClick={stopAssistant}
                  className="text-sm px-3 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  Stop
                </button>
              )}
              <VoiceRecorder
                selectedMode={selectedMode}
                addMessage={addMessage}
                handleAssistantReply={handleAssistantReply}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Chat view after message starts */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg: ChatMessage, idx) => (
              <ChatBubble
                key={idx}
                sender={msg.sender}
                text={msg.text}
                audio_url={msg.audio_url}
                loading={loading && idx === messages.length - 1 && msg.sender === "assistant"}
              />
            ))}
            {loading && <ChatBubble sender="assistant" text="" loading={true} />}
            <div ref={chatEndRef} className="chat-end-spacer" />
          </div>

          {/* Input bar pinned to bottom */}
          <div className="p-4 border-t bg-white flex items-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading && input.trim() !== "") {
                  sendMessage();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={sendMessage}
              disabled={loading || input.trim() === ""}
              className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
            >
              <svg className="w-6 h-6 transform rotate-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
            {loading && (
              <button
                onClick={stopAssistant}
                className="text-sm px-3 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                Stop
              </button>
            )}
            <VoiceRecorder
              selectedMode={selectedMode}
              addMessage={addMessage}
              handleAssistantReply={handleAssistantReply}
              setLoading={setLoading}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Chat;
