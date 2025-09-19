import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PackagesCarousel = ({ onQueryClick }) => {
  const [packages, setPackages] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [placeholder, setPlaceholder] = useState("");

  const placeholderTexts = ["Rishikesh trip", "Nepal", "Adventure Trips"];

  // Load packages.json
  useEffect(() => {
    fetch('/packages.json')
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setFiltered(data);
      });
  }, []);

  // Filter when search changes
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(packages);
    } else {
      const q = query.toLowerCase();
      setFiltered(
        packages.filter(
          (pkg) =>
            pkg.title.toLowerCase().includes(q) ||
            pkg.description.toLowerCase().includes(q) ||
            pkg.location.toLowerCase().includes(q)
        )
      );
    }
  }, [query, packages]);

  // Smooth typewriter placeholder
  useEffect(() => {
    let currentText = 0;
    let currentChar = 0;
    let typing = true;
    const speed = 180;

    const interval = setInterval(() => {
      const text = placeholderTexts[currentText];

      if (typing) {
        setPlaceholder(text.slice(0, currentChar + 1));
        currentChar++;
        if (currentChar === text.length) typing = false;
      } else {
        setPlaceholder(text.slice(0, currentChar - 1));
        currentChar--;
        if (currentChar === 0) {
          typing = true;
          currentText = (currentText + 1) % placeholderTexts.length;
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-snow-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder={placeholder || ""}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm text-center
                       focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-all duration-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>

        {/* Packages Carousel */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No packages found.</p>
        ) : (
          <div className="overflow-x-auto flex space-x-4 snap-x snap-mandatory scrollbar-hide">
            {filtered.map((pkg) => (
              <Card
                key={pkg.id}
                className="group flex-shrink-0 w-64 sm:w-72 md:w-80 shadow-soft hover:shadow-adventure 
                           transition-all duration-500 transform hover:scale-102 snap-start overflow-hidden"
              >
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-brand-orange text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {pkg.location}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-brand-orange font-bold">{pkg.price}</span>
                    <span className="text-xs text-muted-foreground">{pkg.duration}</span>
                  </div>
                  <Button
                    onClick={() => onQueryClick(pkg)}
                    className="mt-4 w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" /> Send Query
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesCarousel;
