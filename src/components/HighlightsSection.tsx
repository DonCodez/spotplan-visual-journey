
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calculator, Sparkles } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { MagicText } from "@/components/ui/magic-text";
import landingData from "@/data/landing-page.json";

const iconMap = {
  users: Users,
  calculator: Calculator,
  sparkles: Sparkles,
};

const HighlightsSection = () => {
  return (
    <section id="features-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="max-w-6xl mx-auto">
            <MagicText
              text="With SpotPlan, you can Plan with Friends in real-time, effortlessly coordinating every detail of your trip. Enjoy a Smart Expense Estimator that handles budgeting and cost-splitting with precision. Plus, discover activities and dining options with our AI-Powered Suggestions designed to personalize your travel experience."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
