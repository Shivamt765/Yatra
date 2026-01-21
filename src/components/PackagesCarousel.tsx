import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Search, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Package {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  duration: string;
  image: string;
  rating?: number;
}

const PackagesCarousel = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Package[]>([]);
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();

  const placeholderTexts = ["Nepal Trip", "Dubai luxury", "Mansaovar", "Thailand"];

  useEffect(() => {
    fetch('/packages.json')
      .then(res => res.json())
      .then((data: Package[]) => {
        setPackages(data);
        setFiltered(data);
      })
      .catch(err => console.error('Error loading packages:', err));
  }, []);

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

  useEffect(() => {
    let currentText = 0;
    let currentChar = 0;
    let typing = true;
    const speed = 100;

    const interval = setInterval(() => {
      const text = placeholderTexts[currentText];

      if (typing) {
        setPlaceholder(text.slice(0, currentChar + 1));
        currentChar++;
        if (currentChar === text.length) {
          setTimeout(() => {
            typing = false;
          }, 1000);
        }
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
    <section id="packages" className="relative py-24 bg-gray-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair italic text-gray-900 mb-6 tracking-tight">
            Discover Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-900">
              Adventure
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked destinations and curated experiences that transform your travels into unforgettable memories
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={placeholder || "Where do you want to go?"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-14 pr-14 py-4 rounded-full text-gray-900
                           bg-white/20 backdrop-blur-xl
                           placeholder-gray-500 shadow-lg
                           focus:ring-2 focus:ring-gray-300 focus:border-transparent 
                           transition-all duration-300 text-lg"
              />
              <Search className="absolute left-5 h-5 w-5 text-gray-500" />
              <div className="absolute right-2">
                <Button 
                  className="rounded-full h-12 w-12 bg-gray-900 hover:bg-gray-800 shadow-lg"
                  size="icon"
                >
                  <Search className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found matching your search.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto pb-6">
              <div className="flex space-x-6 w-max">
                {filtered.map((pkg, index) => (
                  <Card
                    key={pkg.id}
                    className="group w-[340px] rounded-2xl overflow-hidden
                             backdrop-blur-xl bg-white/20
                             transform hover:-translate-y-2 hover:shadow-lg shadow-black/20
                             transition-all duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10">
                        <span className="text-white text-sm font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {pkg.location}
                        </span>
                      </div>
                      {pkg.rating && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10">
                          <span className="text-white text-sm font-medium flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {pkg.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {pkg.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-gray-900">{pkg.price}</p>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {pkg.duration}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Button
  onClick={() => navigate(`/packages/${pkg.id}`)}
  className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
>
  <Send className="mr-2 h-4 w-4" />
  View Itinerary
</Button>

                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesCarousel;
