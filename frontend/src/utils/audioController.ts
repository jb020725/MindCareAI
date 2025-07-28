// src/utils/audioController.ts
let currentAudio: HTMLAudioElement | null = null;

export function playAudioGlobal(url: string) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(url);
  currentAudio = audio;
  audio.play().catch(console.error);
  return audio;
}

export function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}
