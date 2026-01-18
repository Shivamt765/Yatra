import React, { useMemo } from "react";
import { PackageCard } from "@/components/packages/PackageCard";
import type { Package } from "@/components/packages/PackageCard";

/* ================= PROPS ================= */

interface SimilarPackagesProps {
  packages: Package[];
  selectedPackage: Package | null;
  onViewItinerary: (slug: string) => void;
  onSendQuery: (pkg: Package) => void;
}

/* ================= COMPONENT ================= */

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

    
           
          <div className="flex overflow-x-auto gap-4 no-scrollbar">
  {similar.map((pkg) => (
    <div className="min-w-[260px]" key={pkg.id}>
      <PackageCard
        package={pkg}
        onViewItinerary={() => onViewItinerary(pkg.slug)}
        onSendQuery={() => onSendQuery(pkg)}
      />
    </div>
  ))}
</div>

    </section>
  );
};

export default SimilarPackages;