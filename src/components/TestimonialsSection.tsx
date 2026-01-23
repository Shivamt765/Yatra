import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Deepak Singh",
    location: "Gorakhpur, Uttar Pradesh",
    rating: 5,
    text: "Excellent service! Vehicles were comfortable, drivers professional and punctual. Highly recommended for Nepal tours.",
    image: "https://images.pexels.com/photos/21014/pexels-photo.jpg?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    location: "Gorakhpur",
    rating: 5,
    text: "The trip between Gorakhpur and Nepal was unforgettable — great planning and safe journey with professional team!",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Seema Sharma",
    location: "Lucknow, Uttar Pradesh",
    rating: 5,
    text: "Booked a family tour with Pashupatinath Tours — all destinations (Muktinath to Pokhara) were perfectly handled.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Amit Joshi",
    location: "Varanasi, Uttar Pradesh",
    rating: 4,
    text: "Travel was smooth and drivers were polite, but some vehicle amenities could be improved.",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Rakesh Kumar Singh",
    location: "Reported Experience",
    rating: 1,
    text: "Experienced issues with vehicle quality and customer service — felt misled and had a negative trip.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face",
  },
];

const ModernTravelStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-5xl font-playfair italic text-gray-900 mb-4">
          Traveler Stories
        </h2>
        <p className="text-gray-500 max-w-3xl mx-auto text-lg">
          Real adventures from our travelers around India. Each story is unique, immersive, and unforgettable.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12 relative">
          {stories.map((story, i) => (
            <div key={story.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-5 h-5 rounded-full transition-all duration-500 ${
                  i === activeIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
                }`}
              />
              {i < stories.length - 1 && (
                <div className="flex-1 h-1 bg-gray-300 absolute top-2.5 left-5 right-0 z-0" />
              )}
            </div>
          ))}
        </div>

        {/* Story Cards */}
        <div className="relative flex overflow-hidden h-80">
          {stories.map((story, i) => (
            <div
              key={story.id}
              className={`absolute top-0 transition-all duration-700 w-full flex-shrink-0 px-4 ${
                i === activeIndex ? "translate-x-0 opacity-100 z-20" : i < activeIndex ? "-translate-x-full opacity-0 z-10" : "translate-x-full opacity-0 z-10"
              }`}
            >
              <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-20 h-20 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-gray-900 font-bold text-2xl">{story.name}</h4>
                  <p className="text-gray-500 text-sm mb-2">{story.location}</p>
                  <p className="text-gray-900 text-lg mb-4">"{story.text}"</p>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`h-5 w-5 ${
                          starIdx < story.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length)
            }
            className="p-3 bg-white/30 backdrop-blur-md rounded-full shadow hover:bg-white/50 transition"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % stories.length)
            }
            className="p-3 bg-white/30 backdrop-blur-md rounded-full shadow hover:bg-white/50 transition"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModernTravelStories;
