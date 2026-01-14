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
import MomentsSection from '@/components/MomentsSection';
import WhyChoose from '@/components/WhyChoose';
import HomeBlogCarousel from '@/components/HomeBlogCarousel';
import LeadForm from "@/components/LeadForm";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // Show loader only on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('loaderShown');
    if (!hasVisited) {
      setIsLoading(true);
      localStorage.setItem('loaderShown', 'true');
    }
  }, []);

  const handleLoadingComplete = () => setIsLoading(false);
  const handleQueryClick = (packageData: any) => {
    setSelectedPackage(packageData);
    setIsQueryModalOpen(true);
  };

  if (isLoading) return <LoadingScreen onComplete={handleLoadingComplete} />;

  return (
    <div className="min-h-screen bg-background overflow-y-auto overflow-x-hidden">

      {/* Popup LeadForm */}
      <LeadForm isPopup={true} />

      <Navigation />
      <HeroSection />
      <PromotionalBanner />
      <MomentsSection />
      <PackagesCarousel onQueryClick={handleQueryClick} />
      <WhyChoose />
      <ReelsSection />
      <HomeBlogCarousel/>
      <TestimonialsSection />

      {/* Inline persistent LeadForm above footer */}
      
      <Footer />

      <QueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        packageData={selectedPackage}
      />

      <BookingNotifications />
    </div>
  );
};

export default Index;