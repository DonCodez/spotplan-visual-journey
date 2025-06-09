import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Users, Target, Lightbulb, Heart } from "lucide-react";
import { CountAnimation } from "@/components/ui/count-animation";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";

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
                </div>
              </div>
            </motion.div>

            {/* Values Section with Cards Stack */}
            <div className="container min-h-[400vh] place-content-center px-6">
              <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
                <div className="left-0 top-0 md:sticky md:h-svh md:py-12">
                  <h5 className="text-xs uppercase tracking-wide text-gray-500">our values</h5>
                  <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight text-blue-900">
                    Guiding principles that{" "}
                    <span className="text-blue-600">shape our journey</span>
                  </h2>
                  <p className="max-w-prose text-sm text-gray-600">
                    These core values are the foundation of everything we do at SpotPlan. 
                    They guide our decisions, inspire our innovations, and ensure we always 
                    put travelers first in creating exceptional experiences.
                  </p>
                </div>
                <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <CardSticky
                        key={value.title}
                        index={index + 2}
                        className="rounded-2xl border border-blue-200 bg-white p-8 shadow-lg backdrop-blur-md hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-blue-600">
                            {String(index + 1).padStart(2, "0")}
                          </h3>
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-4 tracking-tight">
                          {value.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </CardSticky>
                    );
                  })}
                </ContainerScroll>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
};

export default AboutPage;
