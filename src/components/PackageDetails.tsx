// PackageDetails.tsx

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ArrowLeft, MapPin, Clock, Star, Phone, Mail, MessageCircle,
  Users, Hotel, Utensils, Camera, Activity, CheckCircle, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Package {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  duration: string;
  image: string;
  rating?: number;
}

// This is dummy/static itinerary. If you want per-package itinerary, put it in your JSON or an API.
interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

const PackageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  // You can later replace with dynamic per-package itineraries
  const itinerary: ItineraryDay[] = [
    {
      day: 1,
      title: "Arrival & City Tour",
      activities: ["Airport pickup", "Check‑in to hotel", "City walk", "Welcome dinner"],
      meals: ["Lunch", "Dinner"],
      accommodation: "5-Star Hotel"
    },
    {
      day: 2,
      title: "Adventure & Local Culture",
      activities: ["Morning trek", "River rafting", "Market visit", "Cultural show"],
      meals: ["Breakfast", "Lunch", "Dinner"],
      accommodation: "5-Star Hotel"
    },
    {
      day: 3,
      title: "Sightseeing & Departure",
      activities: ["Temple visit", "Shopping time", "Airport drop"],
      meals: ["Breakfast", "Lunch"],
      accommodation: "Check-out"
    }
  ];

  const inclusions = [
    "Accommodation in 5-star hotels",
    "All meals as per itinerary",
    "AC vehicle for all transfers",
    "Professional tour guide",
    "All entrance fees",
    "Travel insurance",
    "24/7 customer support"
  ];

  const exclusions = [
    "Personal expenses",
    "Additional activities not mentioned",
    "Tips and gratuities",
    "Airfare (unless specified)",
    "Visa fees"
  ];

  useEffect(() => {
    fetch('/packages.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Package[]) => {
        const pkg = data.find((p) => p.id.toString() === id);
        if (pkg) {
          setPackageData(pkg);
        } else {
          console.warn("Package not found for id:", id);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange" />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Package not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <Button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {packageData.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {packageData.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {packageData.duration}
              </span>
              {packageData.rating && (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  {packageData.rating}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left / main columns */}
          <div className="lg:col-span-2">
            <Card className="mb-6 backdrop-blur-md bg-white/90 border-white/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed">{packageData.description}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary">
                <div className="space-y-4">
                  {itinerary.map((day) => (
                    <Card key={day.day} className="backdrop-blur-md bg-white/90 border-white/50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold">
                              {day.day}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-3">{day.title}</h3>

                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                  <Activity className="h-4 w-4" />
                                  Activities
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                  {day.activities.map((act, idx) => (
                                    <li key={idx}>{act}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex gap-6">
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <Utensils className="h-4 w-4" />
                                    Meals
                                  </p>
                                  <div className="flex gap-2">
                                    {day.meals.map((meal, idx) => (
                                      <Badge key={idx} variant="secondary">
                                        {meal}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <Hotel className="h-4 w-4" />
                                    Stay
                                  </p>
                                  <Badge variant="outline">{day.accommodation}</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="inclusions">
                <Card className="backdrop-blur-md bg-white/90 border-white/50">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-5 w-5" />
                          What's Included
                        </h3>
                        <ul className="space-y-2">
                          {inclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-700">
                          <XCircle className="h-5 w-5" />
                          What's Not Included
                        </h3>
                        <ul className="space-y-2">
                          {exclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="highlights">
                <Card className="backdrop-blur-md bg-white/90 border-white/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Package Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { icon: Camera, text: "Scenic photo opportunities" },
                        { icon: Activity, text: "Adventure activities included" },
                        { icon: Hotel, text: "Premium accommodation" },
                        { icon: Utensils, text: "Authentic local cuisine" },
                        { icon: Users, text: "Small group experience" },
                        { icon: MapPin, text: "Hidden gems exploration" }
                      ].map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
                          <highlight.icon className="h-5 w-5 text-brand-orange" />
                          <span className="text-gray-700">{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 backdrop-blur-md bg-white/90 border-white/50">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-brand-orange">{packageData.price}</p>
                  <p className="text-sm text-gray-600">per person</p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Enquiry
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Need Help?</h4>
                  <div className="space-y-2">
                    <a href="tel:+919999999999" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-orange">
                      <Phone className="h-4 w-4" />
                      +91 99999 99999
                    </a>
                    <a href="mailto:support@travel.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-orange">
                      <Mail className="h-4 w-4" />
                      support@travel.com
                    </a>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">
                    ✓ Instant Confirmation
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center">
                    ✓ Best Price Guarantee
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center">
                    ✓ 24/7 Support
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
