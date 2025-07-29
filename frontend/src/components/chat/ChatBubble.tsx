// src/components/ChatBubble.tsx
import { useState, useRef } from "react";
import {
  Clipboard,
  ClipboardCheck,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Square,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
  loading?: boolean;
}

const ChatBubble = ({ sender, text, audio_url, loading = false }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [ttsUrl, setTtsUrl] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLike = () => {
    setIsLiked(true);
    setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsLiked(false);
    setIsDisliked(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleSpeak = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setTtsUrl(data.audio_url);
      setIsSpeaking(true);

      setTimeout(() => {
        audioRef.current?.play();
      }, 300);
    } catch (err) {
      console.error("TTS failed:", err);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  };

  return (
    <div
      className={cn(
        "chat-bubble fade-in",
        sender === "user" ? "user justify-end" : "assistant justify-start"
      )}
    >
      <div
        className={cn(
          "bubble-content rounded-2xl px-4 py-3 max-w-[80%] shadow-sm transition-colors duration-300",
          sender === "user"
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-bl-none"
        )}
      >
        {loading ? (
          <div className="typing-indicator flex space-x-1 animate-pulse">
            <span className="dot w-2 h-2 bg-gray-400 rounded-full" />
            <span className="dot w-2 h-2 bg-gray-400 rounded-full" />
            <span className="dot w-2 h-2 bg-gray-400 rounded-full" />
          </div>
        ) : (
          <p className="whitespace-pre-line">{text}</p>
        )}

        {audio_url && (
          <audio controls className="mt-2">
            <source src={audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        {ttsUrl && (
          <audio
            ref={audioRef}
            src={`http://127.0.0.1:8000${ttsUrl}`}
            hidden
            onEnded={() => setIsSpeaking(false)}
          />
        )}

        {sender === "assistant" && !loading && (
          <TooltipProvider>
            <div className="flex gap-4 mt-4 items-center justify-start text-muted-foreground">
              {/* Like */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLike}
                    className="hover:scale-110 transition"
                  >
                    <ThumbsUp
                      className={cn(
                        "w-5 h-5",
                        isLiked ? "text-black dark:text-white" : "text-gray-400"
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Like</TooltipContent>
              </Tooltip>

              {/* Dislike */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleDislike}
                    className="hover:scale-110 transition"
                  >
                    <ThumbsDown
                      className={cn(
                        "w-5 h-5",
                        isDisliked
                          ? "text-black dark:text-white"
                          : "text-gray-400"
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Dislike</TooltipContent>
              </Tooltip>

              {/* Speak / Stop */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={isSpeaking ? handleStop : handleSpeak}
                    className="hover:scale-110 transition"
                  >
                    {isSpeaking ? (
                      <Square className="w-5 h-5 text-red-500" strokeWidth={2} />
                    ) : (
                      <Volume2
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={2}
                      />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isSpeaking ? "Stop" : "Speak"}</TooltipContent>
              </Tooltip>

              {/* Copy */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="hover:scale-110 transition"
                  >
                    {isCopied ? (
                      <ClipboardCheck
                        className="w-5 h-5 text-green-600"
                        strokeWidth={2}
                      />
                    ) : (
                      <Clipboard
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={2}
                      />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isCopied ? "Copied!" : "Copy"}</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
