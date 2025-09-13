import { Flame, Clock, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionalBanner = () => {
  return (
    <div className="bg-gradient-to-r from-earth-brown via-mountain-green to-sky-blue py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between text-white">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <Flame className="h-6 w-6 text-orange-400 animate-pulse" />
            <span className="text-lg font-bold">Early Bird Discounts</span>
            <span className="text-2xl font-bold">- Book Your Adventure Today!</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Limited Time Offer</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <Percent className="h-4 w-4" />
              <span className="font-bold">UP TO 30% OFF</span>
            </div>
            
            <Button variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20 font-semibold">
              Claim Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;