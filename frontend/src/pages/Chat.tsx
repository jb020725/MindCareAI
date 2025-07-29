import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatBubble from "@/components/chat/ChatBubble";
import VoiceRecorder from "@/components/voice/VoiceRecorder";
import Layout from "@/components/Layout";
import { useChatLogic } from "@/hooks/useChatLogic";

const MODE_META = {
  MindCare: { label: "MindCare", subtitle: "Clarity & Balance", emoji: "🧠" },
  Motivator: { label: "Motivator", subtitle: "Energy & Drive", emoji: "⚡" },
  StressRelief: { label: "Stress Relief", subtitle: "Calm & Ease", emoji: "🌿" },
};

const Chat = () => {
  const [searchParams] = useSearchParams();
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
    resetChat,
  } = useChatLogic();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam && ["MindCare", "Motivator", "StressRelief"].includes(modeParam)) {
      setSelectedMode(modeParam as any);
      resetChat();
    }
  }, [searchParams]);

  const modeInfo = MODE_META[selectedMode || "MindCare"];

  return (
    <Layout sidebar={<Sidebar selectedMode={selectedMode} setSelectedMode={setSelectedMode} />}>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="sticky top-0 z-10 p-4 border-b bg-white flex justify-between items-center">
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              sender={msg.sender}
              text={msg.text}
              audio_url={msg.audio_url}
              loading={loading && idx === messages.length - 1 && msg.sender === "assistant"}
            />
          ))}
          {loading && <ChatBubble sender="assistant" text="" loading />}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-white px-4 py-3 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading && input.trim()) {
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
            <svg
              className="w-6 h-6 transform rotate-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
          <VoiceRecorder
            selectedMode={selectedMode}
            addMessage={addMessage}
            handleAssistantReply={handleAssistantReply}
            setLoading={setLoading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
