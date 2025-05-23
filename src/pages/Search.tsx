
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllTracks, Track } from '@/services/musicService';
import { useToast } from '@/components/ui/use-toast';
import { useLibrary } from '@/hooks/useLibrary';
import { useLocation } from 'react-router-dom';
import { fetchJamendoTracks } from '@/services/jamendoService';
import { getRecommendedTracks, analyzeUserPreferences } from '@/services/recommendationService';
import { useIsMobile } from '@/hooks/use-mobile';

// Components
import SearchBar from '@/components/SearchBar';
import LocalSearchResults from '@/components/LocalSearchResults';
import OnlineSearchResults from '@/components/OnlineSearchResults';
import RecommendationSection from '@/components/RecommendationSection';

interface SearchProps {
  onTrackSelect: (track: Track) => void;
}

const Search: React.FC<SearchProps> = ({ onTrackSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [onlineTracks, setOnlineTracks] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState<string>('local');
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  
  const { toast } = useToast();
  const { addToLibrary } = useLibrary();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load all tracks initially
    const allTracks = getAllTracks();
    setTracks(allTracks);
    setFilteredTracks(allTracks);
    
    // Check if there's a tag in the URL
    const queryParams = new URLSearchParams(location.search);
    const tagParam = queryParams.get('tag');
    
    if (tagParam) {
      setSearchQuery(`#${tagParam}`);
    }
    
    // Generate AI recommendations based on library
    const userPreferences = analyzeUserPreferences(allTracks);
    const recommendations = getRecommendedTracks(userPreferences, allTracks);
    setRecommendedTracks(recommendations);
  }, [location.search]);

  useEffect(() => {
    // Filter tracks based on search query
    if (searchQuery.trim() === '') {
      setFilteredTracks(tracks);
      return;
    }

    const query = searchQuery.toLowerCase();
    // Check if searching by tag (starts with #)
    if (query.startsWith('#')) {
      const tag = query.substring(1); // Remove # prefix
      const filtered = tracks.filter(track => 
        track.tags.some(trackTag => trackTag.toLowerCase().includes(tag))
      );
      setFilteredTracks(filtered);
      return;
    }

    // Normal search
    const filtered = tracks.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query) ||
      track.genre.toLowerCase().includes(query) ||
      track.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setFilteredTracks(filtered);
  }, [searchQuery, tracks]);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    onTrackSelect(track);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOnlineSearch = async () => {
    if (searchQuery.trim() === '') {
      toast({
        title: "Search query is empty",
        description: "Please enter a search term to find online music",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const jamendoTracks = await fetchJamendoTracks(searchQuery);
      
      if (jamendoTracks.length > 0) {
        setOnlineTracks(jamendoTracks);
        toast({
          title: "Search complete",
          description: `Found ${jamendoTracks.length} tracks for "${searchQuery}"`,
        });
      } else {
        toast({
          title: "No results found",
          description: `No tracks found for "${searchQuery}". Showing sample tracks instead.`,
        });
        generateSampleTracks();
      }
    } catch (error) {
      console.error('Error fetching music:', error);
      toast({
        title: "Error searching",
        description: "There was an error searching for music. Showing sample tracks instead.",
        variant: "destructive"
      });
      generateSampleTracks();
    } finally {
      setIsSearching(false);
      setActiveTab('online');
    }
  };
  
  const generateSampleTracks = () => {
    const sampleOnlineTracks: Track[] = [
      {
        id: `online-1-${Date.now()}`,
        title: `${searchQuery} - Track 1`,
        artist: 'Online Artist 1',
        album: 'Online Album',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600',
        audio: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
        duration: 180,
        tags: ['online', searchQuery.toLowerCase()],
        genre: 'Mixed'
      },
      {
        id: `online-2-${Date.now()}`,
        title: `${searchQuery} - Track 2`,
        artist: 'Online Artist 2',
        album: 'Streaming Collection',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
        audio: 'https://assets.mixkit.co/music/preview/mixkit-jazzy-intro-171.mp3',
        duration: 220,
        tags: ['online', searchQuery.toLowerCase()],
        genre: 'Mixed'
      },
      {
        id: `online-3-${Date.now()}`,
        title: `${searchQuery} - Track 3`,
        artist: 'Online Artist 3',
        album: 'Digital Beats',
        cover: 'https://images.unsplash.com/photo-1558369178-6556d97855d0?w=600',
        audio: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
        duration: 195,
        tags: ['online', searchQuery.toLowerCase(), 'trending'],
        genre: 'Mixed'
      },
      {
        id: `online-4-${Date.now()}`,
        title: `${searchQuery} - Popular Hit`,
        artist: 'Top Charts',
        album: 'Weekly Hits',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600',
        audio: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3',
        duration: 205,
        tags: ['online', searchQuery.toLowerCase(), 'popular'],
        genre: 'Pop'
      }
    ];
    
    setOnlineTracks(sampleOnlineTracks);
  };

  const handleDownload = (track: Track) => {
    // Add the track to library
    addToLibrary(track);
    
    // Show download toast
    toast({
      title: "Download complete",
      description: `${track.title} has been added to your library`,
      duration: 3000
    });
    
    // Update the local tracks list to include this track
    setTracks(prev => {
      // Only add if not already in the list
      if (!prev.some(t => t.id === track.id)) {
        return [...prev, track];
      }
      return prev;
    });
    
    // Switch to local tab to show the newly added track
    setTimeout(() => {
      setActiveTab('local');
      
      // Filter tracks to show the newly added one
      const searchTerm = track.title.split(' ')[0];
      setSearchQuery(searchTerm);
    }, 1500);
  };

  return (
    <div className={`pt-8 pb-28 ${isMobile ? 'px-4' : 'px-8'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`${isMobile ? 'text-2xl mt-8' : 'text-3xl'} font-bold mb-6`}>Search Music</h1>
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOnlineSearch={handleOnlineSearch}
          isSearching={isSearching}
        />
        
        <div className="mb-4 p-3 bg-[#282828] rounded-md">
          <p className="text-sm text-music-text-secondary">
            <strong>Note:</strong> Jamendo API provides Creative Commons licensed music from independent artists. 
            Popular mainstream artists may not be available. Try searching for genres like "rock", "jazz", or "ambient" instead.
          </p>
        </div>
        
        <RecommendationSection 
          tracks={recommendedTracks} 
          onTrackSelect={handleTrackSelect} 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'max-w-full' : 'max-w-md'} grid-cols-2 mb-6`}>
            <TabsTrigger value="local">My Library</TabsTrigger>
            <TabsTrigger value="online">Online Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="local">
            <LocalSearchResults
              filteredTracks={filteredTracks}
              searchQuery={searchQuery}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
              onPlayPause={handlePlayPause}
              onOnlineSearch={handleOnlineSearch}
            />
          </TabsContent>
          
          <TabsContent value="online">
            <OnlineSearchResults 
              onlineTracks={onlineTracks}
              searchQuery={searchQuery}
              isSearching={isSearching}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
              onPlayPause={handlePlayPause}
              onDownload={handleDownload}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
