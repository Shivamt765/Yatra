import { useState, useEffect } from 'react';
import { Sparkles, Gift, Star, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OccasionBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 text-orange-300 animate-bounce">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute top-20 right-20 text-red-300 animate-pulse">
          <Star className="h-6 w-6" />
        </div>
        <div className="absolute bottom-20 left-20 text-yellow-400 animate-bounce delay-300">
          <Gift className="h-10 w-10" />
        </div>
        <div className="absolute bottom-10 right-10 text-orange-400 animate-pulse delay-500">
          <TreePine className="h-12 w-12" />
        </div>
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat bg-center" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {/* Dussehra Greeting */}
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                शुभ दशहरा
              </span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-orange-700 mb-2">
              Happy Dussehra!
            </h3>
            <p className="text-lg text-orange-600 max-w-2xl mx-auto">
              Celebrate the victory of good over evil with an adventurous journey to the sacred lands
            </p>
          </div>

          {/* Festive Offer */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-200 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-orange-500 mr-3" />
              <h4 className="text-2xl md:text-3xl font-bold text-orange-700">
                Dussehra Special Offer
              </h4>
              <Sparkles className="h-8 w-8 text-orange-500 ml-3" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-xl">
                <Gift className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h5 className="font-bold text-orange-700 mb-2">Up to 30% OFF</h5>
                <p className="text-sm text-orange-600">On all Nepal packages</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-100 to-yellow-100 p-6 rounded-xl">
                <Star className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h5 className="font-bold text-red-700 mb-2">Free Aarti Experience</h5>
                <p className="text-sm text-red-600">At Kedarnath & Haridwar</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-xl">
                <TreePine className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h5 className="font-bold text-yellow-700 mb-2">Complimentary Meals</h5>
                <p className="text-sm text-yellow-600">Traditional festive cuisine</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-orange-700 mb-6 text-lg">
                🕉️ Embark on a spiritual journey this auspicious season 🕉️
              </p>
              
              <Button 
                onClick={scrollToPackages}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Gift className="mr-2 h-5 w-5" />
                Claim Your Dussehra Offer
              </Button>
              
              <p className="text-sm text-orange-600 mt-4">
                *Offer valid till October 31st. T&C Apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OccasionBanner;