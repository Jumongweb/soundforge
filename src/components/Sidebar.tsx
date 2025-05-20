
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Home, ListMusic, Music, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
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
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              Your Top Songs 2023
            </a>
          </li>
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              Workout Mix
            </a>
          </li>
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              Chill Vibes
            </a>
          </li>
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              Focus Flow
            </a>
          </li>
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              Road Trip
            </a>
          </li>
        </ul>
      </div>
      
      <div>
        <h2 className="text-sm font-bold mb-4 text-music-text-secondary uppercase">Tags</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #upbeat
            </a>
          </li>
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #relaxing
            </a>
          </li>
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #workout
            </a>
          </li>
          <li>
            <a href="#" className="text-music-text-secondary hover:text-white text-sm transition-colors">
              #focus
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
