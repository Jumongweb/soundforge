
import { useState, useEffect } from 'react';
import { Track } from '@/services/musicService';
import { useToast } from '@/components/ui/use-toast';

export interface Playlist {
  id: string;
  name: string;
  trackIds: string[];
}

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { toast } = useToast();

  // Default playlists
  const defaultPlaylists: Playlist[] = [
    { id: 'top-2023', name: 'Your Top Songs 2023', trackIds: [] },
    { id: 'workout', name: 'Workout Mix', trackIds: [] },
    { id: 'chill', name: 'Chill Vibes', trackIds: [] },
    { id: 'focus', name: 'Focus Flow', trackIds: [] },
    { id: 'road-trip', name: 'Road Trip', trackIds: [] }
  ];

  useEffect(() => {
    // Load playlists from localStorage
    const savedPlaylists = localStorage.getItem('musicPlaylists');
    if (savedPlaylists) {
      try {
        const parsedPlaylists = JSON.parse(savedPlaylists);
        setPlaylists(parsedPlaylists);
      } catch (error) {
        console.error('Failed to load playlists:', error);
        // If loading fails, initialize with default playlists
        initializeDefaultPlaylists();
      }
    } else {
      // Initialize with default playlists if none exist
      initializeDefaultPlaylists();
    }
  }, []);

  const initializeDefaultPlaylists = () => {
    setPlaylists(defaultPlaylists);
    localStorage.setItem('musicPlaylists', JSON.stringify(defaultPlaylists));
  };

  const getPlaylist = (playlistId: string): Playlist | undefined => {
    return playlists.find(p => p.id === playlistId);
  };

  const addToPlaylist = (playlistId: string, track: Track) => {
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        // Only add if track is not already in playlist
        if (!playlist.trackIds.includes(track.id)) {
          return {
            ...playlist,
            trackIds: [...playlist.trackIds, track.id]
          };
        }
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);
    localStorage.setItem('musicPlaylists', JSON.stringify(updatedPlaylists));
    
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      toast({
        title: "Added to playlist",
        description: `${track.title} added to ${playlist.name}`,
        duration: 3000,
      });
    }
  };

  const removeFromPlaylist = (playlistId: string, trackId: string) => {
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          trackIds: playlist.trackIds.filter(id => id !== trackId)
        };
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);
    localStorage.setItem('musicPlaylists', JSON.stringify(updatedPlaylists));
    
    toast({
      title: "Removed from playlist",
      description: "Track removed from playlist",
      duration: 3000,
    });
  };

  return {
    playlists,
    getPlaylist,
    addToPlaylist,
    removeFromPlaylist
  };
}
