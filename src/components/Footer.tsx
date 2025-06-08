

import { Card } from "@/components/ui/card";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import socialData from "@/data/social.json";

const iconMap = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

const Footer = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Rectangle container matching How It Works section */}
        <div className="relative text-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #22afed, #2563eb, #1e3a8a)' }}>
          {/* Background Dotted World Map */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/landingpage/dottedworldmap.png')",
              filter: "invert(1)"
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-16">
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  YOUR DREAM TRIP,
                  <br />
                  <span className="text-spot-beige">YOUR WAY</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Everyone's perfect journey looks different. Share your vision, and we'll
                  bring it to life with personalized recommendations that match your
                  unique travel style.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-spot-beige text-spot-primary px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  ✈️ Discover Now
                </motion.button>
              </motion.div>

              {/* Footer Links Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
              >
                {/* Logo and description */}
                <div className="md:col-span-2">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-4 text-spot-beige"
                  >
                    SpotPlan
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-white/80 mb-6 max-w-md"
                  >
                    The smartest way to plan your travels. AI-powered itineraries, 
                    collaborative planning, and intelligent expense tracking.
                  </motion.p>
                  
                  {/* Social media links */}
                  <div className="flex space-x-4">
                    {socialData.socialLinks.map((social, index) => {
                      const IconComponent = iconMap[social.platform as keyof typeof iconMap];
                      
                      return (
                        <motion.a
                          key={social.platform}
                          href={social.url}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-spot-beige hover:text-spot-primary transition-all duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Quick links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold mb-4 text-spot-beige">Product</h4>
                  <ul className="space-y-2">
                    {["Features", "Pricing", "How it Works", "Reviews"].map((link, index) => (
                      <motion.li 
                        key={link}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <a href="#" className="text-white/80 hover:text-spot-beige transition-colors hover:underline">
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Company links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold mb-4 text-spot-beige">Company</h4>
                  <ul className="space-y-2">
                    {["About", "Terms", "Privacy", "Contact"].map((link, index) => (
                      <motion.li 
                        key={link}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <a href="#" className="text-white/80 hover:text-spot-beige transition-colors hover:underline">
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Copyright */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="border-t border-white/20 pt-8 text-center"
              >
                <p className="text-white/60">
                  © 2025 SpotPlan. All rights reserved.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
