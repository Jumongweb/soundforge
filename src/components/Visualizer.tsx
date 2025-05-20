
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isPlaying: boolean;
  type?: 'bars' | 'wave' | 'circle';
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying, type = 'bars' }) => {
  if (type === 'wave') {
    return (
      <div className={`flex items-center justify-center h-8 gap-0.5 ${isPlaying ? 'opacity-100' : 'opacity-50'}`}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={`w-0.5 bg-music-accent rounded-full ${isPlaying ? `animate-equalizer-${(i % 4) + 1}` : 'h-1'}`}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              height: isPlaying ? undefined : '4px'
            }}
          ></div>
        ))}
      </div>
    );
  }
  
  if (type === 'circle') {
    return (
      <div className={`relative h-8 w-8 ${isPlaying ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`absolute inset-0 rounded-full border-2 border-music-accent ${isPlaying ? 'animate-pulse-slow' : ''}`}></div>
        <div className={`absolute inset-1 rounded-full border border-music-accent/60 ${isPlaying ? 'animate-pulse-slow' : ''}`} 
             style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute inset-2 rounded-full border border-music-accent/30 ${isPlaying ? 'animate-pulse-slow' : ''}`}
             style={{ animationDelay: '1s' }}></div>
      </div>
    );
  }
  
  // Default bar visualizer
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
