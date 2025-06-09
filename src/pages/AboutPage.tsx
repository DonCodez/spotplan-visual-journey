
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Users, Target, Lightbulb, Heart } from "lucide-react";
import { CountAnimation } from "@/components/ui/count-animation";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make travel planning effortless and enjoyable for everyone, anywhere in the world."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to create personalized travel experiences."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global community of travelers who share and inspire each other."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about travel and helping others discover amazing destinations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <Header theme="light" />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
              About SpotPlan
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              We're revolutionizing the way people plan and experience travel through 
              intelligent AI-powered recommendations and collaborative planning tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Our Story</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    SpotPlan was born from a simple frustration: planning the perfect trip 
                    shouldn't be overwhelming. Our founders, avid travelers themselves, 
                    experienced firsthand the challenges of coordinating itineraries, 
                    managing expenses, and discovering hidden gems.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We envisioned a world where artificial intelligence could understand 
                    your unique travel preferences and craft personalized experiences that 
                    truly resonate with your style of exploration.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-sky-100 rounded-xl p-8 text-center">
                  <CountAnimation number={2025} className="text-4xl font-bold text-blue-600 mb-2" />
                  <div className="text-gray-600">Founded with a vision</div>
                  <CountAnimation number={195} className="text-4xl font-bold text-blue-600 mb-2 mt-6" />
                  <div className="text-gray-600">Countries covered</div>
                  <CountAnimation number={50} className="text-4xl font-bold text-blue-600 mb-2 mt-6" />
                  <div className="text-gray-600">AI recommendations per second</div>
                </div>
              </div>
            </motion.div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What Drives Us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our core values shape everything we do, from product development to customer support.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of travelers who trust SpotPlan to create unforgettable experiences.
            </p>
            <Button 
              className="text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: '#84cc16' }}
            >
              Start Planning Today
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
};

export default AboutPage;
