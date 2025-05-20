
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audio: string;
  duration: number;
  tags: string[];
  genre: string;
}

// Sample data for demo purposes
const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Symphony No. 5',
    artist: 'Ludwig van Beethoven',
    album: 'Classical Masterpieces',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzaWNhbCUyMG11c2ljfGVufDB8fDB8fHww',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    duration: 183,
    tags: ['classical', 'orchestra', 'symphonic'],
    genre: 'Classical'
  },
  {
    id: '2',
    title: 'Midnight Jazz',
    artist: 'Ella Johnson',
    album: 'Late Night Sessions',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF6eiUyMG11c2ljfGVufDB8fDB8fHww',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-jazzy-intro-171.mp3',
    duration: 176,
    tags: ['jazz', 'smooth', 'relaxing', 'night'],
    genre: 'Jazz'
  },
  {
    id: '3',
    title: 'Electronic Dreams',
    artist: 'TechNova',
    album: 'Digital Horizons',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pYyUyMG11c2ljfGVufDB8fDB8fHww',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3',
    duration: 125,
    tags: ['electronic', 'upbeat', 'dance'],
    genre: 'Electronic'
  },
  {
    id: '4',
    title: 'Acoustic Morning',
    artist: 'Sarah Williams',
    album: 'Sunrise Sessions',
    cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNvdXN0aWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3',
    duration: 214,
    tags: ['acoustic', 'guitar', 'relaxing', 'morning'],
    genre: 'Folk'
  },
  {
    id: '5',
    title: 'Hip Hop Groove',
    artist: 'MC Rhythm',
    album: 'Urban Beats',
    cover: 'https://images.unsplash.com/photo-1571609806661-8395aa78b546?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlwJTIwaG9wfGVufDB8fDB8fHww',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
    duration: 142,
    tags: ['hip hop', 'beats', 'urban', 'workout'],
    genre: 'Hip Hop'
  },
  {
    id: '6',
    title: 'Rock Anthem',
    artist: 'The Amplifiers',
    album: 'Volume Up',
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMG11c2ljfGVufDB8fDB8fHww',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3',
    duration: 198,
    tags: ['rock', 'guitar', 'energetic'],
    genre: 'Rock'
  },
  {
    id: '7',
    title: 'Ambient Waves',
    artist: 'Ocean Sounds',
    album: 'Deep Relaxation',
    cover: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1iaWVudCUyMG11c2ljfGVufDB8fDB8fHww',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    duration: 231,
    tags: ['ambient', 'relaxing', 'focus', 'meditation'],
    genre: 'Ambient'
  },
  {
    id: '8',
    title: 'Pop Sensation',
    artist: 'Melody Stars',
    album: 'Chart Toppers',
    cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9wJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D',
    audio: 'https://assets.mixkit.co/music/preview/mixkit-summer-fun-13.mp3',
    duration: 167,
    tags: ['pop', 'upbeat', 'energetic'],
    genre: 'Pop'
  }
];

export const getAllTracks = (): Track[] => {
  return sampleTracks;
};

export const getTrackById = (id: string): Track | undefined => {
  return sampleTracks.find(track => track.id === id);
};

export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  
  sampleTracks.forEach(track => {
    track.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet);
};

export const getAllGenres = (): string[] => {
  const genresSet = new Set<string>();
  
  sampleTracks.forEach(track => {
    genresSet.add(track.genre);
  });
  
  return Array.from(genresSet);
};

export const filterTracksByGenre = (genre: string): Track[] => {
  return sampleTracks.filter(track => track.genre === genre);
};

export const filterTracksByTags = (tags: string[]): Track[] => {
  if (tags.length === 0) return sampleTracks;
  
  return sampleTracks.filter(track => 
    tags.some(tag => track.tags.includes(tag))
  );
};

export const filterTracks = (genre: string | null, tags: string[]): Track[] => {
  let filteredTracks = sampleTracks;
  
  if (genre) {
    filteredTracks = filteredTracks.filter(track => track.genre === genre);
  }
  
  if (tags.length > 0) {
    filteredTracks = filteredTracks.filter(track => 
      tags.some(tag => track.tags.includes(tag))
    );
  }
  
  return filteredTracks;
};
