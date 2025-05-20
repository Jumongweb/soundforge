
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying }) => {
  return (
    <div className={`flex items-end justify-center h-8 gap-1 ${isPlaying ? 'opacity-100' : 'opacity-50'}`}>
      <div 
        className={`w-1 h-2 bg-music-accent rounded-full ${isPlaying ? 'animate-equalizer-1' : ''}`}
      ></div>
      <div 
        className={`w-1 h-4 bg-music-accent rounded-full ${isPlaying ? 'animate-equalizer-2' : ''}`}
      ></div>
      <div 
        className={`w-1 h-3 bg-music-accent rounded-full ${isPlaying ? 'animate-equalizer-3' : ''}`}
      ></div>
      <div 
        className={`w-1 h-1 bg-music-accent rounded-full ${isPlaying ? 'animate-equalizer-4' : ''}`}
      ></div>
      <div 
        className={`w-1 h-2 bg-music-accent rounded-full ${isPlaying ? 'animate-equalizer-2' : ''}`}
      ></div>
    </div>
  );
};

export default Visualizer;
