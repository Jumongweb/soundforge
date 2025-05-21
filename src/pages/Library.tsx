
import React, { useState, useEffect } from 'react';
import { Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TrackList from '@/components/TrackList';
import { Track, getAllTracks } from '@/services/musicService';
import { useLibrary } from '@/hooks/useLibrary';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

interface LibraryProps {
  onTrackSelect: (track: Track) => void;
}

const Library: React.FC<LibraryProps> = ({ onTrackSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [library, setLibrary] = useState<Track[]>([]);
  const [filteredLibrary, setFilteredLibrary] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { removeFromLibrary } = useLibrary();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load library tracks
    loadLibraryTracks();
  }, []);
  
  const loadLibraryTracks = () => {
    const savedLibrary = localStorage.getItem('musicLibrary');
    const allTracks = getAllTracks();
    
    if (savedLibrary) {
      try {
        const parsed = JSON.parse(savedLibrary);
        
        let libraryTracks: Track[] = [];
        
        // Handle both formats
        if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
          // Old format - array of IDs
          const libraryIds = parsed as string[];
          libraryTracks = allTracks.filter(track => libraryIds.includes(track.id));
        } else if (Array.isArray(parsed)) {
          // New format - array of Track objects
          libraryTracks = parsed as Track[];
        }
        
        setLibrary(libraryTracks);
        setFilteredLibrary(libraryTracks);
      } catch (error) {
        console.error('Failed to load library:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your music library',
          variant: 'destructive',
        });
      }
    }
  };
  
  useEffect(() => {
    // Filter library based on search query
    if (searchQuery.trim() === '') {
      setFilteredLibrary(library);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = library.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
    );
    
    setFilteredLibrary(filtered);
  }, [searchQuery, library]);
  
  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    onTrackSelect(track);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleRemoveFromLibrary = (track: Track) => {
    removeFromLibrary(track.id);
    
    // Update local state
    setLibrary(prev => prev.filter(t => t.id !== track.id));
    setFilteredLibrary(prev => prev.filter(t => t.id !== track.id));
    
    toast({
      title: 'Removed from Library',
      description: `"${track.title}" has been removed from your library`,
    });
  };
  
  const renderRemoveButton = (track: Track) => (
    <Button
      variant="outline"
      size="sm"
      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      onClick={(e) => {
        e.stopPropagation();
        handleRemoveFromLibrary(track);
      }}
    >
      <Heart className="h-4 w-4 fill-current" />
      Remove
    </Button>
  );
  
  return (
    <div className="pt-8 pb-28 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Library</h1>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-music-text-secondary" />
          <Input
            type="text"
            placeholder="Search your library..."
            className="pl-10 bg-music-dark-alt border-music-accent/30 focus:border-music-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {filteredLibrary.length > 0 ? (
          <>
            {searchQuery.trim() !== '' && (
              <p className="text-sm text-music-text-secondary mb-4">
                Found {filteredLibrary.length} results for "{searchQuery}"
              </p>
            )}
            
            <TrackList
              tracks={filteredLibrary}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
              onPlayPause={handlePlayPause}
              rightAction={renderRemoveButton}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-3">Your library is empty</h3>
            <p className="text-music-text-secondary mb-6">
              {searchQuery.trim() !== '' ? 
                'No tracks found matching your search.' :
                'Add tracks to your library to see them here.'}
            </p>
            <Link to="/search">
              <Button className="bg-music-accent hover:bg-music-accent-hover">
                Browse Music
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
