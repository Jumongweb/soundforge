
import React from 'react';
import { formatTime } from '@/lib/utils';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  return (
    <div className="w-full flex items-center gap-2 progress-container">
      <span className="text-xs text-music-text-secondary min-w-10">
        {formatTime(currentTime)}
      </span>
      
      <input
        type="range"
        min={0}
        max={duration || 100}
        value={currentTime}
        onChange={handleChange}
        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer progress-bar"
        style={{
          background: `linear-gradient(to right, #9b87f5 ${(currentTime / (duration || 1)) * 100}%, #4D4D4D ${(currentTime / (duration || 1)) * 100}%)`,
        }}
      />
      
      <span className="text-xs text-music-text-secondary min-w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default ProgressBar;
