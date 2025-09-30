import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: "Rahul Kumar",
    location: "Delhi",
    rating: 5,
    text: "Everest Base Camp trek was life-changing. Yatra Holiday made it seamless with excellent guides and perfect planning. The memories will last forever!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    trip: "Everest Base Camp Trek"
  },
  {
    id: 2,
    name: "Ananya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Rishikesh rafting was unforgettable! Great service, safe planning, and the yoga retreat added a spiritual touch to our adventure.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    trip: "Uttarakhand Adventure"
  },
  {
    id: 3,
    name: "Vikash Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Amazing Annapurna Circuit experience! The local insights and cultural immersion made this trip extraordinary. Highly recommended!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    trip: "Annapurna Circuit"
  },
  {
    id: 4,
    name: "Priya Reddy",
    location: "Bangalore",
    rating: 5,
    text: "Kedarnath Yatra was a deeply spiritual journey. The helicopter option saved time and the overall organization was perfect.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    trip: "Kedarnath Yatra"
  },
  {
    id: 5,
    name: "Arjun Singh",
    location: "Jaipur",
    rating: 5,
    text: "Best adventure travel company! Professional guides, safety first approach, and incredible memories. Will definitely book again!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    trip: "Nepal Adventure"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-snow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-16">
  <h2 className="text-4xl md:text-6xl font-playfair italic heading-adventure mb-6">
    Traveler Stories
  </h2>
  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
    Real experiences from adventurers who trusted us with their journeys
  </p>
</div>


        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 btn-adventure p-3 rounded-full -ml-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 btn-adventure p-3 rounded-full -mr-6"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Main Testimonial */}
          <Card className="glass-effect border-white/40 shadow-elevation">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-8">
                <Quote className="h-12 w-12 text-sky-blue mx-auto mb-6 opacity-50" />
                <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-800 mb-8">
                  "{currentTestimonial.text}"
                </blockquote>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-soft"
                />
                <div className="text-left">
                  <h4 className="text-xl font-bold text-mountain-green">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-muted-foreground">
                    {currentTestimonial.location}
                  </p>
                  <p className="text-sm text-sky-blue font-medium">
                    {currentTestimonial.trip}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center space-x-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-sky-blue scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;