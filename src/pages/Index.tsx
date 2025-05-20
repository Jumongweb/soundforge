
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import MusicPlayer from '@/components/MusicPlayer';
import TrackList from '@/components/TrackList';
import TagSelector from '@/components/TagSelector';
import FeaturedSection from '@/components/FeaturedSection';
import Visualizer from '@/components/Visualizer';
import { 
  getAllTracks, 
  getAllTags, 
  getAllGenres, 
  filterTracks,
  Track
} from '@/services/musicService';

const Index = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data
    const allTracksData = getAllTracks();
    const allTagsData = getAllTags();
    const allGenresData = getAllGenres();
    
    setTracks(allTracksData);
    setFilteredTracks(allTracksData);
    setAllTags(allTagsData);
    setAllGenres(allGenresData);
  }, []);

  useEffect(() => {
    // Apply filters when selected tags or genre changes
    const filtered = filterTracks(selectedGenre, selectedTags);
    setFilteredTracks(filtered);
  }, [selectedTags, selectedGenre]);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e1e] to-music-dark text-white">
      <Sidebar className="z-30" />
      
      <main className="ml-64 pt-8 pb-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">MeloMix Player</h1>
            <Visualizer isPlaying={isPlaying} />
          </div>
          
          <FeaturedSection 
            tracks={tracks} 
            onTrackSelect={handleTrackSelect} 
          />
          
          <TagSelector
            tags={allTags}
            genres={allGenres}
            selectedTags={selectedTags}
            selectedGenre={selectedGenre}
            onTagSelect={handleTagSelect}
            onGenreSelect={handleGenreSelect}
          />
          
          <h2 className="text-2xl font-bold mb-4">
            {selectedGenre || (selectedTags.length > 0 ? 'Filtered Tracks' : 'All Tracks')}
          </h2>
          
          <TrackList
            tracks={filteredTracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
            onPlayPause={handlePlayPause}
          />
        </div>
      </main>
      
      {currentTrack && (
        <MusicPlayer
          currentTrack={currentTrack}
          tracks={tracks}
          onTrackChange={handleTrackSelect}
        />
      )}
    </div>
  );
};

export default Index;
