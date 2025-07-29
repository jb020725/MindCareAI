// src/components/VoiceRecorder.tsx
import { useState, useRef } from "react";
import { ChatMessage } from "@/hooks/useChatLogic";

interface Props {
  selectedMode: string;
  addMessage: (msg: ChatMessage) => void;
  handleAssistantReply: (msg: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
}

const VoiceRecorder = ({
  selectedMode,
  addMessage,
  handleAssistantReply,
  setLoading,
}: Props) => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(audioStream);

      const recorder = new MediaRecorder(audioStream);
      recorder.ondataavailable = (e) => chunks.current.push(e.data);

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied or failed:", err);
      alert("🎙️ Please allow microphone access to use voice input.");
    }
  };

  const stopAndSend = () => {
    if (!mediaRecorderRef.current || !recording) return;

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      chunks.current = [];
      const file = new File([blob], "recording.webm");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", selectedMode);
      setLoading(true);

      try {
        const res = await fetch("http://127.0.0.1:8000/voice", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.transcript) {
          addMessage({ sender: "user", text: data.transcript });
        }

        handleAssistantReply({
          sender: "assistant",
          text: data.reply || "⚠️ No response from assistant.",
        });
      } catch {
        handleAssistantReply({
          sender: "assistant",
          text: "⚠️ Voice processing failed.",
        });
      } finally {
        setLoading(false);
        setRecording(false);
        mediaRecorderRef.current = null;
        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };

    mediaRecorderRef.current.stop();
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.onstop = () => {
        chunks.current = [];
        setRecording(false);
        mediaRecorderRef.current = null;
        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
      };
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <>
      {recording ? (
        <div className="flex items-center gap-2">
          <button
            onClick={stopAndSend}
            className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            Send
          </button>
          <button
            onClick={cancelRecording}
            className="text-sm px-3 py-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={startRecording}
          className="text-xl text-gray-700 hover:text-blue-600 transition focus:outline-none"
          aria-label="Start voice input"
        >
          🎤
        </button>
      )}
    </>
  );
};

export default VoiceRecorder;
