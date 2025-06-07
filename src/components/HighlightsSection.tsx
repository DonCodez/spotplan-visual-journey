
import { GradientText } from "@/components/ui/gradient-text";

const HighlightsSection = () => {
  return (
    <section id="features-section" className="py-20 bg-gradient-to-b from-[#f5f3ef] to-[#eff5f5]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            With TravelPal, you can <GradientText>Plan with Friends</GradientText> in real-time, effortlessly coordinating every detail of your trip. Enjoy a <GradientText>Smart Expense Estimator</GradientText> that handles budgeting and cost-splitting with precision. Plus, discover activities and dining options with our <GradientText>AI-Powered Suggestions</GradientText> designed to personalize your travel experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
