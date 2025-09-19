import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

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
    fetchPackages().then((data) => {
      setPackages(data);
      setFiltered(data);
    });
  }, []);

  // Filter by search
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(packages);
    } else {
      const lower = query.toLowerCase();
      setFiltered(
        packages.filter(
          (p) =>
            p.title.toLowerCase().includes(lower) ||
            p.location.toLowerCase().includes(lower)
        )
      );
    }
  }, [query, packages]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our Packages
          </h2>
          <p className="text-lg text-gray-600">
            Search and discover adventures tailored just for you
          </p>
        </div>

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
            {/* Nav Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2"
            >
              <ChevronRight />
            </button>

            {/* Circle Cards */}
            <div className="flex justify-center gap-6 overflow-hidden px-12">
              {filtered.slice(currentIndex, currentIndex + 3).map((pkg) => (
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
  );
};

export default Packages;
