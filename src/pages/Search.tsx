
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Download, Wifi } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrackList from '@/components/TrackList';
import { getAllTracks, Track } from '@/services/musicService';
import { useToast } from '@/components/ui/use-toast';
import OnlineTrackList from '@/components/OnlineTrackList';
import { useLibrary } from '@/hooks/useLibrary';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [onlineTracks, setOnlineTracks] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState<string>('local');
  
  const { toast } = useToast();
  const { addToLibrary } = useLibrary();

  useEffect(() => {
    // Load all tracks initially
    const allTracks = getAllTracks();
    setTracks(allTracks);
    setFilteredTracks(allTracks);
  }, []);

  useEffect(() => {
    // Filter tracks based on search query
    if (searchQuery.trim() === '') {
      setFilteredTracks(tracks);
      return;
    }

    const query = searchQuery.toLowerCase();
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
    // Simulate online search delay
    setTimeout(() => {
      // These would come from an external API in a real app
      const sampleOnlineTracks: Track[] = [
        {
          id: 'online-1',
          title: `${searchQuery} - Online Track 1`,
          artist: 'Online Artist 1',
          album: 'Online Album',
          cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600',
          audio: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
          duration: 180,
          tags: ['online', 'streaming'],
          genre: 'Mixed'
        },
        {
          id: 'online-2',
          title: `${searchQuery} - Online Track 2`,
          artist: 'Online Artist 2',
          album: 'Streaming Collection',
          cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
          audio: 'https://assets.mixkit.co/music/preview/mixkit-jazzy-intro-171.mp3',
          duration: 220,
          tags: ['online', 'streaming'],
          genre: 'Mixed'
        }
      ];
      
      setOnlineTracks(sampleOnlineTracks);
      setActiveTab('online');
      setIsSearching(false);
      
      toast({
        title: "Online search complete",
        description: `Found ${sampleOnlineTracks.length} tracks for "${searchQuery}"`,
      });
    }, 1500);
  };

  const handleDownload = (track: Track) => {
    // Simulate download process
    toast({
      title: "Downloading...",
      description: `${track.title} is being downloaded`
    });
    
    // Simulate completion after delay
    setTimeout(() => {
      addToLibrary(track);
      toast({
        title: "Download complete",
        description: `${track.title} has been added to your library`
      });
    }, 2000);
  };

  return (
    <div className="pt-8 pb-28 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Music</h1>
        
        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-music-text-secondary" />
            <Input
              type="text"
              placeholder="Search by title, artist, album, genre or tag..."
              className="pl-10 bg-music-dark-alt border-music-accent/30 focus:border-music-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="bg-music-accent hover:bg-music-accent-hover text-white border-none"
            onClick={handleOnlineSearch}
            disabled={isSearching}
          >
            <Wifi className="mr-2" />
            {isSearching ? 'Searching...' : 'Search Online'}
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="local">My Library</TabsTrigger>
            <TabsTrigger value="online">Online Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="local">
            {searchQuery.trim() !== '' && (
              <p className="text-sm text-music-text-secondary mb-4">
                Found {filteredTracks.length} results in your library for "{searchQuery}"
              </p>
            )}
            
            {filteredTracks.length > 0 ? (
              <TrackList
                tracks={filteredTracks}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onTrackSelect={handleTrackSelect}
                onPlayPause={handlePlayPause}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-music-text-secondary">No tracks found matching your search.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-music-accent hover:bg-music-accent-hover text-white border-none"
                  onClick={handleOnlineSearch}
                >
                  <Wifi className="mr-2" />
                  Search Online Instead
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="online">
            {isSearching ? (
              <div className="text-center py-12">
                <p className="text-music-text-secondary mb-2">Searching online for "{searchQuery}"...</p>
                <div className="w-8 h-8 border-t-2 border-music-accent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <>
                {onlineTracks.length > 0 ? (
                  <OnlineTrackList
                    tracks={onlineTracks}
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    onTrackSelect={handleTrackSelect}
                    onPlayPause={handlePlayPause}
                    onDownload={handleDownload}
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-music-text-secondary">
                      {searchQuery.trim() === '' 
                        ? 'Enter a search term and click "Search Online" to find music' 
                        : 'No online tracks found for your search.'}
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
