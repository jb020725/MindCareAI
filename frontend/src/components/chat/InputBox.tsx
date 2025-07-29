// src/components/chat/InputBox.tsx
import { useState, useRef } from "react";
import { Mic, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  onSend: (message: string) => void;
  onRecord: () => void;
  isLoading?: boolean;
  disableSend?: boolean;
}

const InputBox = ({ onSend, onRecord, isLoading = false, disableSend = false }: Props) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-end w-full border rounded-xl px-4 py-2 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700">
        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-grow resize-none border-none bg-transparent text-sm focus:outline-none focus:ring-0 scrollbar-hide dark:text-white"
        />

        {/* Mic + Send Grouped */}
        <div className="flex items-center gap-2 ml-2">
          {/* Mic */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onRecord}
                className="text-gray-500 hover:text-blue-600 dark:hover:text-white transition"
              >
                <Mic className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Record Voice</TooltipContent>
          </Tooltip>

          {/* Send */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleSend}
                disabled={disableSend || input.trim() === "" || isLoading}
                className={cn(
                  "text-gray-500 hover:text-blue-600 dark:hover:text-white transition",
                  (disableSend || input.trim() === "") && "opacity-40 cursor-not-allowed"
                )}
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Send</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InputBox;
