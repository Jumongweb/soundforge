
import React from 'react';
import { cn } from '@/lib/utils';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audio: string;
  duration: number;
  tags: string[];
  genre: string;
}

interface PlayerInfoProps {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ track, isPlaying, currentTime }) => {
  // Calculate progress percentage for the circular progress indicator
  const progressPercentage = track.duration > 0 ? (currentTime / track.duration) * 100 : 0;
  
  return (
    <div className="flex items-center gap-4 w-64">
      <div className="relative">
        {/* Circular album artwork with progress indicator */}
        <div 
          className="h-16 w-16 rounded-full relative overflow-hidden border-2 border-music-accent shadow-lg"
          style={{
            background: `conic-gradient(#9b87f5 ${progressPercentage}%, transparent ${progressPercentage}%, transparent 100%)`
          }}
        >
          <div className="absolute inset-1 rounded-full overflow-hidden">
            <img 
              src={track.cover} 
              alt={`${track.title} cover`} 
              className={cn(
                "h-full w-full object-cover rounded-full",
                isPlaying && "animate-disc-spin"
              )}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col overflow-hidden">
        <h4 className="text-sm font-medium truncate">{track.title}</h4>
        <p className="text-xs text-music-text-secondary truncate">{track.artist}</p>
        <p className="text-xs text-music-text-secondary/70 truncate">{track.album}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
