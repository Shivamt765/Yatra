import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Search,
  X,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { PackageCard } from "@/components/packages/PackageCard";
import { CategoryTabs } from "@/components/packages/CategoryTabs";
import { QueryModal } from "@/components/packages/QueryModal";
import { useDebounce } from "@/hooks/useDebounce";
import packageHero from "@/assets/package_horizontal.jpg";

/* ================= TYPES ================= */

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

  // decides International / Domestic
  type: "international" | "domestic";

  // used for Family / Honeymoon / Adventure
  categories: string[];
}

export type CategoryType =
  | "all"
  | "international"
  | "domestic"
  | "family"
  | "honeymoon"
  | "adventure";

/* ================= COMPONENT ================= */

const Packages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 250);

  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("all");

  const [selectedPackage, setSelectedPackage] =
    useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= READ CATEGORY FROM URL ================= */
  useEffect(() => {
    const category = searchParams.get("category") as CategoryType | null;

    if (
      category === "international" ||
      category === "domestic" ||
      category === "family" ||
      category === "honeymoon" ||
      category === "adventure"
    ) {
      setActiveCategory(category);
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]);

  /* ================= FETCH PACKAGES ================= */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/packages.json");
        if (!response.ok) throw new Error("Failed to load packages");

        const data = await response.json();
        setPackages(data);
      } catch {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredPackages = useMemo(() => {
    let result: Package[] = [];

    switch (activeCategory) {
      case "international":
        result = packages.filter(p => p.type === "international");
        break;

      case "domestic":
        result = packages.filter(p => p.type === "domestic");
        break;

      case "family":
        result = packages.filter(
          p => p.type === "domestic" && p.categories.includes("family")
        );
        break;

      case "honeymoon":
        result = packages.filter(
          p => p.type === "domestic" && p.categories.includes("honeymoon")
        );
        break;

      case "adventure":
        result = packages.filter(
          p => p.type === "domestic" && p.categories.includes("adventure")
        );
        break;

      default:
        result = packages;
    }

    // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(pkg =>
        pkg.title.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q) ||
        pkg.location.toLowerCase().includes(q)
      );
    }

    return result;
  }, [packages, activeCategory, debouncedSearch]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-orange-50 via-white to-blue-50">

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] flex items-center justify-center">

        {/* Back to Home */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center gap-2
                     px-4 py-2 rounded-full
                     bg-white/20 backdrop-blur-md
                     text-white text-sm font-medium
                     hover:bg-white/30 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${packageHero})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Let's Plan Your Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Discover hand-picked travel experiences
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">

        {/* ================= SEARCH ================= */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* ================= CATEGORY TABS ================= */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* ================= STATES ================= */}
        {loading && (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center py-20">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
          </div>
        )}

        {!loading && !error && filteredPackages.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredPackages.map(pkg => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onViewItinerary={() => navigate(`/packages/${pkg.id}`)}
                onSendQuery={() => {
                  setSelectedPackage(pkg);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPackages.length === 0 && (
          <p className="text-center py-20 text-gray-500 text-lg">
            🚧 Packages coming soon
          </p>
        )}
      </div>

      {/* ================= QUERY MODAL ================= */}
      <QueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        package={selectedPackage}
      />
    </div>
  );
};

export default Packages;
