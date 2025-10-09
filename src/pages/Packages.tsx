import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Loader2, AlertCircle, ChevronRight, ArrowLeft, Mail } from 'lucide-react';
import { PackageCard } from '@/components/packages/PackageCard';
import { CategoryTabs } from '@/components/packages/CategoryTabs';
import { QueryModal } from '@/components/packages/QueryModal';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import packageHero from '@/assets/package_horizontal.jpg';

export interface Package {
  id: number;
  title: string;
  location: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  rating: number;
  live: boolean;
  categories: string[];
}

type CategoryType = 'live' | 'upcoming' | 'student' | 'corporate' | 'family' | 'general';

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('upcoming');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/packages.json');
        if (!response.ok) throw new Error('Failed to load packages');
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    let filtered = packages;

    // Category filter
    if (activeCategory === 'live') {
      filtered = filtered.filter(pkg => pkg.live);
    } else if (activeCategory !== 'upcoming') {
      filtered = filtered.filter(pkg =>
        pkg.categories.includes(activeCategory) ||
        (activeCategory === 'general' && (pkg.categories.includes('general') || pkg.categories.length === 1))
      );
    }

    // Search filter
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query) ||
        pkg.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [packages, activeCategory, debouncedSearch]);

  const handleSendQuery = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleViewItinerary = (id: number) => {
    navigate(`/packages/${id}`);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${packageHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Let's Plan Your Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            We're here to help you create memories that last a lifetime
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-gray-900 backdrop-blur-md bg-white/90 border border-white/50 placeholder-gray-500 shadow-lg focus:ring-2 focus:ring-[hsl(var(--brand-orange))] focus:border-transparent transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--brand-orange))]" />
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="backdrop-blur-md bg-white/90 border border-red-200 rounded-2xl p-8 max-w-md text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Packages</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-[hsl(var(--brand-orange))] text-white rounded-lg hover:bg-[hsl(var(--brand-orange))]/90 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        {!loading && !error && filteredPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onSendQuery={handleSendQuery}
                onViewItinerary={handleViewItinerary}
              />
            ))}
          </div>
        )}
      </div>

      {/* Query Modal */}
      <QueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        package={selectedPackage}
      />
    </div>
  );
};

export default Packages;
