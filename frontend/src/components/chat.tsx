import React, { useState } from "react";
import { sendMessage } from "../services/api";

type Msg = { sender: "user" | "mindcare"; text: string };

const Chat: React.FC = () => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { sender: "user", text: input }]);
    const reply = await sendMessage(input);
    setMsgs((m) => [...m, { sender: "mindcare", text: reply }]);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="history">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="controls">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message…"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
