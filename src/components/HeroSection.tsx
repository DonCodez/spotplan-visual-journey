
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Users, Plus, Minus } from "lucide-react";
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Form state for backend connection
  const [searchData, setSearchData] = useState({
    destination: "",
    startDate: null as Date | null,
    travelers: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);

  // Handle form submission - ready for backend integration
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search data for backend:", {
      destination: searchData.destination,
      startDate: searchData.startDate?.toISOString(),
      totalTravelers: searchData.travelers.adults + searchData.travelers.children + searchData.travelers.infants,
      travelerBreakdown: searchData.travelers
    });
    // TODO: Connect to backend API endpoint for trip planning
  };

  const updateTravelerCount = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    setSearchData(prev => ({
      ...prev,
      travelers: {
        ...prev.travelers,
        [type]: Math.max(0, prev.travelers[type] + (increment ? 1 : -1))
      }
    }));
  };

  const getTotalTravelers = () => {
    return searchData.travelers.adults + searchData.travelers.children + searchData.travelers.infants;
  };

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
        <div className="max-w-4xl mx-auto text-center mb-56">
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

        {/* Trip Search Form - Backend Ready */}
        <div className="relative z-20 -mt-40">
          <div className="max-w-5xl mx-auto">
            <Card className="p-6 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination Input */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <Input 
                    placeholder="🇧🇭 Bahrain"
                    value={searchData.destination}
                    onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
                    className="pl-12 h-12 bg-white border-gray-200 focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Date Picker with Calendar Popup */}
                <div className="relative">
                  <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 pl-12 justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-600 transition-colors",
                          !searchData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                        {searchData.startDate ? format(searchData.startDate, "🗓️ MMM dd") : "🗓️ Jun 16"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={searchData.startDate}
                        onSelect={(date) => {
                          setSearchData(prev => ({ ...prev, startDate: date }));
                          setIsDateOpen(false);
                        }}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Travelers Selector with Popup */}
                <div className="relative">
                  <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 pl-12 justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-600 transition-colors"
                      >
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                        👤 {getTotalTravelers()} traveler{getTotalTravelers() !== 1 ? 's' : ''}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="start">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Adult</div>
                            <div className="text-sm text-gray-500">(Age 13-99)</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateTravelerCount('adults', false)}
                              disabled={searchData.travelers.adults <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{searchData.travelers.adults}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateTravelerCount('adults', true)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Children</div>
                            <div className="text-sm text-gray-500">(Age 3-12)</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateTravelerCount('children', false)}
                              disabled={searchData.travelers.children <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{searchData.travelers.children}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateTravelerCount('children', true)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Infant</div>
                            <div className="text-sm text-gray-500">(Age 2 and younger)</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateTravelerCount('infants', false)}
                              disabled={searchData.travelers.infants <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{searchData.travelers.infants}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateTravelerCount('infants', true)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <Button
                          type="button"
                          className="w-full text-purple-600 hover:text-purple-700"
                          variant="ghost"
                          onClick={() => setIsTravelersOpen(false)}
                        >
                          + Invite people
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Submit Button */}
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
