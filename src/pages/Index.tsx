
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
            Welcome to SpotPlan
          </h1>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            Your intelligent travel planning companion. Ready to explore the world?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/landing">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Landing Page
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
