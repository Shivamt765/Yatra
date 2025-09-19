import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const PackageSearch = () => {
  const [query, setQuery] = useState("");
  const [packages, setPackages] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Load packages.json
  useEffect(() => {
    fetch("/packages.json")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setFiltered(data);
      });
  }, []);

  // Filter packages on query change
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(packages);
    } else {
      const lowerQuery = query.toLowerCase();
      setFiltered(
        packages.filter(
          (pkg) =>
            pkg.title.toLowerCase().includes(lowerQuery) ||
            pkg.description.toLowerCase().includes(lowerQuery) ||
            pkg.location.toLowerCase().includes(lowerQuery)
        )
      );
    }
  }, [query, packages]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search packages (e.g. Nepal, Trek, Beach)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#0076BE] focus:border-[#0076BE] transition-all duration-300"
        />
      </div>

      {/* Results */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {pkg.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {pkg.description}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-[#0076BE] font-bold">{pkg.price}</span>
                  <span className="text-sm text-gray-500">{pkg.duration}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No packages found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageSearch;
