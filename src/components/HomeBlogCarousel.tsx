import { useEffect, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-himalayas.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // SEO + Travel Optimized Messages (Generalized)
  const messages = [
    "Discover Himalayan Travel Experiences",
    "Nepal Tour Packages & Himalayan Destinations",
    "Unforgettable Mountain Journeys"
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const typingSpeed = 70;

    const interval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev < currentMessage.length) return prev + 1;
        return prev;
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentMessage]);

  useEffect(() => {
    if (charIndex === currentMessage.length) {
      const timeout = setTimeout(() => {
        const nextIndex =
          (messages.indexOf(currentMessage) + 1) % messages.length;
        setCurrentMessage(messages[nextIndex]);
        setCharIndex(0);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentMessage]);

  const scrollToPackages = () =>
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });

  const scrollToReels = () =>
    document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 parallax-slow"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50" />

      {/* Floating Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/50 rounded-full animate-spark"
            style={{
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* SEO Friendly Hidden Heading */}
          <h2 className="sr-only">
            Best Nepal Tour Packages and Himalayan Travel Destinations
          </h2>

          {/* Main Heading */}
          <h1 className="font-montserrat text-5xl md:text-7xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
            {currentMessage.slice(0, charIndex)}
          </h1>

          {/* Subheading */}
          <p className="font-montserrat text-lg md:text-xl mb-8 text-white/80 max-w-3xl mx-auto transition-all duration-1000 delay-300">
            Book curated Nepal tour packages and Himalayan destination experiences
            featuring mountain adventures, spiritual getaways, family trips, and
            scenic escapes crafted for unforgettable travel memories.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={scrollToPackages}
              className="bg-white/10 text-white font-montserrat rounded-full px-8 py-4 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300"
            >
              Explore Tour Packages
              <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>

            <Button
              onClick={scrollToReels}
              className="glass-effect text-white hover:bg-white/10 font-montserrat rounded-full px-8 py-4 flex items-center gap-2 backdrop-blur-md"
            >
              <Play className="h-5 w-5" />
              Watch Travel Stories
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
};

export default HeroSection;