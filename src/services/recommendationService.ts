
import { Track } from './musicService';

// This simulates AI-based recommendations based on user preferences and history
export const getRecommendedTracks = (
  userPreferences: string[], 
  recentlyPlayed: Track[]
): Track[] => {
  // In a real application, this would call an AI service
  // For now, we'll create simulated AI recommendations
  
  const recommendedTracks: Track[] = [
    {
      id: `rec-1-${Date.now()}`,
      title: "Rhythmic Journey",
      artist: "DeepBeats AI",
      album: "AI Recommendations Vol. 1",
      cover: "https://images.unsplash.com/photo-1601312378427-822ab867012c?w=600",
      audio: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
      duration: 190,
      tags: ["ai", "recommendation", "electronic"],
      genre: "Electronic"
    },
    {
      id: `rec-2-${Date.now()}`,
      title: "Neon Dreams",
      artist: "AI Composer",
      album: "Neural Beats",
      cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600",
      audio: "https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3",
      duration: 215,
      tags: ["ai", "recommendation", "ambient"],
      genre: "Ambient"
    },
    {
      id: `rec-3-${Date.now()}`,
      title: "Melodic Patterns",
      artist: "NeuralGroove",
      album: "AI Composed Series",
      cover: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600",
      audio: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: 205,
      tags: ["ai", "recommendation", "jazz"],
      genre: "Jazz"
    },
    {
      id: `rec-4-${Date.now()}`,
      title: "Future Classic",
      artist: "AI Symphony",
      album: "Machine Learning Music",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600",
      audio: "https://assets.mixkit.co/music/preview/mixkit-jazzy-intro-171.mp3",
      duration: 180,
      tags: ["ai", "recommendation", "classical"],
      genre: "Classical"
    }
  ];
  
  return recommendedTracks;
};

// This function would theoretically analyze user's music taste
export const analyzeUserPreferences = (playHistory: Track[]): string[] => {
  // In a real app, this would analyze the user's play history
  // and generate preference tags
  
  const preferences: string[] = [];
  
  // Extract genres from play history
  const genres = playHistory.map(track => track.genre.toLowerCase());
  
  // Count genre frequency
  const genreCounts: Record<string, number> = {};
  genres.forEach(genre => {
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });
  
  // Find top genres
  Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([genre]) => preferences.push(genre));
  
  // Add fallback preferences if history is too small
  if (preferences.length < 2) {
    preferences.push('electronic', 'ambient');
  }
  
  return preferences;
};
