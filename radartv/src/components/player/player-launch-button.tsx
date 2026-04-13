'use client';

import { ExternalLink, Play } from 'lucide-react';

import { usePlayer } from '@/components/player/player-provider';
import type { Track } from '@/content/site';

type PlayerLaunchButtonProps = {
  track: Track;
  variant?: 'primary' | 'secondary';
};

export function PlayerLaunchButton({ track, variant = 'primary' }: PlayerLaunchButtonProps) {
  const { playTrack } = usePlayer();

  if (!track.url && track.externalUrl) {
    return (
      <a className={`button button--${variant}`} href={track.externalUrl} rel="noreferrer" target="_blank">
        <ExternalLink size={16} />
        Abrir Fuente
      </a>
    );
  }

  return (
    <button className={`button button--${variant}`} onClick={() => void playTrack(track)} type="button">
      <Play size={16} />
      {track.kind === 'live' ? 'Escuchar En Vivo' : 'Reproducir Preview'}
    </button>
  );
}
