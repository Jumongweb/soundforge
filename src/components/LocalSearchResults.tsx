
import React from 'react';
import { Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackList from '@/components/TrackList';
import { Track } from '@/services/musicService';

interface LocalSearchResultsProps {
  filteredTracks: Track[];
  searchQuery: string;
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onPlayPause: () => void;
  onOnlineSearch: () => void;
}

const LocalSearchResults: React.FC<LocalSearchResultsProps> = ({
  filteredTracks,
  searchQuery,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onPlayPause,
  onOnlineSearch
}) => {
  return (
    <>
      {searchQuery.trim() !== '' && (
        <p className="text-sm text-music-text-secondary mb-4">
          Found {filteredTracks.length} results in your library for "{searchQuery}"
        </p>
      )}
      
      {filteredTracks.length > 0 ? (
        <TrackList
          tracks={filteredTracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTrackSelect={onTrackSelect}
          onPlayPause={onPlayPause}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-music-text-secondary">No tracks found matching your search.</p>
          <Button 
            variant="outline" 
            className="mt-4 bg-music-accent hover:bg-music-accent-hover text-white border-none"
            onClick={onOnlineSearch}
          >
            <Wifi className="mr-2" />
            Search Online Instead
          </Button>
        </div>
      )}
    </>
  );
};

export default LocalSearchResults;
