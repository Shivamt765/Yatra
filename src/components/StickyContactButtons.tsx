import { Phone, BrandWhatsapp } from "lucide-react";

const StickyContactButtons = () => {
  return (
    <div className="fixed left-4 bottom-4 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919696415586"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <BrandWhatsapp className="w-5 h-5" />
        WhatsApp
      </a>

      {/* Call Now Button */}
      <a
        href="tel:+919696415586"
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <Phone className="w-5 h-5" />
        Call Now
      </a>
    </div>
  );
};

export default StickyContactButtons;