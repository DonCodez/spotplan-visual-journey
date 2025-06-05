
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Search } from "lucide-react";

const TripSearchSection = () => {
  return (
    <section className="py-12 bg-spot-beige/30" id="trip-search-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Where will you go?
            </h2>
            <p className="text-xl text-gray-600">
              Tell us your dream destination and we'll create the perfect itinerary
            </p>
          </div>

          <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <form id="trip-search-form" className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spot-primary w-5 h-5" />
                <Input 
                  placeholder="Destination"
                  className="pl-12 h-14 bg-white border-gray-200 focus:border-spot-primary transition-colors"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spot-primary w-5 h-5" />
                <Input 
                  type="date"
                  placeholder="Start Date"
                  className="pl-12 h-14 bg-white border-gray-200 focus:border-spot-primary transition-colors"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spot-primary w-5 h-5" />
                <Input 
                  type="date"
                  placeholder="End Date"
                  className="pl-12 h-14 bg-white border-gray-200 focus:border-spot-primary transition-colors"
                />
              </div>

              <Button 
                type="submit"
                className="h-14 bg-spot-primary hover:bg-spot-secondary text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TripSearchSection;
