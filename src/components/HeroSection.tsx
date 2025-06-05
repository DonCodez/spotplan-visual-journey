
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#f5f3ef] overflow-hidden">
      {/* Background World Map */}
      <div className="absolute inset-0 opacity-40">
        <WorldMap
          dots={[
            {
              start: { lat: 40.7128, lng: -74.0060 }, // New York
              end: { lat: 51.5074, lng: -0.1278 }, // London
            },
            {
              start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
              end: { lat: -33.8688, lng: 151.2093 }, // Sydney
            },
            {
              start: { lat: 48.8566, lng: 2.3522 }, // Paris
              end: { lat: 55.7558, lng: 37.6176 }, // Moscow
            },
          ]}
          lineColor="#3B82F6"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-6">
            YOUR PERFECT TRIP,
            <br />
            PLANNED IN <span className="text-blue-600">MINUTES.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-800 mb-8 max-w-2xl mx-auto">
            Navigate like a local, eat like a foodie, and explore like a pro with an intelligent itinerary for you and your group.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
