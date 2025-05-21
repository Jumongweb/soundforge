
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TrackList from '@/components/TrackList';
import { Track, getAllTracks } from '@/services/musicService';
import { Button } from '@/components/ui/button';
import { usePlaylists, Playlist } from '@/hooks/usePlaylists';
import { ListMusic } from 'lucide-react';

interface PlaylistPageProps {
  onTrackSelect: (track: Track) => void;
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ onTrackSelect }) => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { playlists, getPlaylist, removeFromPlaylist } = usePlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const allTracks = getAllTracks();
  
  useEffect(() => {
    if (playlistId) {
      const foundPlaylist = getPlaylist(playlistId);
      setPlaylist(foundPlaylist || null);

      if (foundPlaylist) {
        // Get the tracks that are in the playlist
        const tracks = allTracks.filter(track => 
          foundPlaylist.trackIds.includes(track.id)
        );
        setPlaylistTracks(tracks);
      }
    }
  }, [playlistId, playlists]);
  
  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    onTrackSelect(track);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleRemove = (track: Track) => {
    if (playlistId) {
      removeFromPlaylist(playlistId, track.id);
    }
  };
  
  if (!playlist) {
    return (
      <div className="pt-8 pb-28 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Playlist not found</h1>
          <Button variant="outline" asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="bg-music-accent/30 p-6 rounded-lg mr-6">
            <ListMusic className="w-16 h-16" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{playlist.name}</h1>
            <p className="text-music-text-secondary mt-1">
              {playlistTracks.length} {playlistTracks.length === 1 ? 'track' : 'tracks'}
            </p>
          </div>
        </div>
        
        {playlistTracks.length > 0 ? (
          <TrackList 
            tracks={playlistTracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
            onPlayPause={handlePlayPause}
            rightAction={(track) => (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemove(track)}
                className="text-music-text-secondary hover:text-white"
              >
                Remove
              </Button>
            )}
          />
        ) : (
          <div className="text-center py-12 bg-[#121212] rounded-lg">
            <p className="text-music-text-secondary mb-4">This playlist is empty</p>
            <Button asChild variant="outline">
              <a href="/search">Add tracks from Search</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
