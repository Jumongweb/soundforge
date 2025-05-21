
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Track } from '@/services/musicService';

interface NotFoundProps {
  onTrackSelect?: (track: Track) => void; // Make onTrackSelect optional
}

const NotFound: React.FC<NotFoundProps> = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-music-text-secondary">Page not found</p>
      <Button onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
