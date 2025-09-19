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
    <div className="max-w-5xl mx-auto py-20 px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-6">{pkg.title}</h1>
      <img
        src={pkg.image}
        alt={pkg.title}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />
      <p className="text-lg text-gray-700 mb-4">{pkg.description}</p>

      <div className="flex gap-6 text-lg font-semibold text-blue-600 mb-6">
        <span>{pkg.duration}</span>
        <span>{pkg.price}</span>
        <span>{pkg.location}</span>
      </div>

      {/* Example Itinerary */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Itinerary</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Day 1: Arrival & Orientation</li>
          <li>Day 2: Adventure activities</li>
          <li>Day 3+: Guided tours</li>
          <li>Final Day: Departure</li>
        </ul>
      </div>
    </div>
  );
};

export default PackageDetail;
