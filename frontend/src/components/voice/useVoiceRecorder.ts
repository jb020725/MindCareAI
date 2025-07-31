// src/components/voice/useVoiceRecorder.ts
import { useRef, useState } from "react";

export const useVoiceRecorder = (
  onResult: (transcript: string) => void,
  mode: string
) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const startRecording = async () => {
    console.log("🎤 Starting voice recording");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunks.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", blob, "voice.webm");
        formData.append("mode", mode);

        const res = await fetch("http://127.0.0.1:8000/voice", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.transcript) {
          onResult(data.transcript);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Stop after 3 seconds of silence
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 180000);
    } catch (err) {
      console.error("🎤 Voice recording error:", err);
      setIsRecording(false);
    }
  };

  return { startRecording, stopRecording, isRecording };
};
