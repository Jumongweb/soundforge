
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(timeInSeconds: number): string {
  if (isNaN(timeInSeconds)) return "0:00";
  
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function calculateProgress(currentTime: number, duration: number): number {
  if (isNaN(currentTime) || isNaN(duration) || duration === 0) return 0;
  return (currentTime / duration) * 100;
}

export function getRandomColor(): string {
  const colors = [
    '#9b87f5', // music-accent
    '#7E69AB', // music-accent-hover
    '#6a5acd', // slateblue
    '#9370db', // mediumpurple
    '#ba55d3', // mediumorchid
    '#da70d6', // orchid
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

export function isTrackInLibrary(trackId: string): boolean {
  const savedLibrary = localStorage.getItem('musicLibrary');
  if (!savedLibrary) return false;
  
  try {
    const libraryTrackIds = JSON.parse(savedLibrary) as string[];
    return libraryTrackIds.includes(trackId);
  } catch {
    return false;
  }
}

export function addTrackToLibrary(trackId: string): void {
  const savedLibrary = localStorage.getItem('musicLibrary');
  let libraryTrackIds: string[] = [];
  
  if (savedLibrary) {
    try {
      libraryTrackIds = JSON.parse(savedLibrary);
    } catch (error) {
      console.error('Failed to parse library:', error);
    }
  }
  
  if (!libraryTrackIds.includes(trackId)) {
    libraryTrackIds.push(trackId);
    localStorage.setItem('musicLibrary', JSON.stringify(libraryTrackIds));
  }
}

export function removeTrackFromLibrary(trackId: string): void {
  const savedLibrary = localStorage.getItem('musicLibrary');
  if (!savedLibrary) return;
  
  try {
    const libraryTrackIds = JSON.parse(savedLibrary) as string[];
    const updatedIds = libraryTrackIds.filter(id => id !== trackId);
    localStorage.setItem('musicLibrary', JSON.stringify(updatedIds));
  } catch (error) {
    console.error('Failed to remove from library:', error);
  }
}
