import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users, Plus } from "lucide-react";
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      className="relative bg-[#f5f3ef] overflow-hidden pt-12 pb-9"
    >
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
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-4">
            YOUR PERFECT TRIP,
            <br />
            PLANNED IN <span className="text-blue-600">MINUTES.</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-800 mb-10 max-w-2xl mx-auto">
            Navigate like a local, eat like a foodie, and explore like a pro
            with an intelligent itinerary for you and your group.
          </p>

          {/* Embedded Trip Search Form */}
          <div className="max-w-5xl mx-auto">
            <Card className="p-6 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <form id="hero-trip-search-form" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <Input 
                    placeholder="\ud83c\udde7\ud83c\udded Bahrain"
                    className="pl-12 h-12 bg-white border-gray-200 focus:border-blue-600 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <Input 
                    placeholder="\ud83d\uddd5\ufe0f Jun 16"
                    className="pl-12 h-12 bg-white border-gray-200 focus:border-blue-600 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <Input 
                    placeholder="\ud83d\udc64 1 traveler"
                    className="pl-12 h-12 bg-white border-gray-200 focus:border-blue-600 transition-colors"
                  />
                </div>

                <Button 
                  type="submit"
                  className="h-12 bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Plan your trip
                </Button>
              </form>
            </Card>
          </div>
        </div>

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
