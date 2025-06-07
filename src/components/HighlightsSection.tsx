
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calculator, Sparkles } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import landingData from "@/data/landing-page.json";

const iconMap = {
  users: Users,
  calculator: Calculator,
  sparkles: Sparkles,
};

const HighlightsSection = () => {
  return (
    <section id="features-section" className="py-20 bg-gradient-to-b from-[#f5f3ef] to-[#eff5f5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-relaxed max-w-4xl mx-auto">
            With SpotPlan, you can{" "}
            <GradientText className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] bg-clip-text text-transparent">
              Plan with Friends
            </GradientText>{" "}
            in real-time, effortlessly coordinating every detail of your trip. Enjoy a{" "}
            <GradientText className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] bg-clip-text text-transparent">
              Smart Expense Estimator
            </GradientText>{" "}
            that handles budgeting and cost-splitting with precision. Plus, discover activities and dining options with our{" "}
            <GradientText className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] bg-clip-text text-transparent">
              AI-Powered Suggestions
            </GradientText>{" "}
            designed to personalize your travel experience.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {landingData.highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon as keyof typeof iconMap];
            
            return (
              <Card 
                key={highlight.id}
                className="group p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-spot-beige/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
