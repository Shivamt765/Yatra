import { useState } from 'react';
import { Phone, MessageCircle, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open('https://wa.me/+911234567890?text=Hi! I am interested in your travel packages.', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+911234567890');
  };

  const handleEmail = () => {
    window.open('mailto:info@yatraholiday.com?subject=Travel Package Inquiry');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Contact Button */}
      <div className="relative">
        {/* Contact Options */}
        <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}>
          {/* WhatsApp */}
          <Button
            onClick={handleWhatsApp}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>

          {/* Call */}
          <Button
            onClick={handleCall}
            className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Call us"
          >
            <Phone className="h-6 w-6" />
          </Button>

          {/* Email */}
          <Button
            onClick={handleEmail}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Send email"
          >
            <Mail className="h-6 w-6" />
          </Button>
        </div>

        {/* Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-180' 
              : 'bg-brand-orange hover:bg-brand-orange/90 pulse'
          }`}
        >
          {isOpen ? (
            <X className="h-8 w-8 text-white" />
          ) : (
            <Phone className="h-8 w-8 text-white animate-pulse" />
          )}
        </Button>

        {/* Ripple Effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-brand-orange animate-ping opacity-20"></div>
        )}
      </div>

      {/* Contact Info Tooltip */}
      {isOpen && (
        <div className="absolute bottom-20 right-20 bg-white rounded-lg shadow-xl p-4 border border-gray-200 max-w-xs">
          <h4 className="font-bold text-brand-orange mb-2">Quick Contact</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>📞 +91 123 456 7890</p>
            <p>📧 info@yatraholiday.com</p>
            <p>💬 WhatsApp available 24/7</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingContact;