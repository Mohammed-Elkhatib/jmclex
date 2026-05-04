import { create } from 'zustand';

interface AudioStore {
  isMuted: boolean;
  hasUserInteracted: boolean;
  isPlaying: boolean;
  volume: number;
  toggleMute: () => void;
  setUserInteracted: () => void;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  isMuted: true,
  hasUserInteracted: false,
  isPlaying: false,
  volume: 0.3,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setUserInteracted: () => set({ hasUserInteracted: true }),
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setVolume: (volume: number) => set({ volume: Math.max(0, Math.min(1, volume)) }),
}));
