
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
  const highlightedText = "With SpotPlan, you can Plan with Friends in real-time, effortlessly coordinating every detail of your trip. Enjoy a Smart Expense Estimator that handles budgeting and cost-splitting with precision. Plus, discover activities and dining options with our AI-Powered Suggestions designed to personalize your travel experience.";

  const createHighlightedText = (text: string) => {
    const keyPhrases = ["Plan with Friends", "Smart Expense Estimator", "AI-Powered Suggestions"];
    
    let processedText = text;
    keyPhrases.forEach(phrase => {
      processedText = processedText.replace(
        phrase,
        `<span style="color: #2563eb">${phrase}</span>`
      );
    });
    
    return processedText;
  };

  return (
    <section id="features-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6 leading-tight sm:leading-snug max-w-6xl mx-auto text-center"
            dangerouslySetInnerHTML={{ __html: createHighlightedText(highlightedText) }}
          />
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
