import { useState, useEffect, useRef } from "react";
import { Bot, Send } from "lucide-react";
import Layout from "../components/Layout";
import AvatarSelector from "../components/AvatarSelector";
import { useSearchParams } from "react-router-dom";
import { sendMessage as callGemini } from "../api/chat";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

const Chat = () => {
  const [params] = useSearchParams();
  const initialMode = params.get("mode") || "Listener";

  const [selectedMode] = useState(initialMode);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(input, messages, selectedMode);
      const botReply: ChatMessage = { sender: "assistant", text: reply };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "assistant", text: "⚠️ Gemini is not responding. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout sidebar={<AvatarSelector />}>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm flex items-center gap-3">
          <Bot className="text-blue-600" />
          <h1 className="text-xl font-semibold">MindCare Assistant</h1>
          <span className="ml-auto text-sm text-gray-500">Mode: {selectedMode}</span>
        </div>

        {/* Messages */}
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
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-white px-4 py-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
