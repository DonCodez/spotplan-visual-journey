
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane } from "lucide-react";
import { WorldMap } from "@/components/ui/world-map";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#f5f3ef' }}>
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-30">
        <WorldMap
          dots={[
            {
              start: { lat: 40.7128, lng: -74.0060 }, // New York
              end: { lat: 51.5074, lng: -0.1278 }, // London
            },
            {
              start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
              end: { lat: 1.3521, lng: 103.8198 }, // Singapore
            },
            {
              start: { lat: 48.8566, lng: 2.3522 }, // Paris
              end: { lat: 41.9028, lng: 12.4964 }, // Rome
            },
            {
              start: { lat: -33.8688, lng: 151.2093 }, // Sydney
              end: { lat: 37.7749, lng: -122.4194 }, // San Francisco
            },
          ]}
          lineColor="#24BAEC"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <div className="text-left lg:pr-8">
            {/* Floating plane icon */}
            <div className="mb-8 flex justify-start">
              <div className="relative">
                <Plane className="w-16 h-16 text-spot-blue animate-float" />
                <div className="absolute -inset-4 bg-spot-blue/10 rounded-full blur-lg"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="text-slate-800">Plan Your Perfect Trip</span>
              <span className="block text-spot-sky">with AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Smart itineraries, expense tracking, and group planning made simple
            </p>

            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="start-planning-button bg-spot-sky hover:bg-spot-blue text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                Start Planning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - Laptop Mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative max-w-lg w-full">
              <img 
                src="/images/landingpage/herosectionmockup.png" 
                alt="SpotPlan App Mockup"
                className="w-full h-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
