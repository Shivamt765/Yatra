import { useState, useEffect } from "react";
import LoadingScreen from "@/components/PackageLoader";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PromotionalBanner from "@/components/PromotionalBanner";
import PackagesCarousel from "@/components/PackagesCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import QueryModal from "@/components/QueryModal";
import BookingNotifications from "@/components/BookingNotifications";
import ReelsSection from "@/components/ReelsSection";
import MomentsSection from "@/components/MomentsSection";
import WhyChoose from "@/components/WhyChoose";
import HomeBlogCarousel from "@/components/HomeBlogCarousel";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasVisited = localStorage.getItem("loaderShown");
    if (!hasVisited) {
      setIsLoading(true);
      localStorage.setItem("loaderShown", "true");
    }
  }, []);

  const handleQueryClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsQueryModalOpen(true);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LeadForm isPopup={true} />

      <Navigation />
      <HeroSection />
      <PromotionalBanner />
      <MomentsSection />

      <PackagesCarousel onQueryClick={handleQueryClick} />

      <WhyChoose />
      <ReelsSection />
      <HomeBlogCarousel />
      <TestimonialsSection />
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
