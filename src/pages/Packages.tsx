import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { PackageCard } from '@/components/packages/PackageCard';
import { CategoryTabs } from '@/components/packages/CategoryTabs';
import { QueryModal } from '@/components/packages/QueryModal';
import { useDebounce } from '@/hooks/useDebounce';

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

  // Fetch packages on mount
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

  // Filter packages based on category and search
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
      {/* Hero Section with Breadcrumb */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--brand-orange))] to-orange-500 py-20">
        <div className="absolute inset-0 backdrop-blur-3xl bg-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-white/80 mb-6" aria-label="Breadcrumb">
            <button 
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">Packages</span>
          </nav>

          {/* Hero Content */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-playfair italic text-white mb-4">
              Discover Your Next Adventure
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Browse our handpicked collection of travel packages designed to create unforgettable memories
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages by name, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-gray-900
                         backdrop-blur-md bg-white/90 border border-white/50
                         placeholder-gray-500 shadow-lg
                         focus:ring-2 focus:ring-[hsl(var(--brand-orange))] focus:border-transparent
                         transition-all duration-300"
              aria-label="Search packages"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Clear search"
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

        {/* Empty State */}
        {!loading && !error && filteredPackages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="backdrop-blur-md bg-white/90 border border-white/50 rounded-2xl p-8 max-w-md text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Packages Found</h3>
              <p className="text-gray-600 mb-6">
                {debouncedSearch 
                  ? `No packages match "${debouncedSearch}". Try a different search term.`
                  : 'No packages available in this category.'}
              </p>
              {(debouncedSearch || activeCategory !== 'upcoming') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('upcoming');
                  }}
                  className="px-6 py-2 bg-[hsl(var(--brand-orange))] text-white rounded-lg hover:bg-[hsl(var(--brand-orange))]/90 transition-colors"
                >
                  View All Packages
                </button>
              )}
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
