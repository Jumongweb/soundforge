
import { useState, useEffect } from 'react';
import { Track } from '@/services/musicService';
import { useToast } from '@/components/ui/use-toast';

export function useLibrary() {
  const [libraryTracks, setLibraryTracks] = useState<Track[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = () => {
    // Get library from localStorage
    const savedLibrary = localStorage.getItem('musicLibrary');
    if (savedLibrary) {
      try {
        const parsedLibrary = JSON.parse(savedLibrary);
        setLibraryTracks(parsedLibrary);
      } catch (error) {
        console.error('Failed to load library:', error);
      }
    }
  };

  const isInLibrary = (trackId: string): boolean => {
    const savedLibrary = localStorage.getItem('musicLibrary');
    if (!savedLibrary) return false;
    
    try {
      const parsedLibrary = JSON.parse(savedLibrary);
      
      // If it's an array of IDs
      if (Array.isArray(parsedLibrary) && typeof parsedLibrary[0] === 'string') {
        return parsedLibrary.includes(trackId);
      }
      
      // If it's an array of Track objects
      if (Array.isArray(parsedLibrary) && typeof parsedLibrary[0] === 'object') {
        return parsedLibrary.some((track: Track) => track.id === trackId);
      }
      
      return false;
    } catch {
      return false;
    }
  };

  const addToLibrary = (track: Track) => {
    const savedLibrary = localStorage.getItem('musicLibrary');
    let libraryTracks: Track[] = [];
    
    if (savedLibrary) {
      try {
        const parsed = JSON.parse(savedLibrary);
        
        // Handle both old format (array of IDs) and new format (array of Track objects)
        if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
          // Old format - convert to new format
          libraryTracks = [];
        } else {
          libraryTracks = parsed;
        }
      } catch (error) {
        console.error('Failed to parse library:', error);
      }
    }
    
    // Only add if not already in library
    if (!libraryTracks.some(t => t.id === track.id)) {
      libraryTracks.push(track);
      localStorage.setItem('musicLibrary', JSON.stringify(libraryTracks));
      
      toast({
        title: "Added to Library",
        description: `${track.title} by ${track.artist} added to your library`,
        duration: 3000,
      });
    }
  };

  const removeFromLibrary = (trackId: string) => {
    const savedLibrary = localStorage.getItem('musicLibrary');
    if (!savedLibrary) return;
    
    try {
      const parsedLibrary = JSON.parse(savedLibrary);
      
      // Handle both formats
      if (Array.isArray(parsedLibrary)) {
        if (typeof parsedLibrary[0] === 'string') {
          // Old format - array of IDs
          const updatedIds = parsedLibrary.filter(id => id !== trackId);
          localStorage.setItem('musicLibrary', JSON.stringify(updatedIds));
        } else {
          // New format - array of Track objects
          const updatedTracks = parsedLibrary.filter((track: Track) => track.id !== trackId);
          localStorage.setItem('musicLibrary', JSON.stringify(updatedTracks));
        }
      }
      
      toast({
        title: "Removed from Library",
        description: "Track removed from your library",
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to remove from library:', error);
    }
  };

  return {
    isInLibrary,
    addToLibrary,
    removeFromLibrary,
    loadLibrary
  };
}
