
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ 
  isPlaying, 
  onPlayPause, 
  onPrevious, 
  onNext 
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onPrevious}
        className="text-music-text-secondary hover:text-music-text"
      >
        <SkipBack className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onPlayPause}
        className="bg-white text-black hover:bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 ml-0.5" />
        )}
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onNext}
        className="text-music-text-secondary hover:text-music-text"
      >
        <SkipForward className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PlayerControls;
