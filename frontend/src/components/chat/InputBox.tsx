// src/components/chat/InputBox.tsx
import { RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Send, Mic, Square } from "lucide-react";

interface Props {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  onMicClick: () => void;
  onMicStop: () => void;
  isRecording: boolean;
  loading: boolean;
  inputRef: RefObject<HTMLInputElement>;
}

const InputBox = ({
  input,
  setInput,
  onSend,
  onMicClick,
  onMicStop,
  isRecording,
  loading,
  inputRef,
}: Props) => {
  const handleSubmit = () => {
    if (!input.trim() || loading) return;
    onSend();
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2 flex items-center gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={loading}
          placeholder="Type your message..."
          className="flex-1 h-14 text-base px-4 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={isRecording ? onMicStop : onMicClick}
              className="rounded-full p-2"
              disabled={loading}
            >
              {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{loading ? "Loading..." : isRecording ? "Stop Recording" : "Start Voice"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="ml-1"
              variant="default"
            >
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send Message</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default InputBox;
