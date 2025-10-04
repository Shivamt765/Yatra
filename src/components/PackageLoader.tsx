import { useEffect } from 'react';

interface PackageLoaderProps {
  onComplete: () => void;
}

const PackageLoader = ({ onComplete }: PackageLoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Loader shows for 2 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Inline Van SVG */}
        <div className="relative w-48 h-32 animate-bounce-slow">
          <svg
            viewBox="0 0 200 100"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Van body */}
            <rect x="20" y="40" width="160" height="40" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2"/>
            {/* Windows */}
            <rect x="30" y="45" width="40" height="20" rx="2" fill="#93C5FD" />
            <rect x="80" y="45" width="50" height="20" rx="2" fill="#93C5FD" />
            <rect x="140" y="45" width="30" height="20" rx="2" fill="#93C5FD" />
            {/* Wheels */}
            <circle cx="40" cy="85" r="10" fill="#374151" />
            <circle cx="160" cy="85" r="10" fill="#374151" />
            <circle cx="40" cy="85" r="5" fill="#D1D5DB" />
            <circle cx="160" cy="85" r="5" fill="#D1D5DB" />
          </svg>
        </div>

        {/* Animated Road */}
        <div className="relative w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div className="absolute h-1 w-32 bg-white rounded-full animate-slide"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-700 font-semibold text-lg">
          Planning your adventure...
        </p>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes slide {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: -100%; }
          }
          .animate-slide {
            animation: slide 1.5s linear infinite;
          }
          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounceSlow 1s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default PackageLoader;
