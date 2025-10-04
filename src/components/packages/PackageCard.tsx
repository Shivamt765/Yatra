import { MessageCircle, Eye, MapPin, Clock, Star } from 'lucide-react';
import { Package } from '@/pages/Packages';

interface PackageCardProps {
  package: Package;
  onSendQuery: (pkg: Package) => void;
  onViewItinerary: (id: number) => void;
}

export const PackageCard = ({ package: pkg, onSendQuery, onViewItinerary }: PackageCardProps) => {
  return (
    <div
      className="group relative backdrop-blur-md bg-white/40 border border-white/20 
                 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                 hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Live Badge */}
        {pkg.live && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Live Booking
          </div>
        )}

        {/* Location Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-medium">
          <MapPin className="h-3 w-3" />
          {pkg.location}
        </div>

        {/* Rating */}
        {pkg.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-900">{pkg.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {pkg.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {pkg.description}
        </p>

        {/* Price & Duration */}
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

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onSendQuery(pkg)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                     border border-[hsl(var(--brand-orange))] text-[hsl(var(--brand-orange))]
                     rounded-xl hover:bg-[hsl(var(--brand-orange))] hover:text-white
                     transition-colors duration-300 font-medium text-sm"
            aria-label={`Send query about ${pkg.title}`}
          >
            <MessageCircle className="h-4 w-4" />
            Send Query
          </button>
          <button
            onClick={() => onViewItinerary(pkg.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                     bg-[hsl(var(--brand-orange))] text-white rounded-xl
                     hover:bg-[hsl(var(--brand-orange))]/90
                     transition-colors duration-300 font-medium text-sm"
            aria-label={`View itinerary for ${pkg.title}`}
          >
            <Eye className="h-4 w-4" />
            View Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};
