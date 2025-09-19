import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingContact = () => {
  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/919696415586?text=Hi! I am interested in your travel packages.',
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* WhatsApp Floating Button */}
        <Button
          onClick={handleWhatsApp}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default FloatingContact;
