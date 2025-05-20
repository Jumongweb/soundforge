
import React from 'react';
import { Play } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audio: string;
  duration: number;
  tags: string[];
  genre: string;
}

interface FeaturedSectionProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ tracks, onTrackSelect }) => {
  // Take the first 5 tracks for the featured section
  const featuredTracks = tracks.slice(0, 5);
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Tracks</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {featuredTracks.map(track => (
          <div 
            key={track.id}
            className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-colors group cursor-pointer"
            onClick={() => onTrackSelect(track)}
          >
            <div className="relative mb-4">
              <img 
                src={track.cover} 
                alt={track.title} 
                className="w-full aspect-square object-cover rounded-md shadow-lg"
              />
              <button className="absolute bottom-2 right-2 bg-music-accent rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Play className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <h3 className="font-medium truncate">{track.title}</h3>
            <p className="text-sm text-music-text-secondary truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
