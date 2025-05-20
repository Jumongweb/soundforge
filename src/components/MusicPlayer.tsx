import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
import PlayerInfo from './PlayerInfo';
import { formatTime } from '@/lib/utils';

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

interface MusicPlayerProps {
  currentTrack: Track | null;
  tracks: Track[];
  onTrackChange: (track: Track) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack, tracks, onTrackChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    // Reset state when track changes
    if (currentTrack) {
      setCurrentTime(0);
      setIsPlaying(false);
      
      // Small delay to ensure the audio element loads the new track
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (volumeValue === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleNext = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      onTrackChange(tracks[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      onTrackChange(tracks[prevIndex]);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  // Render nothing if there's no current track
  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-music-dark-alt p-3 border-t border-gray-800 z-50">
      <audio
        ref={audioRef}
        src={currentTrack.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <PlayerInfo 
          track={currentTrack} 
          isPlaying={isPlaying}
          currentTime={currentTime}
        />
        
        <div className="flex flex-col items-center flex-1 max-w-xl px-4">
          <PlayerControls 
            isPlaying={isPlaying} 
            onPlayPause={handlePlayPause} 
            onPrevious={handlePrevious} 
            onNext={handleNext} 
          />
          
          <ProgressBar 
            currentTime={currentTime} 
            duration={duration} 
            onSeek={handleSeek} 
          />
        </div>
        
        <VolumeControl 
          volume={volume} 
          isMuted={isMuted} 
          onVolumeChange={handleVolumeChange} 
          onMuteToggle={handleMuteToggle} 
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
