
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DemoPreviewSection from "@/components/DemoPreviewSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HighlightsSection />
      <HowItWorksSection />
      <DemoPreviewSection />
      <Footer />
    </div>
  );
};

export default Index;
