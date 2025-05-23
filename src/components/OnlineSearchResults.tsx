
import React from 'react';
import OnlineTrackList from '@/components/OnlineTrackList';
import { Track } from '@/services/musicService';
import { useIsMobile } from '@/hooks/use-mobile';

interface OnlineSearchResultsProps {
  onlineTracks: Track[];
  searchQuery: string;
  isSearching: boolean;
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onPlayPause: () => void;
  onDownload: (track: Track) => void;
}

const OnlineSearchResults: React.FC<OnlineSearchResultsProps> = ({
  onlineTracks,
  searchQuery,
  isSearching,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onPlayPause,
  onDownload
}) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {isSearching ? (
        <div className="text-center py-12">
          <p className="text-music-text-secondary mb-2">Searching online for "{searchQuery}"...</p>
          <div className="w-8 h-8 border-t-2 border-music-accent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <>
          {onlineTracks.length > 0 ? (
            <OnlineTrackList
              tracks={onlineTracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={onTrackSelect}
              onPlayPause={onPlayPause}
              onDownload={onDownload}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-music-text-secondary">
                {searchQuery.trim() === '' 
                  ? 'Enter a search term and click "Search Online" to find music' 
                  : 'No online tracks found for your search.'}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OnlineSearchResults;
