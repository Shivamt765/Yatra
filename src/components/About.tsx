import { Link } from 'react-router-dom';
import {
  Compass,
  Heart,
  Users,
  Award,
  MapPin,
  Plane,
  Globe2,
  Camera,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import founderImage from '/assets/keshav-prasad-gupta-founder.jpeg';
const AboutUs = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Travelers' },
    { icon: MapPin, value: '100+', label: 'Destinations Covered' },
    { icon: Award, value: '15+', label: 'Years of Travel Expertise' },
    { icon: Plane, value: '10K+', label: 'Tours Successfully Completed' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Spiritual & Cultural Travel',
      description:
        'Deep expertise in Nepal pilgrimage tours, Pashupatinath Temple darshan and Ayodhya Ram Mandir journeys.',
    },
    {
      icon: Compass,
      title: 'Expert Tour Planning',
      description:
        'From Kathmandu and Pokhara sightseeing to Rajasthan heritage tours, every trip is carefully planned.',
    },
    {
      icon: Globe2,
      title: 'Domestic & International Tours',
      description:
        'We organize Rajasthan, Udaipur, Jaipur tours along with Thailand holiday packages from India.',
    },
    {
      icon: Camera,
      title: 'Memories for a Lifetime',
      description:
        'Our Nepal trips and family tour packages are designed to create meaningful experiences.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">

      {/* SEO HELMET */}
      <Helmet>
        <title>
          About Pashupatinath Holidays | Nepal, Kathmandu, Pokhara, Rajasthan & Ayodhya Tours
        </title>
        <meta
          name="description"
          content="Pashupatinath Holidays is a trusted travel company offering Nepal tour packages including Kathmandu and Pokhara sightseeing, Pashupatinath Temple darshan, Ayodhya Ram Mandir tours, Rajasthan heritage trips and Thailand holiday packages."
        />
        <meta
          name="keywords"
          content="Nepal tour package, Kathmandu tour, Pokhara sightseeing, Pashupatinath temple darshan, Nepal pilgrimage tour, Ayodhya Ram Mandir darshan, Rajasthan tour package, Udaipur Jaipur tour, Thailand tour package"
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
            Nepal, Kathmandu, Pokhara, Rajasthan & Ayodhya Tour Experts
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Pashupatinath Holidays – Trusted travel experts for Nepal trips,
            pilgrimage tours, Rajasthan heritage journeys and international holidays
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-brand-orange" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h2 className="font-playfair text-4xl font-bold mb-6 text-center">
          Our Journey
        </h2>

        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            Pashupatinath Holidays began with a vision to offer meaningful and
            spiritually enriching travel experiences. We started with Nepal tour
            packages focusing on Kathmandu sightseeing, Pokhara tours and
            Pashupatinath Temple darshan.
          </p>

          <p>
            Over the years, we have expanded into organizing Nepal pilgrimage tours,
            Kailash Mansarovar Yatra, and family-friendly Nepal trips from India.
            Our Nepal packages include Kathmandu, Pokhara, Nagarkot and cultural
            experiences.
          </p>

          <p>
            Beyond Nepal, we curate Rajasthan heritage tours covering Udaipur,
            Jaipur and Jodhpur, along with Ayodhya Ram Mandir darshan and North
            India spiritual tours. We also offer international holiday packages
            such as Thailand tour packages from India.
          </p>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="container mx-auto px-4 py-20 max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        <img
  src={founderImage}
  alt="Keshav Prasad Gupta Founder of Pashupatinath Holidays Nepal and Rajasthan Tour Company"
  className="w-72 h-72 object-cover rounded-2xl shadow-xl mx-auto"
/>

        <div>
          <h2 className="font-playfair text-4xl font-bold mb-4">
            Message from Our Founder
          </h2>

          <h3 className="text-xl font-semibold text-brand-orange">
            Keshav Prasad Gupta
          </h3>

          <p className="text-muted-foreground mb-4">
            Founder & Managing Director, Pashupatinath Holidays
          </p>

          <p className="text-lg text-muted-foreground">
            “My vision is to make Nepal tours, Kathmandu and Pokhara sightseeing,
            Ayodhya darshan and Rajasthan heritage trips accessible, comfortable
            and trustworthy for every traveler.”
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Plan Your Next Journey with Pashupatinath Holidays
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore Nepal, Kathmandu, Pokhara, Ayodhya, Rajasthan and international
            tour packages with trusted experts.
          </p>

          <Button asChild size="lg" className="bg-brand-orange text-white">
            <Link to="/packages">Explore Tour Packages</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;