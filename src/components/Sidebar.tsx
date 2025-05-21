
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Home, ListMusic, Music, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlaylists } from '@/hooks/usePlaylists';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const { playlists } = usePlaylists();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const isPlaylistActive = (playlistId: string) => {
    return location.pathname === `/playlist/${playlistId}`;
  };
  
  return (
    <div className={cn("w-64 fixed top-0 left-0 bottom-0 bg-black p-6 overflow-y-auto", className)}>
      <div className="flex items-center gap-2 mb-8">
        <Music className="h-8 w-8 text-music-accent" />
        <h1 className="text-xl font-bold">MeloMix</h1>
      </div>
      
      <nav className="mb-8">
        <ul className="space-y-3">
          <li>
            <Link 
              to="/" 
              className={cn(
                "flex items-center gap-3 transition-colors",
                isActive('/') 
                  ? "text-music-accent" 
                  : "text-music-text-secondary hover:text-white"
              )}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              className={cn(
                "flex items-center gap-3 transition-colors",
                isActive('/search') 
                  ? "text-music-accent" 
                  : "text-music-text-secondary hover:text-white"
              )}
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/library" 
              className={cn(
                "flex items-center gap-3 transition-colors",
                isActive('/library') 
                  ? "text-music-accent" 
                  : "text-music-text-secondary hover:text-white"
              )}
            >
              <ListMusic className="h-5 w-5" />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-4 text-music-text-secondary uppercase">Playlists</h2>
        <ul className="space-y-2">
          {playlists.map(playlist => (
            <li key={playlist.id}>
              <Link 
                to={`/playlist/${playlist.id}`} 
                className={cn(
                  "text-sm transition-colors", 
                  isPlaylistActive(playlist.id)
                    ? "text-music-accent" 
                    : "text-music-text-secondary hover:text-white"
                )}
              >
                {playlist.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className="text-sm font-bold mb-4 text-music-text-secondary uppercase">Tags</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/search?tag=upbeat" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #upbeat
            </Link>
          </li>
          <li>
            <Link to="/search?tag=relaxing" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #relaxing
            </Link>
          </li>
          <li>
            <Link to="/search?tag=workout" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #workout
            </Link>
          </li>
          <li>
            <Link to="/search?tag=focus" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #focus
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
