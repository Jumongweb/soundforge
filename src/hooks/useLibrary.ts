
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
      const libraryTrackIds = JSON.parse(savedLibrary) as string[];
      return libraryTrackIds.includes(trackId);
    } catch {
      return false;
    }
  };

  const addToLibrary = (track: Track) => {
    const savedLibrary = localStorage.getItem('musicLibrary');
    let libraryTrackIds: string[] = [];
    
    if (savedLibrary) {
      try {
        libraryTrackIds = JSON.parse(savedLibrary);
      } catch (error) {
        console.error('Failed to parse library:', error);
      }
    }
    
    // Only add if not already in library
    if (!libraryTrackIds.includes(track.id)) {
      libraryTrackIds.push(track.id);
      localStorage.setItem('musicLibrary', JSON.stringify(libraryTrackIds));
      
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
      const libraryTrackIds = JSON.parse(savedLibrary) as string[];
      const updatedIds = libraryTrackIds.filter(id => id !== trackId);
      localStorage.setItem('musicLibrary', JSON.stringify(updatedIds));
      
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
    removeFromLibrary
  };
}
