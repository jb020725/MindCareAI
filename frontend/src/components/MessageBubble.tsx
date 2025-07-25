// MessageBubble.tsx
import { Bot, User } from "lucide-react";

const MessageBubble = ({
  text,
  sender,
}: {
  text: string;
  sender: "user" | "assistant";
}) => {
  const isUser = sender === "user";
  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Bot className="mt-1 text-indigo-600" />}
      <div
        className={`rounded-xl px-4 py-2 max-w-xs ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
      </div>
      {isUser && <User className="mt-1 text-gray-500" />}
    </div>
  );
};

export default MessageBubble;
