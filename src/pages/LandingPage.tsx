
import HeroSection from "@/components/landingpage/HeroSection";
import HighlightsSection from "@/components/landingpage/HighlightsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DemoPreviewSection from "@/components/landingpage/DemoPreviewSection";
import Footer from "@/components/landingpage/Footer";

const LandingPage = () => {
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

export default LandingPage;
