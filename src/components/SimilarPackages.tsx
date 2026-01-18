import React, { useMemo } from "react";
import { PackageCard } from "@/components/packages/PackageCard";
import type { Package } from "@/components/packages/PackageCard";

interface SimilarPackagesProps {
  packages: Package[];
  selectedPackage: Package | null;
  onViewItinerary: (slug: string) => void;
  onSendQuery: (pkg: Package) => void;
}

const SimilarPackages = ({
  packages,
  selectedPackage,
  onViewItinerary,
  onSendQuery,
}: SimilarPackagesProps) => {
  const similar = useMemo(() => {
    if (!selectedPackage) return [];

    return packages
      .filter((p) => p.id !== selectedPackage.id)
      .map((p) => {
        let score = 0;

        if (p.location === selectedPackage.location) score += 5;
        if (p.type === selectedPackage.type) score += 3;

        const commonCategories =
          p.categories?.filter((c) =>
            selectedPackage.categories?.includes(c)
          ) || [];
        score += commonCategories.length * 2;

        return { pkg: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.pkg);
  }, [packages, selectedPackage]);

  if (!similar.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">People also like</h2>

      {/* Slider Container */}
      <div className="overflow-hidden">
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2">
          {similar.map((pkg) => (
            <div
              key={pkg.id}
              className="min-w-[260px] max-w-[260px] snap-start"
            >
              <PackageCard
                package={pkg}
                onViewItinerary={() => onViewItinerary(pkg.slug)}
                onSendQuery={() => onSendQuery(pkg)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarPackages;