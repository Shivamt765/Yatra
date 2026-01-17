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
import SimilarPackages from "@/components/SimilarPackages";
import { useDebounce } from "@/hooks/useDebounce";
import packageHero from "@/assets/package_horizontal.jpg";

export interface Package {
  id: number;
  title: string;
  location: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  rating: number;
  live?: boolean;
  type: "international" | "domestic";
  categories: string[];
  slug: string;
}

export type CategoryType =
  | "all"
  | "international"
  | "domestic"
  | "family"
  | "honeymoon"
  | "adventure";

const Packages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 250);

  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
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

  /* ================= RESET COUNTRY ON CATEGORY CHANGE ================= */
  useEffect(() => {
    setActiveCountry(null);
  }, [activeCategory]);

  /* ================= FETCH PACKAGES ================= */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/packages.json");
        if (!response.ok) throw new Error();
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

  /* ================= INTERNATIONAL COUNTRIES ================= */
  const internationalCountries = useMemo(() => {
    if (activeCategory !== "international") return [];
    return Array.from(
      new Set(
        packages
          .filter((p) => p.type === "international")
          .map((p) => p.location)
      )
    );
  }, [packages, activeCategory]);

  /* ================= FILTER LOGIC ================= */
  const filteredPackages = useMemo(() => {
    let result = [...packages];

    switch (activeCategory) {
      case "international":
        result = result.filter((p) => p.type === "international");
        break;
      case "domestic":
        result = result.filter((p) => p.type === "domestic");
        break;
      case "family":
        result = result.filter((p) => p.categories.includes("family"));
        break;
      case "honeymoon":
        result = result.filter((p) => p.categories.includes("honeymoon"));
        break;
      case "adventure":
        result = result.filter((p) => p.categories.includes("adventure"));
        break;
    }

    if (activeCategory === "international" && activeCountry) {
      result = result.filter((p) => p.location === activeCountry);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    return result;
  }, [packages, activeCategory, activeCountry, debouncedSearch]);

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm hover:bg-white/30"
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
          <p className="text-xl">Discover hand-picked travel experiences</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        {/* SEARCH */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white shadow-lg"
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

        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {activeCategory === "international" &&
          internationalCountries.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button
                onClick={() => setActiveCountry(null)}
                className={`px-5 py-2 rounded-full border text-sm ${
                  activeCountry === null
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white hover:border-orange-300"
                }`}
              >
                All International
              </button>

              {internationalCountries.map((country) => (
                <button
                  key={country}
                  onClick={() => setActiveCountry(country)}
                  className={`px-5 py-2 rounded-full border text-sm ${
                    activeCountry === country
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white hover:border-orange-300"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          )}

        {loading && (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        )}

        {!loading && !error && filteredPackages.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onViewItinerary={() =>
                    navigate(`/packages/${pkg.slug}`)
                  }
                  onSendQuery={() => {
                    setSelectedPackage(pkg);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>

            {selectedPackage && (
              <SimilarPackages
                packages={packages}
                selectedPackage={selectedPackage}
                onViewItinerary={(slug) =>
                  navigate(`/packages/${slug}`)
                }
                onSendQuery={(pkg) => {
                  setSelectedPackage(pkg);
                  setIsModalOpen(true);
                }}
              />
            )}
          </>
        )}

        {!loading && !error && filteredPackages.length === 0 && (
          <p className="text-center py-20 text-gray-500">
            Packages coming soon
          </p>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center py-20">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-600">{error}</p>
          </div>
        )}
      </div>

      <QueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        package={selectedPackage}
      />
    </div>
  );
};

export default Packages;
