import { useEffect, useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/Hero-Pashupatinath-Holidays.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPackages = () =>
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });

  const scrollToReels = () =>
    document.getElementById("reels")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* SEO Heading */}
          <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
  Pashupatinath Holidays Where Every Journey Feels Extraordinary
</h1>


          {/* SEO Subheading */}
          <p className="font-montserrat text-lg md:text-xl mb-10 text-white/85 max-w-3xl mx-auto">
  Explore iconic destinations across Nepal, Ayodhya, Goa, Uttrakhand, Rajasthan and spiritual India with
  beautifully crafted travel experiences.
</p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={scrollToPackages}
              className="bg-white/10 text-white font-montserrat rounded-full px-8 py-4 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300"
            >
              Explore Tour Packages
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>

            <Button
              onClick={scrollToReels}
              className="glass-effect text-white hover:bg-white/10 font-montserrat rounded-full px-8 py-4 flex items-center gap-2 backdrop-blur-md"
            >
              <Play className="h-5 w-5" /> Watch Travel Stories
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
};

export default HeroSection;