import { memo, useState } from "react";
import { MessageCircle, Eye, MapPin, Clock, Star, ImageOff } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp.png";

export interface Package {
  id: number;
  slug: string;
  title: string;
  description: string;
  location: string;
  country?: string;
  price: number | string | null;
  duration: string;
  image: string;
  rating?: number;
  live?: boolean;
}

interface PackageCardProps {
  package: Package;
  onSendQuery: (pkg: Package) => void;
  onViewItinerary: (slug: string) => void;
}

export const PackageCard = memo(
  ({ package: pkg, onSendQuery, onViewItinerary }: PackageCardProps) => {
    const [imgError, setImgError] = useState(false);

    const handleWhatsApp = () => {
      const message = encodeURIComponent(
        `Hello! I am interested in the package: ${pkg.title}`
      );
      window.open(
        `https://wa.me/919151491889?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
    };

    return (
      <div className="group bg-white/40 backdrop-blur-md rounded-2xl shadow-lg hover:-translate-y-2 transition-all overflow-hidden">
        <div className="relative h-56 bg-gray-100">
          {!imgError ? (
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <ImageOff />
            </div>
          )}

          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/80 px-2 py-1 rounded text-xs">
            <MapPin className="h-3 w-3" />
            {pkg.location}
          </div>

          {typeof pkg.rating === "number" && (
            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              {pkg.rating}
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{pkg.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {pkg.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-orange-600">
              {typeof pkg.price === "number" ? (
                <>₹{pkg.price.toLocaleString("en-IN")}</>
              ) : pkg.price === "On Request" || pkg.price === null ? (
                <>On Request</>
              ) : (
                <>₹{pkg.price}</>
              )}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              {pkg.duration}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onSendQuery(pkg)}
              className="flex-1 border border-orange-500 text-orange-500 rounded-lg text-sm py-2"
            >
              Query
            </button>

            <button
              onClick={handleWhatsApp}
              className="bg-green-500 px-3 rounded-lg"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" />
            </button>

            <button
              onClick={() => onViewItinerary(pkg.slug)}
              className="flex-1 bg-orange-500 text-white rounded-lg text-sm py-2"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  }
);