// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import { sendMessageToBackend } from './services/api';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput('');

    try {
      const assistantReply = await sendMessageToBackend(input);
      const botMessage = { sender: 'assistant', text: assistantReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'assistant', text: '⚠️ Error getting response.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <h1>💬 MindCare Assistant</h1>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="message assistant">Typing...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default App;

