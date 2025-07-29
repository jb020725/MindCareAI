import { useEffect, useState } from "react";
import { playAudioGlobal, stopCurrentAudio } from "../../lib/audioController";

interface Props {
  url: string;
  autoPlay?: boolean;
}

const AudioPlayer = ({ url, autoPlay = false }: Props) => {
  const [playing, setPlaying] = useState(autoPlay);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    const instance = playAudioGlobal(url);
    instance.onended = () => setPlaying(false);
    setAudio(instance);
    setPlaying(true);
  };

  const handlePause = () => {
    audio?.pause();
    setPlaying(false);
  };

  const handleStop = () => {
    stopCurrentAudio();
    setPlaying(false);
  };

  useEffect(() => {
    if (autoPlay) handlePlay();

    return () => {
      stopCurrentAudio();
      setPlaying(false);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 p-1 rounded-xl bg-white shadow-sm border border-gray-200">
      {!playing ? (
        <button
          onClick={handlePlay}
          aria-label="Play audio"
          className="text-lg hover:text-blue-600 focus:outline-none focus:ring"
        >
          ▶️
        </button>
      ) : (
        <button
          onClick={handlePause}
          aria-label="Pause audio"
          className="text-lg hover:text-yellow-500 focus:outline-none focus:ring"
        >
          ⏸
        </button>
      )}
      <button
        onClick={handleStop}
        aria-label="Stop audio"
        className="text-lg hover:text-red-500 focus:outline-none focus:ring"
      >
        ⏹
      </button>
    </div>
  );
};

export default AudioPlayer;
