import { Link } from 'react-router-dom';
import { Compass, Heart, Users, Award, MapPin, Plane, Globe2, Camera, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Travelers' },
    { icon: MapPin, value: '100+', label: 'Destinations' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Plane, value: '10K+', label: 'Tours Completed' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We live and breathe travel, bringing authentic experiences to every journey.',
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description: 'Our experienced team ensures every trip is perfectly curated and memorable.',
    },
    {
      icon: Globe2,
      title: 'Global Network',
      description: 'Partnerships worldwide guarantee seamless experiences wherever you go.',
    },
    {
      icon: Camera,
      title: 'Unforgettable Memories',
      description: 'We craft journeys that create stories worth sharing for a lifetime.',
    },
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      quote: 'Travel is the only thing you buy that makes you richer.',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      quote: 'Creating seamless journeys is our art.',
    },
    {
      name: 'Amit Patel',
      role: 'Travel Curator',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      quote: 'Every destination has a story to tell.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Compass className="w-4 h-4" />
            <span className="text-sm font-medium">About Our Journey</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Wanderlust Meets Expertise
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            Crafting extraordinary journeys across the globe since 2009
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="backdrop-blur-xl bg-card/80 border-border/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-brand-orange" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="animate-fade-in">
              What started as a dream in 2009 has transformed into a thriving travel community. 
              Our founder, Shailendra, embarked on a solo backpacking trip across Southeast Asia 
              that changed his life forever. Witnessing the transformative power of travel, he 
              envisioned a company that would make extraordinary journeys accessible to everyone.
            </p>
            <p className="animate-fade-in animation-delay-200">
              Today, we've helped over 50,000 travelers explore more than 100 destinations worldwide. 
              From the snow-capped peaks of the Himalayas to the pristine beaches of the Maldives, 
              from cultural expeditions through ancient temples to thrilling desert safaris—we curate 
              experiences that resonate with your soul.
            </p>
            <p className="animate-fade-in animation-delay-400">
              Our team of passionate travel experts doesn't just plan trips; we craft stories. 
              Every itinerary is thoughtfully designed, every accommodation carefully selected, 
              and every moment meticulously planned to ensure your journey exceeds expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our values are the compass guiding every journey we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                    <value.icon className="w-8 h-8 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Explorers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate team behind your unforgettable adventures
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <Card 
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-white/80 mb-3">{member.role}</p>
                  <p className="text-sm italic text-white/70">"{member.quote}"</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's turn your travel dreams into unforgettable memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <Link to="/packages">Explore Packages</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-xl px-8 py-6 text-lg"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
