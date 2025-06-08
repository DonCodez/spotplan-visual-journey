
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calculator, Sparkles } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { BlurText } from "@/components/ui/animated-blur-text";
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
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6 leading-tight sm:leading-snug max-w-6xl mx-auto text-center justify-center">
            <span>With SpotPlan, you can </span>
            <span style={{ color: "#2563eb" }}>
              <BlurText
                text="Plan with Friends"
                delay={150}
                animateBy="words"
                direction="top"
                className="inline"
              />
            </span>
            <span> in real-time, effortlessly coordinating every detail of your trip. Enjoy a </span>
            <span style={{ color: "#2563eb" }}>
              <BlurText
                text="Smart Expense Estimator"
                delay={150}
                animateBy="words"
                direction="top"
                className="inline"
              />
            </span>
            <span> that handles budgeting and cost-splitting with precision. Plus, discover activities and dining options with our </span>
            <span style={{ color: "#2563eb" }}>
              <BlurText
                text="AI-Powered Suggestions"
                delay={150}
                animateBy="words"
                direction="top"
                className="inline"
              />
            </span>
            <span> designed to personalize your travel experience.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
