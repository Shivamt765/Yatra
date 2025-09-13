import { useState, useEffect } from 'react';
import { X, Users, Clock } from 'lucide-react';

const notifications = [
  "12 people recently booked a Nepal Adventure",
  "7 people booked Uttarakhand Trek this week",
  "Anita from Mumbai just booked Everest Base Camp",
  "5 people booked Kedarnath Yatra today",
  "Rajesh from Delhi just booked River Rafting",
  "15 people chose our Nepal packages this month",
  "Sarah from Bangalore booked Annapurna Circuit",
  "3 families booked adventure packages today"
];

const BookingNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-30 max-w-sm">
      <div className={`bg-white/95 backdrop-blur-sm border border-sky-blue/20 rounded-lg shadow-adventure p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-0 transform translate-x-2' : 'opacity-100 transform translate-x-0'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-sky-blue to-mountain-green p-2 rounded-full">
              <Users className="h-4 w-4 text-white" />
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {notifications[currentNotification]}
              </p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>Just now</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-blue to-mountain-green rounded-full animate-pulse"
            style={{
              animation: 'progress 4s linear infinite'
            }}
          />
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BookingNotifications;