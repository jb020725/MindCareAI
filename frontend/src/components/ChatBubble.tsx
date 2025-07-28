// src/components/ChatBubble.tsx

interface Props {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
  loading?: boolean;
}

const ChatBubble = ({ sender, text, audio_url, loading = false }: Props) => {
  return (
    <div
      className={`chat-bubble ${sender === "user" ? "user" : "assistant"} fade-in`}
    >
      <div className="bubble-content">
        {loading ? (
          <div className="typing-indicator">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        ) : (
          <p>{text}</p>
        )}
        {audio_url && (
          <audio controls className="mt-2">
            <source src={audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
