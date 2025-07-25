// ChatWindow.tsx
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import axios from "../api/chat";
import AssistantSelector from "./AssistantSelector";
import SuggestedQuestions from "./SuggestedQuestions";
import MessageBubble from "./MessageBubble";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [assistantMode, setAssistantMode] = useState("Listener");
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/chat", {
        message: input,
        mode: assistantMode,
        history: messages,
      });
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: res.data.reply, sender: "assistant" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Oops! Something went wrong. Try again.",
          sender: "assistant",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section id="chat" className="py-12 px-6 bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto">
        <AssistantSelector mode={assistantMode} setMode={setAssistantMode} />
        <div className="h-[400px] overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
          {loading && <MessageBubble text="Typing..." sender="assistant" />}
          <div ref={endRef} />
        </div>
        <SuggestedQuestions setInput={setInput} />
        <div className="flex mt-4 gap-2">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
