import { useState } from "react";
import { MessageCircle, Eye, MapPin, Clock, Star, ImageOff } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp.png";

/* ================= PACKAGE TYPE (SOURCE OF TRUTH) ================= */

export interface Package {
  id: number;
  slug: string;
  title: string;
  description: string;
  location: string;
  price: string;
  duration: string;
  image: string;
  rating?: number;
  live?: boolean;
  type?: "international" | "domestic";
  categories?: string[];
}

/* ================= PROPS ================= */

interface PackageCardProps {
  package: Package;
  onSendQuery: (pkg: Package) => void;
  onViewItinerary: (slug: string) => void;
}

/* ================= COMPONENT ================= */

export const PackageCard = ({
  package: pkg,
  onSendQuery,
  onViewItinerary,
}: PackageCardProps) => {
  const [imgError, setImgError] = useState(false);

  const handleSendQuery = () => {
    onSendQuery(pkg);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello! I am interested in the package: ${pkg.title}`
    );
    window.open(`https://wa.me/919151491889?text=${message}`, "_blank");
  };

  return (
    <div
      className="group relative backdrop-blur-md bg-white/40 border border-white/20 
                 rounded-2xl shadow-lg hover:shadow-2xl 
                 hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden flex items-center justify-center bg-gray-100">
        {!imgError ? (
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageOff className="w-12 h-12 mb-2" />
            <span className="text-sm">Image not available</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {pkg.live && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Live Booking
          </div>
        )}

        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-medium">
          <MapPin className="h-3 w-3" />
          {pkg.location}
        </div>

        {pkg.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-900">{pkg.rating}</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {pkg.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {pkg.description}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-[hsl(var(--brand-orange))]">
              {pkg.price}
            </span>
            <span className="text-xs text-gray-500 ml-1">per person</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {pkg.duration}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-1 mt-auto">
          {/* QUERY */}
          <button
            onClick={handleSendQuery}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5
                       border border-[hsl(var(--brand-orange))] text-[hsl(var(--brand-orange))]
                       rounded-lg hover:bg-[hsl(var(--brand-orange))] hover:text-white
                       transition-colors duration-300 font-medium text-xs"
          >
            <MessageCircle className="h-3 w-3" />
            Query
          </button>

          {/* WHATSAPP */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1 px-3 py-1.5 
                       bg-green-500 text-white rounded-lg hover:bg-green-600 
                       transition-colors duration-300 font-medium text-xs"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" />
            WhatsApp
          </button>

          {/* VIEW */}
          <button
            onClick={() => onViewItinerary(pkg.slug)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5
                       bg-[hsl(var(--brand-orange))] text-white rounded-lg
                       hover:bg-[hsl(var(--brand-orange))]/90
                       transition-colors duration-300 font-medium text-xs"
          >
            <Eye className="h-3 w-3" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};
