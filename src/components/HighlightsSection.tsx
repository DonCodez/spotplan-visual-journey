
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
    <section id="features-section" className="py-20 bg-gradient-to-b from-[#f5f3ef] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6 leading-tight sm:leading-snug max-w-6xl mx-auto">
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
      </div>
    </section>
  );
};

export default HighlightsSection;
