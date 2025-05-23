
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Track } from '@/services/musicService';
import { Badge } from '@/components/ui/badge';

interface RecommendationSectionProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ 
  tracks,
  onTrackSelect
}) => {
  if (!tracks || tracks.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">AI Recommendations</h2>
        <Sparkles className="text-yellow-400" size={20} />
      </div>
      
      <p className="text-sm text-music-text-secondary mb-4">
        Personalized music recommendations based on your listening history
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks.map(track => (
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
              <div className="absolute bottom-2 right-2 bg-music-accent rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <h3 className="font-medium truncate">{track.title}</h3>
            <p className="text-sm text-music-text-secondary truncate">{track.artist}</p>
            <div className="mt-2">
              <Badge variant="outline" className="bg-[#333] text-xs font-normal text-yellow-400 border-yellow-400/50">
                AI Recommended
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
