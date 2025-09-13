import { useState } from 'react';
import { MapPin, Calendar, Users, ChevronLeft, ChevronRight, Send, Sunrise, Mountain, Camera, TreePine, Waves, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import nepalImage from '@/assets/nepal-everest.jpg';
import uttarakhandImage from '@/assets/uttarakhand-rafting.jpg';

const packages = [
  {
    id: 1,
    title: "Everest Base Camp Trek",
    location: "Nepal",
    duration: "14 Days",
    price: "₹85,000",
    originalPrice: "₹1,20,000",
    image: nepalImage,
    description: "Journey to the base of the world's highest peak through stunning landscapes.",
    highlights: ["Sherpa Culture", "Mountain Views", "Adventure Trek"],
    groupSize: "8-12 People",
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup, hotel check-in, briefing", icon: Home },
      { day: 2, title: "Fly to Lukla & Trek to Phakding", description: "Scenic mountain flight, first day of trekking", icon: Mountain },
      { day: 3, title: "Trek to Namche Bazaar", description: "Gateway to Everest, Sherpa culture", icon: TreePine },
      { day: 4, title: "Acclimatization Day", description: "Rest day, explore local markets", icon: Heart },
      { day: 5, title: "Trek to Tengboche", description: "Famous monastery visit", icon: Sunrise },
      { day: 6, title: "Trek to Dingboche", description: "Higher altitude adaptation", icon: Mountain },
      { day: 7, title: "Acclimatization Day", description: "Side hikes for better acclimatization", icon: Camera },
      { day: 8, title: "Trek to Lobuche", description: "Final approach to base camp", icon: TreePine }
    ]
  },
  {
    id: 2,
    title: "Uttarakhand Adventure Package",
    location: "Uttarakhand",
    duration: "7 Days",
    price: "₹25,000",
    originalPrice: "₹35,000",
    image: uttarakhandImage,
    description: "Rishikesh rafting, yoga retreats, and spiritual journey through Dev Bhoomi.",
    highlights: ["River Rafting", "Yoga & Meditation", "Temple Visits"],
    groupSize: "6-10 People",
    itinerary: [
      { day: 1, title: "Arrival in Rishikesh", description: "Hotel check-in, Ganga Aarti ceremony", icon: Home },
      { day: 2, title: "White Water Rafting", description: "Thrilling rapids on river Ganges", icon: Waves },
      { day: 3, title: "Yoga & Meditation", description: "Morning yoga session, spiritual activities", icon: Heart },
      { day: 4, title: "Haridwar Temple Tour", description: "Visit sacred temples and ghats", icon: Sunrise },
      { day: 5, title: "Adventure Activities", description: "Bungee jumping, flying fox", icon: Mountain },
      { day: 6, title: "Nature Walk & Photography", description: "Explore local flora and fauna", icon: Camera },
      { day: 7, title: "Departure", description: "Shopping, departure transfers", icon: Home }
    ]
  },
  {
    id: 3,
    title: "Annapurna Circuit Trek",
    location: "Nepal",
    duration: "16 Days",
    price: "₹75,000",
    originalPrice: "₹1,00,000",
    image: nepalImage,
    description: "Classic trek through diverse landscapes and traditional mountain villages.",
    highlights: ["Thorong La Pass", "Hot Springs", "Cultural Villages"],
    groupSize: "8-15 People",
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Hotel check-in, trek preparation", icon: Home },
      { day: 2, title: "Drive to Besisahar", description: "Start of Annapurna circuit", icon: Mountain },
      { day: 3, title: "Trek to Chame", description: "Enter Annapurna conservation area", icon: TreePine },
      { day: 4, title: "Trek to Pisang", description: "Beautiful mountain vistas", icon: Camera },
      { day: 5, title: "Trek to Manang", description: "Acclimatization village", icon: Heart },
      { day: 6, title: "Rest Day in Manang", description: "Explore local culture", icon: Sunrise },
      { day: 7, title: "Trek to Yak Kharka", description: "Higher altitude trekking", icon: Mountain },
      { day: 8, title: "Cross Thorong La Pass", description: "Highest point of the trek", icon: Mountain }
    ]
  },
  {
    id: 4,
    title: "Kedarnath Yatra",
    location: "Uttarakhand",
    duration: "5 Days",
    price: "₹18,000",
    originalPrice: "₹25,000",
    image: uttarakhandImage,
    description: "Sacred pilgrimage to one of the twelve Jyotirlingas in the Himalayas.",
    highlights: ["Helicopter Option", "Sacred Temple", "Mountain Trek"],
    groupSize: "10-20 People",
    itinerary: [
      { day: 1, title: "Arrival in Haridwar", description: "Railway station pickup, hotel check-in", icon: Home },
      { day: 2, title: "Haridwar to Guptkashi", description: "Drive through scenic mountains", icon: Mountain },
      { day: 3, title: "Kedarnath Temple Visit", description: "Helicopter/trek to sacred temple", icon: Sunrise },
      { day: 4, title: "Return to Guptkashi", description: "Spiritual reflection, rest day", icon: Heart },
      { day: 5, title: "Return to Haridwar", description: "Departure transfers", icon: Home }
    ]
  }
];

const PackagesCarousel = ({ onQueryClick }: { onQueryClick: (packageData: any) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % packages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + packages.length) % packages.length);
  };

  const getVisiblePackages = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(packages[(currentIndex + i) % packages.length]);
    }
    return visible;
  };

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-snow-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold heading-adventure mb-6">
            Adventure Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Carefully crafted journeys that blend adventure, culture, and spirituality 
            in the heart of the Himalayas
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 btn-adventure p-3 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 btn-adventure p-3 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12">
            {getVisiblePackages().map((pkg, index) => (
              <Card key={`${pkg.id}-${index}`} className="group overflow-hidden shadow-soft hover:shadow-adventure transition-all duration-500 transform hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.location}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-brand-blue" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-brand-orange" />
                      {pkg.groupSize}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-earth-brown" />
                      {pkg.highlights.join(" • ")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-brand-orange">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">{pkg.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <Button 
                      onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                      variant="outline"
                      className="flex-1 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    >
                      {selectedPackage === pkg.id ? 'Hide' : 'View'} Itinerary
                    </Button>
                    <Button 
                      onClick={() => onQueryClick(pkg)}
                      className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Query
                    </Button>
                  </div>

                  {/* Detailed Itinerary */}
                  {selectedPackage === pkg.id && (
                    <div className="mt-4 p-4 bg-snow-gray rounded-lg">
                      <h4 className="font-bold text-brand-orange mb-3">Day-by-Day Itinerary</h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {pkg.itinerary.map((day, dayIndex) => {
                          const IconComponent = day.icon;
                          return (
                            <div key={dayIndex} className="flex items-start space-x-3 p-2 bg-white rounded border-l-4 border-brand-orange">
                              <div className="flex-shrink-0">
                                <IconComponent className="h-5 w-5 text-brand-blue mt-1" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded">
                                    Day {day.day}
                                  </span>
                                  <h5 className="font-semibold text-sm">{day.title}</h5>
                                </div>
                                <p className="text-xs text-muted-foreground">{day.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {packages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-brand-orange scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesCarousel;