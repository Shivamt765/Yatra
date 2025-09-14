import { Flame, Clock, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionalBanner = () => {
  return (
    <div className="bg-gradient-to-r from-earth-brown via-mountain-green to-sky-blue py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between text-white space-y-3 sm:space-y-0">
          
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-3 text-center sm:text-left space-y-1 sm:space-y-0">
            <Flame className="h-6 w-6 text-orange-400 animate-pulse" />
            <span className="text-lg sm:text-xl font-bold">Early Bird Discounts</span>
            <span className="text-base sm:text-2xl font-bold">- Book Your Adventure Today!</span>
          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0 text-center sm:text-left">
            <div className="flex items-center space-x-2 text-sm sm:text-base">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Limited Time Offer</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-sm sm:text-base">
              <Percent className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-bold">UP TO 30% OFF</span>
            </div>
            
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/40 text-white hover:bg-white/20 font-semibold text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
            >
              Claim Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
