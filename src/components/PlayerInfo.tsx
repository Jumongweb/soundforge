
import React from 'react';

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
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ track }) => {
  return (
    <div className="flex items-center gap-3 w-64">
      <img 
        src={track.cover} 
        alt={`${track.title} cover`} 
        className="h-14 w-14 object-cover rounded-md shadow-md"
      />
      
      <div className="flex flex-col overflow-hidden">
        <h4 className="text-sm font-medium truncate">{track.title}</h4>
        <p className="text-xs text-music-text-secondary truncate">{track.artist}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
