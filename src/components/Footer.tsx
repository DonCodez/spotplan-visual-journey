
import { Card } from "@/components/ui/card";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import socialData from "@/data/social.json";

const iconMap = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and description */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 text-spot-secondary">
                SpotPlan
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                The smartest way to plan your travels. AI-powered itineraries, 
                collaborative planning, and intelligent expense tracking.
              </p>
              
              {/* Social media links */}
              <div className="flex space-x-4">
                {socialData.socialLinks.map((social) => {
                  const IconComponent = iconMap[social.platform as keyof typeof iconMap];
                  
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-spot-primary transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">How it Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">Reviews</a></li>
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-spot-secondary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 SpotPlan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
