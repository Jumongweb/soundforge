
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TagSelectorProps {
  tags: string[];
  genres: string[];
  selectedTags: string[];
  selectedGenre: string | null;
  onTagSelect: (tag: string) => void;
  onGenreSelect: (genre: string | null) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  genres,
  selectedTags,
  selectedGenre,
  onTagSelect,
  onGenreSelect
}) => {
  return (
    <div className="mb-6">
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Genres</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedGenre === null ? "default" : "outline"}
            size="sm"
            onClick={() => onGenreSelect(null)}
            className={`text-xs px-3 py-1 h-8 ${selectedGenre === null ? 'bg-music-accent hover:bg-music-accent-hover' : 'bg-transparent'}`}
          >
            All
          </Button>
          
          {genres.map(genre => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => onGenreSelect(genre)}
              className={`text-xs px-3 py-1 h-8 ${selectedGenre === genre ? 'bg-music-accent hover:bg-music-accent-hover' : 'bg-transparent'}`}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge
              key={tag}
              variant="outline"
              className={`cursor-pointer px-3 py-1 ${
                selectedTags.includes(tag) 
                  ? 'bg-music-accent text-white hover:bg-music-accent-hover'
                  : 'bg-transparent hover:bg-gray-800'
              }`}
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagSelector;
