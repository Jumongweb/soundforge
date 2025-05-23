
import React from 'react';
import { Search as SearchIcon, Wifi } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOnlineSearch: () => void;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onOnlineSearch,
  isSearching
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 mb-8`}>
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-music-text-secondary" />
        <Input
          type="text"
          placeholder={isMobile ? "Search music..." : "Search by title, artist, album, genre or tag..."}
          className="pl-10 bg-music-dark-alt border-music-accent/30 focus:border-music-accent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        className="bg-music-accent hover:bg-music-accent-hover text-white border-none"
        onClick={onOnlineSearch}
        disabled={isSearching}
      >
        <Wifi className="mr-2" />
        {isSearching ? 'Searching...' : (isMobile ? 'Online' : 'Search Online')}
      </Button>
    </div>
  );
};

export default SearchBar;
