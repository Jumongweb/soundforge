
import React from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

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

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onPlayPause: () => void;
  rightAction?: (track: Track) => React.ReactNode;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onPlayPause,
  rightAction
}) => {
  const isMobile = useIsMobile();

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      onPlayPause();
    } else {
      onTrackSelect(track);
    }
  };

  // Mobile view - simplified list view
  if (isMobile) {
    return (
      <div className="w-full mt-4">
        <ul className="space-y-2">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            
            return (
              <li 
                key={track.id}
                className={`flex items-center p-2 rounded-md ${isCurrentTrack ? 'bg-[#282828]' : 'hover:bg-[#282828]'}`}
                onClick={() => handleTrackClick(track)}
              >
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    className="h-12 w-12 object-cover rounded-sm shadow-sm"
                  />
                </div>
                <div className="flex-grow overflow-hidden mr-2">
                  <p className={`text-sm font-medium truncate ${isCurrentTrack ? 'text-music-accent' : ''}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-music-text-secondary truncate">{track.artist}</p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {isCurrentTrack && isPlaying ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayPause();
                      }}
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                    >
                      <Play className="h-4 w-4 ml-0.5" />
                    </Button>
                  )}
                  {rightAction && (
                    <span onClick={(e) => e.stopPropagation()}>
                      {rightAction(track)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // Desktop view - table layout
  return (
    <div className="w-full mt-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-left text-music-text-secondary">
            <th className="pb-3 pl-4 w-12">#</th>
            <th className="pb-3 w-3/5">TITLE</th>
            <th className="pb-3">ALBUM</th>
            <th className="pb-3">GENRE</th>
            <th className="pb-3 pr-4 text-right">DURATION</th>
            {rightAction && <th className="pb-3"></th>}
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            
            return (
              <tr 
                key={track.id}
                className={`group hover:bg-[#282828] transition-colors ${isCurrentTrack ? 'bg-[#282828]' : ''}`}
                onClick={() => handleTrackClick(track)}
              >
                <td className="py-3 pl-4 w-12">
                  <div className="flex justify-center items-center w-6">
                    <span className="group-hover:hidden font-light text-music-text-secondary">
                      {index + 1}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hidden group-hover:flex h-6 w-6 p-0 text-white"
                    >
                      {isCurrentTrack && isPlaying ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3 ml-0.5" />
                      )}
                    </Button>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={track.cover} 
                      alt={track.title} 
                      className="h-10 w-10 object-cover rounded-sm shadow-sm"
                    />
                    <div>
                      <p className={`text-sm font-medium ${isCurrentTrack ? 'text-music-accent' : ''}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-music-text-secondary">{track.artist}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-sm text-music-text-secondary">{track.album}</td>
                <td className="py-3">
                  <Badge variant="outline" className="bg-[#333] text-xs font-normal">
                    {track.genre}
                  </Badge>
                </td>
                <td className="py-3 pr-4 text-right text-sm text-music-text-secondary">
                  {formatTime(track.duration)}
                </td>
                {rightAction && (
                  <td 
                    className="py-3 pl-2" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    {rightAction(track)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;
