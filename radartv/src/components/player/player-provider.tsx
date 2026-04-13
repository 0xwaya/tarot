'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { liveTrack, type Track } from '@/content/site';

type PlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  playTrack: (track: Track) => Promise<void>;
  togglePlayback: () => Promise<void>;
  setVolume: (volume: number) => void;
  stop: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.72);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const storedVolume = window.localStorage.getItem('radartv-volume');
    if (storedVolume) {
      const parsed = Number(storedVolume);
      if (!Number.isNaN(parsed)) {
        audio.volume = parsed;
        setVolumeState(parsed);
      }
    } else {
      audio.volume = 0.72;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, []);

  const playTrack = async (track: Track) => {
    if (!track.url || !audioRef.current) {
      if (track.externalUrl) {
        window.open(track.externalUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (audioRef.current.src !== track.url) {
      audioRef.current.src = track.url;
    }

    setCurrentTrack(track);
    await audioRef.current.play();
  };

  const togglePlayback = async () => {
    if (!audioRef.current) {
      return;
    }

    if (!currentTrack) {
      await playTrack(liveTrack);
      return;
    }

    if (audioRef.current.paused) {
      await audioRef.current.play();
      return;
    }

    audioRef.current.pause();
  };

  const setVolume = (nextVolume: number) => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = nextVolume;
    setVolumeState(nextVolume);
    window.localStorage.setItem('radartv-volume', String(nextVolume));
  };

  const stop = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const value = { currentTrack, isPlaying, volume, playTrack, togglePlayback, setVolume, stop };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }

  return context;
}
