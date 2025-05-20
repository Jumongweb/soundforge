
import React, { useState } from 'react';
import FeaturedSection from '@/components/FeaturedSection';
import TrackList from '@/components/TrackList';
import { getAllTracks, Track } from '@/services/musicService';

interface HomeProps {
  onTrackSelect: (track: Track) => void;
}

const Home: React.FC<HomeProps> = ({ onTrackSelect }) => {
  const tracks = getAllTracks();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    onTrackSelect(track);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Get featured tracks (first 4 for demo)
  const featuredTracks = tracks.slice(0, 4);
  
  return (
    <div className="pt-8 pb-28 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to MusicMix</h1>
        
        <FeaturedSection 
          title="Featured Tracks" 
          tracks={featuredTracks}
          onTrackSelect={handleTrackSelect}
        />
        
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">All Tracks</h2>
          <TrackList 
            tracks={tracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
            onPlayPause={handlePlayPause}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
