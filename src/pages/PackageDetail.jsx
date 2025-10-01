import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const fetchPackages = async () => {
  const res = await fetch("/packages.json");
  return res.json();
};

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages().then((data) => {
      const found = data.find((p) => p.id === parseInt(id));
      setPkg(found);
    });
  }, [id]);

  if (!pkg) return <p className="text-center py-20">Loading...</p>;

  return (
     <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-playfair font-bold mb-4 text-brand-orange">
        {pkg.title}
      </h1>
      <img src={pkg.image} alt={pkg.title} className="w-full rounded-lg mb-6 shadow-lg" />
      <p className="text-gray-700 mb-6">{pkg.description}</p>

      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-brand-orange">
          <MapPin className="w-5 h-5" />
          <span>{pkg.location}</span>
        </div>
        <div className="flex items-center gap-2 text-brand-orange">
          <Clock className="w-5 h-5" />
          <span>{pkg.duration}</span>
        </div>
        {pkg.rating && (
          <div className="flex items-center gap-2 text-yellow-400">
            <Star className="w-5 h-5" />
            <span>{pkg.rating}</span>
          </div>
        )}
      </div>

      <Button className="bg-brand-orange hover:bg-brand-orange-light text-white rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
        Book Now
      </Button>
    </div>
  );
};

export default PackageDetail;
