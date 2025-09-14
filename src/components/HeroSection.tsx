import { useEffect, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-himalayas.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReels = () => {
    document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-slow"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-8 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-shadow-adventure leading-tight">
            Discover Nepal &{' '}
            <span className="heading-adventure">Uttarakhand</span>
            <br />
            Like Never Before
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Embark on extraordinary adventures through the majestic Himalayas. 
            From Everest Base Camp to sacred Gangotri, create memories that last a lifetime.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button 
              onClick={scrollToPackages}
              className="btn-hero text-lg group"
            >
              Explore Packages
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={scrollToReels}
              variant="outline" 
              className="glass-effect border-white/40 text-white hover:bg-white/20 px-8 py-4 text-lg"
            >
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