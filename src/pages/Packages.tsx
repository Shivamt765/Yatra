import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, Link, Outlet } from "react-router-dom";
import { Search, X, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

import { PackageCard } from "@/components/packages/PackageCard";
import { CategoryTabs } from "@/components/packages/CategoryTabs";
import { QueryModal } from "@/components/packages/QueryModal";
import { useDebounce } from "@/hooks/useDebounce";
import packageHero from "@/assets/package_horizontal.jpg";

/* ================= TYPES ================= */

export interface Package {
  id: number;
  slug: string;
  title: string;
  description: string;
  type: "international" | "domestic";
  country?: string;
  location: string;
  categories: string[];
  price: number | string | null;
  duration: string;
  image: string;
  rating?: number;
  live?: boolean;
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
  const { category, country } = useParams();

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 250);

  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("all");

  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= URL CATEGORY ================= */

  useEffect(() => {
    if (category === "international") {
      setActiveCategory("international");
      setActiveCountry(country || null);
    } else if (category === "domestic") {
      setActiveCategory("domestic");
      setActiveCountry(null);
    } else {
      setActiveCategory("all");
      setActiveCountry(null);
    }
  }, [category, country]);

  useEffect(() => {
    if (activeCategory !== "international") {
      setActiveCountry(null);
    }
  }, [activeCategory]);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await fetch("/packages.json");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPackages(data);
      } catch {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  /* ================= COUNTRIES ================= */

  const internationalCountries = useMemo(() => {
    if (activeCategory !== "international") return [];

    return Array.from(
      new Set(
        packages
          .filter(
            (p) => p.type === "international" && typeof p.country === "string"
          )
          .map((p) => p.country!)
      )
    );
  }, [packages, activeCategory]);

  /* ================= FILTER ================= */

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
      result = result.filter((p) => p.country === activeCountry);
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
    <div className="flex flex-col w-full bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* HERO */}
      <section className="relative h-[45vh] flex items-center justify-center">
        <Link
          to="/"
          className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${packageHero})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Let's Plan Your Adventure
          </h1>
          <p className="text-base sm:text-xl">
            Discover hand-picked travel experiences
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 w-full">
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
          onCategoryChange={(cat) => {
            navigate(cat === "all" ? "/packages" : `/packages/${cat}`);
          }}
        />

        {/* COUNTRY FILTER */}
        {activeCategory === "international" && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => navigate("/packages/international")}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeCountry === null
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white"
              }`}
            >
              All International
            </button>

            {internationalCountries.map((country) => (
              <button
                key={country}
                onClick={() =>
                  navigate(`/packages/international/${country}`)
                }
                className={`px-4 py-2 rounded-full border text-sm ${
                  activeCountry === country
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onViewItinerary={() =>
                  navigate(`/packages/details/${pkg.slug}`)
                }
                onSendQuery={() => {
                  setSelectedPackage(pkg);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center py-20">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p>{error}</p>
          </div>
        )}
      </div>

      <QueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        package={selectedPackage}
      />

      {/* IMPORTANT: This makes nested routes work */}
      <Outlet />
    </div>
  );
};

export default Packages;