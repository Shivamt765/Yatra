import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/PackageLoader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PromotionalBanner from '@/components/PromotionalBanner';
import PackagesCarousel from '@/components/PackagesCarousel';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import QueryModal from '@/components/QueryModal';
import BookingNotifications from '@/components/BookingNotifications';
import ReelsSection from '@/components/ReelsSection';
import OccasionBanner from '@/components/OccasionBanner';
import FloatingContact from '@/components/FloatingContact';
import MomentsSection from '@/components/MomentsSection';
import WhyChoose from '@/components/WhyChoose';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false); // default false
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    // Check if loader was shown before
    const hasVisited = localStorage.getItem('loaderShown');
    if (!hasVisited) {
      setIsLoading(true); // show loader
      localStorage.setItem('loaderShown', 'true'); // mark as shown
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleQueryClick = (packageData: any) => {
    setSelectedPackage(packageData);
    setIsQueryModalOpen(true);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PromotionalBanner />
      <MomentsSection />
      {/* <OccasionBanner /> */}
      <PackagesCarousel onQueryClick={handleQueryClick} />
      <WhyChoose />
      <ReelsSection />
      <TestimonialsSection />
      <Footer />

      <QueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        packageData={selectedPackage}
      />

      <BookingNotifications />
      <FloatingContact />
    </div>
  );
};

export default Index;
