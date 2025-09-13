import { useEffect, useState } from 'react';
import loadingImage from '@/assets/loading-trekkers.jpg';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Show text after 1 second
    setTimeout(() => setShowText(true), 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-earth-brown via-mountain-green to-sky-blue">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${loadingImage})` }}
      />
      
      <div className="relative z-10 text-center text-white px-8">
        <div className="mb-8">
          <h1 className={`text-6xl md:text-8xl font-bold mb-4 text-shadow-adventure transition-all duration-1000 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Yatra Holiday
          </h1>
          <p className={`text-xl md:text-2xl transition-all duration-1000 delay-500 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Your Adventure Begins Here...
          </p>
        </div>
        
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-snow-white to-sky-blue rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm opacity-80">{progress}% Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;