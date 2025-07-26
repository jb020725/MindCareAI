import { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import Sidebar from "../components/Sidebar";
import { sendMessage as callGemini } from "../api/chat";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

const Chat = () => {
  const [selectedMode, setSelectedMode] = useState("MindCare");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Welcome message from assistant
    const welcome: ChatMessage = {
      sender: "assistant",
      text: "👋 Hello there. How are you feeling today?",
    };
    setMessages([welcome]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(input, messages, selectedMode);
      const botReply: ChatMessage = { sender: "assistant", text: reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "⚠️ Gemini is not responding." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <Sidebar selected={selectedMode} onSelect={setSelectedMode} />

      <div className="flex flex-col flex-1">
        <header className="p-4 border-b shadow-sm flex items-center justify-between bg-white">
          <h1 className="text-xl font-bold text-blue-700">MindCareAI</h1>
          <span className="text-sm text-gray-500">Mode: {selectedMode}</span>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-white to-blue-50 custom-scrollbar">
          {messages.map((msg, i) => (
            <ChatBubble key={i} sender={msg.sender} text={msg.text} />
          ))}
          {loading && (
            <div className="typing-indicator text-sm text-gray-500">
              Typing<span className="dots">...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </main>

        <footer className="border-t bg-white px-4 py-3 flex gap-2">
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
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
