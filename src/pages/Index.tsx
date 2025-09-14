import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
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

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
      {/* <OccasionBanner /> */}
      <PackagesCarousel onQueryClick={handleQueryClick} />
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
