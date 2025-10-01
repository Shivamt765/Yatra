import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import airplane from "@/assets/airplane.png"; // adjust path if needed
import { useEffect, useState } from "react";

const PromotionalBanner = () => {
  const [animateOnce, setAnimateOnce] = useState(true);

  useEffect(() => {
    // Run animation only on first load
    const timer = setTimeout(() => setAnimateOnce(false), 2500); // 2.5s animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="relative py-6 px-4 sm:px-6 lg:px-8 text-black overflow-visible border border-black/9">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Text Section */}
          <div className="text-center sm:text-left z-10 relative flex-1">
            <h2 className="text-3xl md:text-4xl font-playfair italic font-bold mb-1 text-black">
              Fly Into Adventure
            </h2>
            <p className="text-base md:text-lg font-montserrat text-black/80 mb-4">
              Book today and unlock journeys at a price you’ll actually smile at.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5 z-10 relative">
            {/* Countdown */}
            <div className="flex items-center space-x-2 font-montserrat text-sm sm:text-base text-black/80">
              <Clock className="h-5 w-5 text-black/70" />
              <span>Limited Time Only</span>
            </div>

            {/* Circle Badge */}
           {/* Circle Badge */}
{/* Badge Container */}
<div className="relative w-20 h-20 flex items-center justify-center">
  {/* Highlight Stroke */}
  <svg
    viewBox="0 0 150 60"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -top-2 -right-2 w-[120px] h-[60px] overflow-visible"
  >
    <path
      d="M10,30 
         C 40,5 110,5 140,30 
         C 110,55 40,55 10,30"
      fill="none"
      stroke="#FFD93D"       /* bright yellow, like crayon */
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset="1"
      className="animate-draw"
      style={{
        filter: "url(#rough)",
      }}
    />
    {/* Optional rough filter to make it look more crayon-like */}
    <defs>
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" />
        <feDisplacementMap in="SourceGraphic" scale="2" />
      </filter>
    </defs>
  </svg>

  {/* Circle Outline */}
  <div className="absolute inset-0 rounded-full border-2 border-yellow-400"></div>

  {/* Text */}
  <span className="relative z-10 font-montserrat font-bold text-yellow-400 text-sm text-center">
    30% OFF
  </span>
</div>




            {/* CTA Button */}
          <Button
  variant="outline"
  className="bg-[hsl(var(--brand-orange))] 
             text-white 
             hover:bg-[hsl(var(--brand-orange-light))] 
             font-montserrat 
             font-semibold 
             px-4 py-2 
             text-sm sm:text-base 
             border-none 
             transition-colors duration-300"
>
  Book Now
</Button>

          </div>
        </div>

        {/* Small Note */}
        <div className="text-center mt-4 text-xs text-black/60 font-montserrat italic z-10 relative">
          *Adventure is calling, don’t keep it waiting.*
        </div>
      </div>

      {/* Airplane floating independently */}
      <div className="absolute -mt-28 left-0 w-60 sm:w-80 animate-float pointer-events-none z-0">
        <img
          src={airplane}
          alt="Airplane"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* Extra Effects */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default PromotionalBanner;
