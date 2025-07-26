import React from "react";

interface ChatBubbleProps {
  sender: "user" | "assistant";
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      <p>{text}</p>
    </div>
  );
};

export default ChatBubble;
