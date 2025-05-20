
import React from 'react';
import FeaturedSection from '@/components/FeaturedSection';
import TrackList from '@/components/TrackList';
import TagSelector from '@/components/TagSelector';
import Visualizer from '@/components/Visualizer';
import { getAllTracks, getAllTags, getAllGenres, filterTracks, Track } from '@/services/musicService';

const Home = () => {
  const [tracks, setTracks] = React.useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = React.useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [allTags, setAllTags] = React.useState<string[]>([]);
  const [allGenres, setAllGenres] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = React.useState<string | null>(null);
  const [visualizerType, setVisualizerType] = React.useState<'bars' | 'wave' | 'circle'>('wave');

  React.useEffect(() => {
    // Load initial data
    const allTracksData = getAllTracks();
    const allTagsData = getAllTags();
    const allGenresData = getAllGenres();
    
    setTracks(allTracksData);
    setFilteredTracks(allTracksData);
    setAllTags(allTagsData);
    setAllGenres(allGenresData);
  }, []);

  React.useEffect(() => {
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

  const cycleVisualizerType = () => {
    const types: ('bars' | 'wave' | 'circle')[] = ['bars', 'wave', 'circle'];
    const currentIndex = types.indexOf(visualizerType);
    const nextIndex = (currentIndex + 1) % types.length;
    setVisualizerType(types[nextIndex]);
  };

  return (
    <div className="pt-8 pb-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">MeloMix Player</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={cycleVisualizerType}
              className="text-xs text-music-text-secondary hover:text-music-accent"
            >
              Change Style
            </button>
            <Visualizer isPlaying={isPlaying} type={visualizerType} />
          </div>
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
    </div>
  );
};

export default Home;
