import { MapPin, Calendar, DollarSign, Share2 } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
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
    
    return {
      title: `Step ${step.step}`,
      content: (
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
          
          {/* Visual representation for each step */}
          <div className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <img 
                  src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=400&h=300" 
                  alt="Travel destination map"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="space-y-2">
                  <div className="h-3 bg-spot-beige/40 rounded w-3/4"></div>
                  <div className="h-3 bg-spot-beige/30 rounded w-1/2"></div>
                  <div className="h-3 bg-spot-beige/20 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
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
