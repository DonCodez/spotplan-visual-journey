import { MapPin, Calendar, DollarSign, Share2 } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import LocationCard from "@/components/LocationCard";
import landingData from "@/data/landing-page.json";
import { cn } from "@/lib/utils";
import { useState } from "react";

const iconMap = {
  "map-pin": MapPin,
  calendar: Calendar,
  "dollar-sign": DollarSign,
  "share-2": Share2,
};

const HowItWorksSection = () => {
  const [selectedRange, setSelectedRange] = useState({ start: 7, end: 12 });
  
  const handleDateClick = (dayNumber: number) => {
    if (dayNumber === selectedRange.start) {
      // If clicking start date, extend range by 3 days
      setSelectedRange({ start: dayNumber, end: Math.min(dayNumber + 5, 21) });
    } else if (dayNumber === selectedRange.end) {
      // If clicking end date, shrink range by 2 days
      setSelectedRange({ start: selectedRange.start, end: Math.max(dayNumber - 2, selectedRange.start + 2) });
    } else if (dayNumber > selectedRange.start && dayNumber < selectedRange.end) {
      // If clicking in middle, make it a 3-day trip around that date
      setSelectedRange({ start: Math.max(dayNumber - 1, 1), end: Math.min(dayNumber + 2, 21) });
    } else {
      // If clicking outside range, create new 5-day range
      setSelectedRange({ start: dayNumber, end: Math.min(dayNumber + 5, 21) });
    }
  };

  const timelineData = landingData.howItWorks.map((step, index) => {
    const IconComponent = iconMap[step.icon as keyof typeof iconMap];
    
    // Create unique content for each step
    let stepContent;
    
    if (index === 0) {
      // Step 1: Destination selection with new location cards
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
              <LocationCard
                title="Tropical Islands"
                subtitle="Maldives, Bali, Hawaii"
                description="Experience pristine beaches, crystal-clear waters, and luxury resorts in paradise destinations."
                imageSrc="/images/landingpage/bali.jpg"
                emoji="🏝️"
              />
              <LocationCard
                title="Mountain Adventures"
                subtitle="Alps, Himalayas, Rockies"
                description="Discover breathtaking peaks, alpine villages, and world-class skiing and hiking trails."
                imageSrc="/images/landingpage/alps.jpg"
                emoji="🏔️"
              />
              <LocationCard
                title="Historic Cities"
                subtitle="Rome, Paris, Tokyo"
                description="Immerse yourself in rich culture, ancient architecture, and vibrant city life."
                imageSrc="/images/landingpage/rome.jpg"
                emoji="🏛️"
              />
            </div>
          </div>
        </div>
      );
    } else if (index === 1) {
      // Step 2: Interactive calendar/schedule view
      const tripDuration = selectedRange.end - selectedRange.start + 1;
      
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
                let cellClass = 'aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all duration-200 ';
                
                if (dayNumber === selectedRange.start || dayNumber === selectedRange.end) {
                  // Start and end dates - dark colored
                  cellClass += 'bg-spot-primary text-white font-bold hover:bg-spot-primary/80 shadow-md';
                } else if (dayNumber > selectedRange.start && dayNumber < selectedRange.end) {
                  // Dates in between - light colored
                  cellClass += 'bg-spot-primary/30 text-spot-primary font-semibold hover:bg-spot-primary/50';
                } else {
                  // Other dates
                  cellClass += 'bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:shadow-sm';
                }
                
                return (
                  <div 
                    key={i} 
                    className={cellClass}
                    onClick={() => handleDateClick(dayNumber)}
                  >
                    {dayNumber}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Trip Duration: {tripDuration} Days ({selectedRange.start}{selectedRange.start === 1 ? 'st' : selectedRange.start === 2 ? 'nd' : selectedRange.start === 3 ? 'rd' : 'th'} - {selectedRange.end}{selectedRange.end === 1 ? 'st' : selectedRange.end === 2 ? 'nd' : selectedRange.end === 3 ? 'rd' : 'th'})
              </p>
              <p className="text-xs text-gray-500 mt-1">Click on dates to adjust your trip duration</p>
            </div>
          </div>
        </div>
      );
    } else if (index === 2) {
      // Step 3: Budget breakdown with interactive elements
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
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <span className="font-medium">Flights</span>
                <span className="text-spot-primary font-bold">$750</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-green-50 transition-all duration-200 cursor-pointer">
                <span className="font-medium">Hotels</span>
                <span className="text-spot-primary font-bold">$450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                <span className="font-medium">Activities</span>
                <span className="text-spot-primary font-bold">$300</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-spot-primary/10 rounded-lg border-2 border-spot-primary/20 hover:bg-spot-primary/20 transition-all duration-200">
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
              <HoverCard openDelay={200}>
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

              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-spot-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Sarah updated budget</div>
                      <div className="text-sm text-gray-500">5 minutes ago</div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Sarah's Update</h4>
                    <p className="text-xs text-muted-foreground">
                      Sarah adjusted the budget by finding a better hotel deal and adding a Seine river cruise. She saved $150 on accommodation and allocated it to a romantic dinner experience.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard openDelay={200}>
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Rectangle container with animated grid pattern */}
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          {/* Animated Grid Pattern Background */}
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-0 h-full opacity-30",
            )}
          />
          
          {/* Content */}
          <div className="relative z-10 px-8 py-16">
            <div className="text-center mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-0">
                Coordinate, Calculate, Discover, and Go – All in Four Steps
              </p>
            </div>
            
            <div className="-mt-16">
              <Timeline data={timelineData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
