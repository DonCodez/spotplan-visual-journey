
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TripSearchForm from "./TripSearchForm";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f5f3ef] overflow-hidden pt-0 pb-9"
    >
      {/* Navigation Header */}
      <div className="relative z-20 w-full py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-900">TRAVELPAL</span>
          </div>
          
          {/* Login Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-blue-900 hover:bg-blue-50 font-medium"
            >
              Log in
            </Button>
            <Button 
              className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-full"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>

      {/* Background World Map */}
      <div className="absolute inset-0 opacity-40">
        <WorldMap
          dots={[
            {
              start: { lat: 40.7128, lng: -74.006 },
              end: { lat: 51.5074, lng: -0.1278 },
            },
            {
              start: { lat: 35.6762, lng: 139.6503 },
              end: { lat: -33.8688, lng: 151.2093 },
            },
            {
              start: { lat: 48.8566, lng: 2.3522 },
              end: { lat: 55.7558, lng: 37.6176 },
            },
          ]}
          lineColor="#3B82F6"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-56 pt-8">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-4">
            YOUR PERFECT TRIP,
            <br />
            PLANNED IN <span className="text-blue-600">MINUTES.</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-800 mb-10 max-w-2xl mx-auto">
            Navigate like a local, eat like a foodie, and explore like a pro
            with an intelligent itinerary for you and your group.
          </p>
        </div>

        <TripSearchForm />

        {/* Hero Image */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div style={{ scale: laptopScale }}>
            <img
              src="/images/landingpage/herosectionmockup.png"
              alt="Hero section laptop mockup"
              className="w-full h-auto mx-auto"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
