import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import nepal1 from "@/assets/nepal1.jpg";
import nepal2 from "@/assets/nepal2.jpg";
import nepal3 from "@/assets/nepal3.jpg";
import nepal4 from "@/assets/nepal4.jpg";
import nepal5 from "@/assets/nepal5.jpg";
import nepal6 from "@/assets/nepal6.jpg";

const diaries = [
  { id: 1, place: "Nepal Adventure", cover: nepal1 },
  { id: 2, place: "Nepal Adventure", cover: nepal2 },
  { id: 3, place: "Nepal Adventure", cover: nepal3 },
  { id: 4, place: "Nepal Adventure", cover: nepal4 },
  { id: 5, place: "Nepal Adventure", cover: nepal5 },
  { id: 6, place: "Nepal Adventure", cover: nepal6 },
];

const DiariesSection = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % diaries.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + diaries.length) % diaries.length);
  const next = () => setCurrent((prev) => (prev + 1) % diaries.length);

  return (
    <section className="relative py-16 bg-cream-light overflow-hidden">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="font-playfair italic text-4xl md:text-5xl text-gray-900 mb-2">
          Travel Diaries
        </h2>
        <p className="font-poppins text-lg md:text-xl text-gray-600">
          Stories that inspire the journey within
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {diaries.map((entry) => (
              <div key={entry.id} className="relative min-w-full p-4">
                <div className="relative h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                  <img
                    src={entry.cover}
                    alt={entry.place}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all duration-500" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                    <h3 className="text-3xl md:text-4xl font-playfair italic text-white drop-shadow-lg">
                      {entry.place}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-3 shadow-lg transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-black" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-3 shadow-lg transition-all"
        >
          <ChevronRight className="h-6 w-6 text-black" />
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {diaries.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === current ? "bg-brand-orange scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiariesSection;
