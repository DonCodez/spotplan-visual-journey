
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, DollarSign, Share2 } from "lucide-react";
import landingData from "@/data/landing-page.json";

const iconMap = {
  "map-pin": MapPin,
  calendar: Calendar,
  "dollar-sign": DollarSign,
  "share-2": Share2,
};

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to your perfect trip
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {landingData.howItWorks.map((step, index) => {
              const IconComponent = iconMap[step.icon as keyof typeof iconMap];
              
              return (
                <div key={step.step} className="relative">
                  {/* Connection line for desktop */}
                  {index < landingData.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-spot-primary to-spot-secondary transform translate-x-4 z-0"></div>
                  )}
                  
                  <Card className="relative z-10 group p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-spot-beige/10">
                    <CardContent className="p-0 text-center">
                      {/* Step number */}
                      <div className="mb-4 flex justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-spot-beige/50 rounded-full flex items-center justify-center group-hover:bg-spot-beige transition-colors duration-300">
                          <IconComponent className="w-8 h-8 text-spot-primary" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
