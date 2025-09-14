import { useState } from 'react';
import { Play, ExternalLink, ChevronLeft, ChevronRight, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const reels = [
  {
    id: 1,
    title: "Everest Base Camp Adventure",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    duration: "2:45",
    platform: "instagram",
    link: "https://instagram.com/yatraholiday",
    views: "25K"
  },
  {
    id: 2,
    title: "Rishikesh Rafting Thrills",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=600&fit=crop",
    duration: "1:30",
    platform: "youtube",
    link: "https://youtube.com/@yatraholiday",
    views: "18K"
  },
  {
    id: 3,
    title: "Nepal Cultural Journey",
    thumbnail: "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=600&fit=crop",
    duration: "3:20",
    platform: "instagram",
    link: "https://instagram.com/yatraholiday",
    views: "32K"
  },
  {
    id: 4,
    title: "Kedarnath Pilgrimage",
    thumbnail: "https://images.unsplash.com/photo-1617395070653-6a46b6c52e19?w=400&h=600&fit=crop",
    duration: "2:10",
    platform: "youtube",
    link: "https://youtube.com/@yatraholiday",
    views: "41K"
  },
  {
    id: 5,
    title: "Himalayan Sunrise",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    duration: "1:45",
    platform: "instagram",
    link: "https://instagram.com/yatraholiday",
    views: "29K"
  }
];

const ReelsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReel = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  };

  const prevReel = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const handleReelClick = (reel: any) => {
    window.open(reel.link, '_blank');
  };

  return (
    <section id="reels" className="py-20 bg-gradient-to-b from-background to-snow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold heading-adventure mb-6">
            Adventure Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our journeys through the eyes of fellow travelers. 
            Watch real adventures, authentic moments, and inspiring stories.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop navigation */}
          <Button
            onClick={prevReel}
            className="hidden md:absolute left-0 top-1/2 -translate-y-1/2 z-10 btn-adventure p-3 rounded-full shadow-elevation"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextReel}
            className="hidden md:absolute right-0 top-1/2 -translate-y-1/2 z-10 btn-adventure p-3 rounded-full shadow-elevation"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel container */}
          <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 scrollbar-hide">
            {reels.map((reel) => (
              <Card
                key={reel.id}
                className="flex-shrink-0 w-64 sm:w-72 md:w-auto group relative cursor-pointer shadow-soft hover:shadow-adventure transition-all duration-500 transform hover:scale-105 snap-start"
                onClick={() => handleReelClick(reel)}
              >
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                      <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/60 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                    {reel.duration}
                  </div>
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    {reel.platform === 'instagram' ? (
                      <Instagram className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                    ) : (
                      <Youtube className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                    )}
                  </div>
                  <div className="absolute bottom-14 left-2 sm:left-3 bg-brand-orange/90 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                    {reel.views} views
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                    <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
                      {reel.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 p-1 h-auto"
                      >
                        <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-brand-orange scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Follow us for more amazing travel stories and live updates from the mountains!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              onClick={() => window.open('https://instagram.com/yatraholiday', '_blank')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow on Instagram
            </Button>
            <Button 
              onClick={() => window.open('https://youtube.com/@yatraholiday', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Youtube className="mr-2 h-5 w-5" />
              Subscribe YouTube
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
