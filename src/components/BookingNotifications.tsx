import { useEffect, useState } from "react";
import { X, Users, Clock } from "lucide-react";

const BookingNotifications = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch packages.json from public folder
  useEffect(() => {
    fetch("/packages.json")
      .then((res) => res.json())
      .then((data) => {
        const liveTours = data.filter((tour: any) => tour.live === true);

        const generatedMessages = liveTours
          .map((tour: any) => [
            `12 people recently booked ${tour.title}`,
            `7 people booked ${tour.title} this week`,
            `${tour.location} package is trending right now`,
            `Limited seats left for ${tour.title}`,
            `Book now: ${tour.title}`
          ])
          .flat();

        setMessages(generatedMessages);
      })
      .catch((err) => console.error("Error loading packages:", err));
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % messages.length);
        setIsAnimating(false);
      }, 500);
    }, 40000); // 40 seconds

    return () => clearInterval(interval);
  }, [messages]);

  if (!isVisible || messages.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-30 max-w-sm">
      <div
        className={`bg-white/95 backdrop-blur-sm border border-sky-blue/20 rounded-lg shadow-lg p-4 transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-sky-blue to-mountain-green p-2 rounded-full">
              <Users className="h-4 w-4 text-white" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {messages[currentNotification]}
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

        <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-blue to-mountain-green rounded-full animate-pulse"
            style={{ animation: "progress 40s linear infinite" }}
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