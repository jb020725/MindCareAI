// src/components/VoiceRecorder.tsx
import { useState, useRef } from "react";

interface Props {
  selectedMode: string;
  addMessage: (msg: any) => void;
  handleAssistantReply: (text: string, audio_url?: string) => void;
  setLoading: (state: boolean) => void;
  playAudio: (url: string) => void;
}

const VoiceRecorder = ({
  selectedMode,
  addMessage,
  handleAssistantReply,
  setLoading,
  playAudio,
}: Props) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.onstop = async () => {
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
        addMessage({ sender: "user", text: data.transcript });
        handleAssistantReply(data.reply, data.audio_url);
        if (data.audio_url) playAudio(data.audio_url);
      } catch {
        handleAssistantReply("⚠️ Voice processing failed.");
      } finally {
        setLoading(false);
      }
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      className="text-xl text-gray-700 hover:text-blue-600 transition focus:outline-none"
      aria-label={recording ? "Stop recording" : "Start voice input"}
    >
      {recording ? "⏹️" : "🎤"}
    </button>
  );
};

export default VoiceRecorder;
