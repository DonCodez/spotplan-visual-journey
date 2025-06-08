
import { MapPin, Calendar, DollarSign, Share2 } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
      // Step 1: Destination selection
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-spot-primary/20">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🏝️</span>
                </div>
                <h4 className="font-semibold text-gray-800">Tropical Islands</h4>
                <p className="text-sm text-gray-600">Maldives, Bali, Hawaii</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🏔️</span>
                </div>
                <h4 className="font-semibold text-gray-800">Mountain Adventures</h4>
                <p className="text-sm text-gray-600">Alps, Himalayas, Rockies</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h4 className="font-semibold text-gray-800">Historic Cities</h4>
                <p className="text-sm text-gray-600">Rome, Paris, Tokyo</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (index === 1) {
      // Step 2: Calendar/schedule view with specific date range
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
              {Array.from({ length: 21 }, (_, i) => {
                const dayNumber = i + 1;
                let cellClass = 'aspect-square rounded-lg flex items-center justify-center text-sm ';
                
                if (dayNumber === 7 || dayNumber === 12) {
                  // Start and end dates - dark colored
                  cellClass += 'bg-spot-primary text-white font-bold';
                } else if (dayNumber > 7 && dayNumber < 12) {
                  // Dates in between - light colored
                  cellClass += 'bg-spot-primary/30 text-spot-primary font-semibold';
                } else {
                  // Other dates
                  cellClass += 'bg-white text-gray-400';
                }
                
                return (
                  <div key={i} className={cellClass}>
                    {dayNumber}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Trip Duration: 6 Days (7th - 12th)</p>
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
      // Step 4: Collaboration/sharing with hover cards
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
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      J
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">John added Eiffel Tower</div>
                      <div className="text-sm text-gray-500">2 minutes ago</div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">John's Activity</h4>
                    <p className="text-xs text-muted-foreground">
                      John added the Eiffel Tower to the itinerary for Day 3. He also included viewing times and nearby restaurant recommendations for a complete Paris experience.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-spot-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  S
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sarah updated budget</div>
                  <div className="text-sm text-gray-500">5 minutes ago</div>
                </div>
              </div>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Mike suggested restaurant</div>
                      <div className="text-sm text-gray-500">10 minutes ago</div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Mike's Suggestion</h4>
                    <p className="text-xs text-muted-foreground">
                      Mike recommended "Le Comptoir du Relais" - a highly-rated bistro in Saint-Germain. He included menu highlights, price range, and notes about making reservations in advance.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
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
