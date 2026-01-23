import { useMemo } from "react";
import { Package } from "@/types";

interface SimilarPackagesProps {
  packages: Package[];
  selectedPackage: Package;
  onViewItinerary: (slug: string) => void;
  onSendQuery: () => void;
}

const SimilarPackages = ({
  packages,
  selectedPackage,
  onViewItinerary,
  onSendQuery,
}: SimilarPackagesProps) => {
  // Filter similar packages
  const similar = useMemo(() => {
    return packages
      .filter((p) => p.slug !== selectedPackage.slug)
      .slice(0, 4);
  }, [packages, selectedPackage.slug]);

  return (
    <div className="mt-10">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Similar Packages</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similar.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-44 object-cover"
              />

              {/* Price Tag */}
              <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {pkg.price ? `₹ ${pkg.price}` : "On Request"}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">
                {pkg.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                {pkg.location} • {pkg.duration}
              </p>

              <button
                onClick={() => onViewItinerary(pkg.slug)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full text-sm font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Query Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSendQuery}
          className="px-6 py-2 rounded-full bg-gray-900 text-white"
        >
          Ask About This Package
        </button>
      </div>
    </div>
  );
};

export default SimilarPackages;