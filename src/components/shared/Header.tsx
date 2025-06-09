
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Home, User, FileText, Contact } from "lucide-react";

interface HeaderProps {
  theme?: "light" | "dark";
}

const Header = ({ theme = "light" }: HeaderProps) => {
  const isDark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    { title: "Home", icon: Home },
    { title: "About", icon: User },
    { title: "Privacy", icon: FileText },
    { title: "Contact", icon: Contact },
  ];

  // Determine which tab should be active based on current route
  const getActiveTabIndex = () => {
    switch (location.pathname) {
      case "/":
        return 0; // Home
      case "/about":
        return 1; // About
      case "/privacy-policy":
        return 2; // Privacy
      case "/contact":
        return 3; // Contact
      default:
        return null;
    }
  };

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      switch (index) {
        case 0:
          navigate("/");
          break;
        case 1:
          // Navigate to About page when it exists
          console.log("About page coming soon");
          break;
        case 2:
          navigate("/privacy-policy");
          break;
        case 3:
          // Navigate to Contact page when it exists
          console.log("Contact page coming soon");
          break;
      }
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 w-full py-4 px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center"
        >
          <Link to="/" className={`text-2xl font-bold hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-blue-900'}`}>
            SPOTPLAN
          </Link>
        </motion.div>

        {/* Right side with Menubar and Login Button */}
        <div className="flex items-center gap-4">
          {/* Menubar */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="hidden md:flex"
          >
            <ExpandableTabs 
              tabs={tabs} 
              onChange={handleTabChange}
              activeColor={isDark ? "text-white" : "text-blue-600"}
              className={isDark ? "border-white/20 bg-black/50" : "border-gray-200 bg-white/80"}
              defaultSelected={getActiveTabIndex()}
            />
          </motion.div>
          
          {/* Login Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Button 
              className="font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#2563eb' }}
            >
              Log in
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
