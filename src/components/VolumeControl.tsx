
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (newVolume: number[]) => void;
  onMuteToggle: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle
}) => {
  return (
    <div className="flex items-center gap-2 w-32">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onMuteToggle}
        className="text-music-text-secondary hover:text-music-text"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
      
      <Slider
        value={[isMuted ? 0 : volume]}
        max={1}
        step={0.01}
        onValueChange={onVolumeChange}
        className="w-20"
      />
    </div>
  );
};

export default VolumeControl;
