
import { Track } from './musicService';

const JAMENDO_CLIENT_ID = 'b1beeb33';

interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  audio: string;
  image: string;
  duration: number;
  tags: string[];
  musicinfo: {
    vocalinstrumental: string;
    gender: string;
    speed: string;
    tags: {
      genres: string[];
      instruments: string[];
      vartags: string[];
    };
  };
}

interface JamendoResponse {
  headers: {
    status: string;
    code: number;
    error_message: string;
    warnings: string[];
    results_count: number;
  };
  results: JamendoTrack[];
}

export const fetchJamendoTracks = async (query: string): Promise<Track[]> => {
  try {
    const endpoint = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&search=${encodeURIComponent(query)}`;
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data: JamendoResponse = await response.json();
    
    if (data.headers.code !== 0 && data.headers.code !== 200) {
      throw new Error(`API error: ${data.headers.error_message}`);
    }
    
    // Map Jamendo tracks to our Track interface
    return data.results.map(track => {
      // Get genre from tags if available
      let genre = 'Unknown';
      if (track.musicinfo && track.musicinfo.tags && track.musicinfo.tags.genres && track.musicinfo.tags.genres.length > 0) {
        genre = track.musicinfo.tags.genres[0];
        // Capitalize first letter
        genre = genre.charAt(0).toUpperCase() + genre.slice(1);
      }
      
      // Combine all available tags
      const allTags: string[] = [];
      if (track.tags) allTags.push(...track.tags);
      if (track.musicinfo?.tags?.vartags) allTags.push(...track.musicinfo.tags.vartags);
      if (track.musicinfo?.tags?.instruments) allTags.push(...track.musicinfo.tags.instruments);
      
      return {
        id: `jamendo-${track.id}`,
        title: track.name,
        artist: track.artist_name,
        album: track.album_name,
        cover: track.image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600',
        audio: track.audio,
        duration: Math.round(track.duration),
        tags: allTags.length > 0 ? allTags : ['online'],
        genre: genre
      };
    });
  } catch (error) {
    console.error('Error fetching from Jamendo API:', error);
    // Return empty array in case of error
    return [];
  }
};
