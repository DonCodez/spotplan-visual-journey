
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [elementTop, setElementTop] = useState(0);
  
  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      const onResize = () => {
        setElementTop(element.offsetTop + element.offsetHeight);
      };
      
      onResize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

  // Scale the laptop mockup as user scrolls
  const laptopScale = useTransform(
    scrollY,
    [0, elementTop * 0.5],
    [1, 1.2]
  );

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="relative min-h-screen bg-[#f5f3ef] overflow-hidden"
      >
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 animate-fade-in">
              Plan Your Perfect Trip
              <span className="block text-sky-500">with AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Smart itineraries, expense tracking, and group planning made simple
            </p>

            {/* Trip Search Section moved here */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-2">
                  Where will you go?
                </h2>
                <p className="text-lg text-slate-500">
                  Tell us your dream destination and we'll create the perfect itinerary
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-0">
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <input 
                      placeholder="Destination"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <input 
                      type="date"
                      placeholder="Date"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="h-12 bg-sky-400 hover:bg-sky-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Plan your trip
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Mockup with scaling effect */}
        <div className="relative z-10 flex justify-center px-4 pb-8">
          <motion.div 
            style={{ scale: laptopScale }}
            className="relative max-w-4xl w-full"
          >
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3ef] via-transparent to-transparent z-10 pointer-events-none" />
            <img 
              src="/public/images/landingpage/herosectionmockup.png"
              alt="Travel planning app mockup"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
