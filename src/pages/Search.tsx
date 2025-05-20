
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TrackList from '@/components/TrackList';
import { getAllTracks, Track } from '@/services/musicService';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load all tracks initially
    const allTracks = getAllTracks();
    setTracks(allTracks);
    setFilteredTracks(allTracks);
  }, []);

  useEffect(() => {
    // Filter tracks based on search query
    if (searchQuery.trim() === '') {
      setFilteredTracks(tracks);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = tracks.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query) ||
      track.genre.toLowerCase().includes(query) ||
      track.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setFilteredTracks(filtered);
  }, [searchQuery, tracks]);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="pt-8 pb-28 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Music</h1>
        
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-music-text-secondary" />
          <Input
            type="text"
            placeholder="Search by title, artist, album, genre or tag..."
            className="pl-10 bg-music-dark-alt border-music-accent/30 focus:border-music-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {searchQuery.trim() !== '' && (
          <p className="text-sm text-music-text-secondary mb-4">
            Found {filteredTracks.length} results for "{searchQuery}"
          </p>
        )}
        
        {filteredTracks.length > 0 ? (
          <TrackList
            tracks={filteredTracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
            onPlayPause={handlePlayPause}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-music-text-secondary">No tracks found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
