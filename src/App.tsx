
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import { useState, useEffect } from "react";
import { Track, getAllTracks } from "./services/musicService";
import { useIsMobile } from "./hooks/use-mobile";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import PlaylistPage from "./pages/PlaylistPage";

const queryClient = new QueryClient();

const App = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Initialize tracks from the music service
    const allTracks = getAllTracks();
    setTracks(allTracks);
  }, []);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    
    // If this is a new online track, add it to the tracks list
    if (!tracks.some(t => t.id === track.id)) {
      setTracks(prev => [...prev, track]);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-b from-[#1e1e1e] to-music-dark text-white">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className={isMobile ? "w-full" : "ml-64"}>
              {isMobile && (
                <button
                  className="fixed left-4 top-4 z-50 p-2 bg-music-dark-alt rounded-md"
                  onClick={toggleSidebar}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </button>
              )}
              <Routes>
                <Route path="/" element={<Home onTrackSelect={handleTrackSelect} />} />
                <Route path="/search" element={<Search onTrackSelect={handleTrackSelect} />} />
                <Route path="/library" element={<Library onTrackSelect={handleTrackSelect} />} />
                <Route path="/playlist/:playlistId" element={<PlaylistPage onTrackSelect={handleTrackSelect} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {currentTrack && (
              <MusicPlayer
                currentTrack={currentTrack}
                tracks={tracks}
                onTrackChange={handleTrackSelect}
              />
            )}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
