import { useState, useRef } from "react";
import {
  Clipboard,
  ClipboardCheck,
  Edit2,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Square,
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  sender: "user" | "assistant";
  text: string;
  audio_url?: string;
  loading?: boolean;
  onEdit?: (newText: string) => void;
}

const ChatBubble = ({ sender, text, audio_url, loading, onEdit }: Props) => {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // Show actions on hover (desktop)
  const handleMouseEnter = () => setShowActions(true);
  const handleMouseLeave = () => setShowActions(false);

  // Show actions on long press (mobile)
  const handleTouchStart = () => {
    longPressTimeout.current = setTimeout(() => setShowActions(true), 500);
  };
  const handleTouchEnd = () => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
  };

  // Edit logic
  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(text);
    setShowActions(false);
  };

  const handleEditSave = () => {
    setIsEditing(false);
    if (onEdit) onEdit(editText);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditText(text);
  };

  // Audio logic: always show, use SpeechSynthesis API for TTS
  const handleAudioClick = () => {
    if (!isPlaying) {
      // Start reading aloud
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.onend = () => setIsPlaying(false);
      window.speechSynthesis.cancel(); // Stop any previous speech
      window.speechSynthesis.speak(utter);
      setIsPlaying(true);
    } else {
      // Stop reading aloud
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Styles inspired by ChatGPT/Perplexity
  const assistantStyle =
    "w-full fade-in text-base text-gray-800 py-2 px-0";
  const userStyle = cn(
    "fade-in self-end max-w-[80%] text-base py-2 px-4 rounded-lg border relative transition-colors",
    "bg-gray-100 border-gray-200 text-gray-900 shadow-none"
  );

  return (
    <div
      className={sender === "user" ? "w-full flex justify-end" : "w-full flex justify-start"}
    >
      <div
        className={sender === "user" ? userStyle : assistantStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={sender === "assistant" ? { background: "none", border: "none", boxShadow: "none" } : {}}
      >
        {/* Message or Edit Box */}
        <div className="whitespace-pre-wrap">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                className="border rounded px-2 py-1 text-base resize-none"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                rows={2}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  className="px-3 py-1 rounded bg-blue-500 text-white text-xs"
                  onClick={handleEditSave}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs"
                  onClick={handleEditCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            text
          )}
        </div>

        {/* Gap between messages */}
        <div className="h-2" />

        {/* User Action Buttons: hidden by default, shown below message on hover/long-press, do not move UI */}
        {sender === "user" && (
          <div className="flex gap-2 mt-1 justify-end min-h-[28px]">
            {showActions && (
              <>
                {/* Copy */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={handleCopy}>
                      {copied ? (
                        <ClipboardCheck className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Clipboard className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/* Edit */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={handleEditClick}>
                      <Edit2 className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit &amp; Resend</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
            {/* Audio Icon: always visible */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleAudioClick}>
                  {isPlaying ? (
                    <Square className="w-4 h-4 text-blue-600 cursor-pointer" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Stop" : "Read Aloud"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Assistant-only Actions */}
        {sender === "assistant" && (
          <div className="flex items-center gap-2 mt-2 justify-start min-h-[28px]">
            {showActions && (
              <>
                {/* Copy */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={handleCopy}>
                      {copied ? (
                        <ClipboardCheck className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Clipboard className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
            {/* Like */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ThumbsUp className="w-4 h-4 text-gray-400 hover:text-green-600 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Like</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Dislike */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ThumbsDown className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dislike</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Audio Icon: always visible */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleAudioClick}>
                  {isPlaying ? (
                    <Square className="w-4 h-4 text-blue-600 cursor-pointer" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Stop" : "Read Aloud"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Typing Indicator */}
        {loading && sender === "assistant" && (
          <div className="typing-dots mt-1">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;