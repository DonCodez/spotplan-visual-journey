
import { MapPin, Calendar, DollarSign, Share2 } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { WorldMap } from "@/components/ui/world-map";
import landingData from "@/data/landing-page.json";

const iconMap = {
  "map-pin": MapPin,
  calendar: Calendar,
  "dollar-sign": DollarSign,
  "share-2": Share2,
};

const HowItWorksSection = () => {
  const timelineData = landingData.howItWorks.map((step, index) => {
    const IconComponent = iconMap[step.icon as keyof typeof iconMap];
    
    // Create unique content for each step
    let stepContent;
    
    if (index === 0) {
      // Step 1: Interactive map
      stepContent = (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30">
            <WorldMap
              dots={[
                {
                  start: { lat: 40.7128, lng: -74.0060 }, // New York
                  end: { lat: 48.8566, lng: 2.3522 }, // Paris
                },
                {
                  start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                  end: { lat: -33.8688, lng: 151.2093 }, // Sydney
                },
              ]}
              lineColor="#e5a852"
            />
          </div>
        </div>
      );
    } else if (index === 1) {
      // Step 2: Calendar/schedule view
      stepContent = (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                    i === 3 || i === 4 || i === 10
                      ? 'bg-spot-primary text-white font-semibold'
                      : i === 6 || i === 7
                      ? 'bg-spot-secondary/30 text-spot-secondary font-medium'
                      : 'bg-white text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (index === 2) {
      // Step 3: Budget breakdown
      stepContent = (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium">Flights</span>
                <span className="text-spot-primary font-bold">$750</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium">Hotels</span>
                <span className="text-spot-primary font-bold">$450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium">Activities</span>
                <span className="text-spot-primary font-bold">$300</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-spot-primary/10 rounded-lg border-2 border-spot-primary/20">
                <span className="font-bold text-spot-primary">Total Budget</span>
                <span className="text-spot-primary font-bold text-xl">$1,500</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Step 4: Collaboration/sharing
      stepContent = (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-spot-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  J
                </div>
                <div className="flex-1">
                  <div className="font-medium">John added Eiffel Tower</div>
                  <div className="text-sm text-gray-500">2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-spot-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  S
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sarah updated budget</div>
                  <div className="text-sm text-gray-500">5 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-spot-primary/70 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>
                <div className="flex-1">
                  <div className="font-medium">Mike suggested restaurant</div>
                  <div className="text-sm text-gray-500">10 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return {
      title: `Step ${step.step}`,
      content: stepContent,
    };
  });

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20 pb-0">
        <div className="text-center mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-0">
            Coordinate, Calculate, Discover, and Go – All in Four Steps
          </p>
        </div>
      </div>
      
      <Timeline data={timelineData} />
    </section>
  );
};

export default HowItWorksSection;
