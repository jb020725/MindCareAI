// src/pages/Chat.tsx
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatBubble from "../components/ChatBubble";
import VoiceRecorder from "../components/VoiceRecorder";
import { useChatLogic, type ChatMessage } from "../hooks/useChatLogic";

type ModeKey = "MindCare" | "Motivator" | "StressRelief";

const MODE_META: Record<ModeKey, { label: string; subtitle: string }> = {
  MindCare: { label: "MindCare", subtitle: "Clarity & Balance" },
  Motivator: { label: "Motivator", subtitle: "Energy & Drive" },
  StressRelief: { label: "Stress Relief", subtitle: "Calm & Ease" },
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
    selectedMode,
    setSelectedMode,
    addMessage,
    handleAssistantReply,
    setLoading,
    playAudio,
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
    }
  }, [urlMode]);

  const modeInfo = MODE_META[selectedMode as ModeKey] ?? MODE_META["MindCare"];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

      <div className="flex flex-col flex-1 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">{modeInfo.label}</h2>
          <p className="text-sm text-gray-500">{modeInfo.subtitle}</p>
        </div>

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
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            <svg
              className="w-6 h-6 rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <VoiceRecorder
            selectedMode={selectedMode}
            addMessage={addMessage}
            handleAssistantReply={handleAssistantReply}
            setLoading={setLoading}
            playAudio={playAudio}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
