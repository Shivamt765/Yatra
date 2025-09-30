import { useEffect, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-himalayas.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const messages = [
    "Explore the Unseen",
    "Journey Through Nepal & Uttarakhand",
    "Adventure Awaits You"
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
        const nextIndex = (messages.indexOf(currentMessage) + 1) % messages.length;
        setCurrentMessage(messages[nextIndex]);
        setCharIndex(0);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentMessage]);

  const scrollToPackages = () => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToReels = () => document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-slow animate-fadeIn"
        style={{ backgroundImage: `url(${heroImage})`, transform: 'scale(1.05)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30" />
      
      {/* Subtle Travel Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/60 rounded-full animate-spark`}
            style={{ left: `${10 + i * 15}%`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-8 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Main Hero Heading with Poppins */}
          <h1 className="font-poppins text-5xl md:text-7xl font-extrabold mb-4 leading-tight text-shadow-adventure">
            {currentMessage.slice(0, charIndex)}
          </h1>

          {/* Subheading / tagline */}
          <p className="font-playfair text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto transition-all duration-1000 delay-300">
            Curated experiences and adventures across mountains and valleys
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500">
            <Button onClick={scrollToPackages} className="btn-hero text-lg hover:shadow-white/50 font-montserrat">
              Explore Packages
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <Button onClick={scrollToReels} variant="outline" className="glass-effect border-white/30 text-black hover:bg-white/10 px-8 py-4 text-lg font-montserrat">
              <Play className="mr-2 h-5 w-5" />
              Watch Stories
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
