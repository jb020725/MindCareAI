// frontend/src/pages/Chat.tsx
import React, { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setHistory((prev) => [...prev, `🧑: ${userMsg}`]);
    setMessage("");
    setLoading(true);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });
    const data = await res.json();
    setHistory((prev) => [...prev, `🤖: ${data.response}`]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Chat with your AI Companion</h2>
      <div className="border rounded p-4 bg-white shadow mb-4 h-[400px] overflow-y-auto">
        {history.map((msg, idx) => (
          <p key={idx} className="mb-2 whitespace-pre-wrap">{msg}</p>
        ))}
        {loading && <p>🤖: typing...</p>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-4 py-2 rounded shadow"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
      </div>
    </div>
  );
};

export default Chat;
