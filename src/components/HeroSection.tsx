
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import TripSearchForm from "./TripSearchForm";

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
      className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 overflow-hidden pt-0 pb-9"
    >
      {/* Background World Map */}
      <div className="absolute inset-0 opacity-20">
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

      {/* Navigation Header */}
      <div className="relative z-10 w-full px-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              TRAVELPAL
            </h1>
          </div>

          {/* Login Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 font-medium"
            >
              Log in
            </Button>
            <Button 
              className="bg-white text-purple-700 hover:bg-gray-100 font-medium px-6 py-2 rounded-full"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-56 mt-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            YOUR PERFECT TRIP,
            <br />
            PLANNED IN <span className="text-lime-400">MINUTES.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
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
