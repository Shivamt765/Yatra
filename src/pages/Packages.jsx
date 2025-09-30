import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const fetchPackages = async () => {
  const res = await fetch("/packages.json");
  return res.json();
};

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Load packages
  useEffect(() => {
    fetchPackages()
      .then((data) => {
        setPackages(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Failed to fetch packages:", err));
  }, []);

  // Filter packages based on search
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(packages);
      setCurrentIndex(0);
    } else {
      const lower = query.toLowerCase();
      const filteredData = packages.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.location.toLowerCase().includes(lower)
      );
      setFiltered(filteredData);
      setCurrentIndex(0);
    }
  }, [query, packages]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);

  return (
    <>
      {/* Pure Heading Div - Hardcoded */}
      <div className="w-full py-12 bg-white text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Explore Our Packages
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Search and discover adventures tailored just for you
        </p>
      </div>

      {/* Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search by city or package..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Carousel */}
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No packages found.</p>
          ) : (
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
              >
                <ChevronRight />
              </button>

              {/* Package Circle Cards */}
              <div className="flex justify-center gap-6 overflow-hidden px-12">
                {filtered
                  .slice(currentIndex, currentIndex + 3)
                  .map((pkg) => (
                    <div
                      key={pkg.id}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => navigate(`/packages/${pkg.id}`)}
                    >
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-3 text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">
                        {pkg.location}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Packages;
