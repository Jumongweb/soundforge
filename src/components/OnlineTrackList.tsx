
import React from 'react';
import { Play, Pause, Music, Download } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface OnlineTrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onPlayPause: () => void;
  onDownload: (track: Track) => void;
}

const OnlineTrackList: React.FC<OnlineTrackListProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onPlayPause,
  onDownload
}) => {
  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      onPlayPause();
    } else {
      onTrackSelect(track);
    }
  };

  return (
    <div className="w-full mt-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-left text-music-text-secondary">
            <th className="pb-3 pl-4 w-12">#</th>
            <th className="pb-3 w-3/5">TITLE</th>
            <th className="pb-3">ALBUM</th>
            <th className="pb-3">STREAM</th>
            <th className="pb-3 pr-4 text-right">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            
            return (
              <tr 
                key={track.id}
                className={`group hover:bg-[#282828] transition-colors ${isCurrentTrack ? 'bg-[#282828]' : ''}`}
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
                      onClick={() => handleTrackClick(track)}
                    >
                      {isCurrentTrack && isPlaying ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3 ml-0.5" />
                      )}
                    </Button>
                  </div>
                </td>
                <td className="py-3" onClick={() => handleTrackClick(track)}>
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
                    <Wifi className="w-3 h-3 mr-1" />
                    Streaming
                  </Badge>
                </td>
                <td className="py-3 pr-4 text-right">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-music-accent text-music-accent hover:bg-music-accent hover:text-white"
                    onClick={() => onDownload(track)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OnlineTrackList;
