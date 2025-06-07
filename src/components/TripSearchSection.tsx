import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users, Plus } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TripSearchSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative bg-[#f5f3ef] -mt-16 pt-4 pb-20">
      {/* Trip Search Form */}
      <div className="container mx-auto px-4 relative z-20 -mt-48">
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-6">
            <form id="trip-search-form" className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                <Input 
                  placeholder="🇧🇭 Bahrain"
                  className="pl-12 h-12 bg-white border-gray-200 focus:border-blue-600 transition-colors"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                <Input 
                  placeholder="🗕️ Jun 16"
                  className="pl-12 h-12 bg-white border-gray-200 focus:border-blue-600 transition-colors"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                <Input 
                  placeholder="👤 1 traveler"
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

      {/* Gradient Overlay for Laptop */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#f5f3ef]/80 z-10"></div>

      {/* Removed Laptop Mockup */}
    </section>
  );
};

export default TripSearchSection;
