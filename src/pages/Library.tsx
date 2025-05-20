
import React, { useState, useEffect } from 'react';
import { BookmarkPlus, Bookmark, ListMusic } from 'lucide-react';
import TrackList from '@/components/TrackList';
import { Button } from '@/components/ui/button';
import { getAllTracks, Track } from '@/services/musicService';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

const Library = () => {
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [libraryTracks, setLibraryTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load all tracks
    const tracks = getAllTracks();
    setAllTracks(tracks);
    
    // Load library from localStorage
    const savedLibrary = localStorage.getItem('musicLibrary');
    if (savedLibrary) {
      try {
        const libraryTrackIds = JSON.parse(savedLibrary) as string[];
        const libraryTracks = tracks.filter(track => 
          libraryTrackIds.includes(track.id)
        );
        setLibraryTracks(libraryTracks);
      } catch (error) {
        console.error('Failed to load library:', error);
        setLibraryTracks([]);
      }
    }
  }, []);

  const isInLibrary = (trackId: string) => {
    return libraryTracks.some(track => track.id === trackId);
  };

  const addToLibrary = (track: Track) => {
    if (isInLibrary(track.id)) return;
    
    const updatedLibrary = [...libraryTracks, track];
    setLibraryTracks(updatedLibrary);
    
    // Save to localStorage
    const trackIds = updatedLibrary.map(t => t.id);
    localStorage.setItem('musicLibrary', JSON.stringify(trackIds));
    
    toast({
      title: "Added to Library",
      description: `${track.title} by ${track.artist} added to your library`,
      duration: 3000,
    });
  };

  const removeFromLibrary = (trackId: string) => {
    const updatedLibrary = libraryTracks.filter(track => track.id !== trackId);
    setLibraryTracks(updatedLibrary);
    
    // Save to localStorage
    const trackIds = updatedLibrary.map(t => t.id);
    localStorage.setItem('musicLibrary', JSON.stringify(trackIds));
    
    toast({
      title: "Removed from Library",
      description: "Track removed from your library",
      duration: 3000,
    });
  };

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
        <div className="flex items-center mb-6">
          <ListMusic className="h-8 w-8 text-music-accent mr-3" />
          <h1 className="text-3xl font-bold">Your Library</h1>
        </div>
        
        {libraryTracks.length > 0 ? (
          <>
            <p className="text-music-text-secondary mb-6">
              You have {libraryTracks.length} tracks in your library
            </p>
            <TrackList
              tracks={libraryTracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
              onPlayPause={handlePlayPause}
              rightAction={(track) => (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-music-text-secondary hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromLibrary(track.id);
                  }}
                  title="Remove from library"
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              )}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-music-text-secondary mb-4">Your library is empty</p>
            <p className="text-sm text-music-text-secondary mb-6">
              Add tracks to your library by clicking the bookmark icon on any track
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Recommended Tracks</h2>
              <TrackList
                tracks={allTracks.slice(0, 5)}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onTrackSelect={handleTrackSelect}
                onPlayPause={handlePlayPause}
                rightAction={(track) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      isInLibrary(track.id) 
                        ? "text-music-accent hover:text-music-accent-hover" 
                        : "text-music-text-secondary hover:text-white"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      isInLibrary(track.id) 
                        ? removeFromLibrary(track.id)
                        : addToLibrary(track);
                    }}
                    title={isInLibrary(track.id) ? "Remove from library" : "Add to library"}
                  >
                    {isInLibrary(track.id) ? (
                      <Bookmark className="h-5 w-5" />
                    ) : (
                      <BookmarkPlus className="h-5 w-5" />
                    )}
                  </Button>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
