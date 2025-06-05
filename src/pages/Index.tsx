
import HeroSection from "@/components/HeroSection";
import TripSearchSection from "@/components/TripSearchSection";
import HighlightsSection from "@/components/HighlightsSection";
import DemoPreviewSection from "@/components/DemoPreviewSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TripSearchSection />
      <HighlightsSection />
      <DemoPreviewSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
