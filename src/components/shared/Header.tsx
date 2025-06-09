
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  theme?: "light" | "dark";
}

const Header = ({ theme = "light" }: HeaderProps) => {
  const isDark = theme === "dark";
  
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
        
        {/* Login Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <Button 
            variant="ghost" 
            className={`font-medium ${
              isDark 
                ? 'text-white hover:bg-white/10' 
                : 'text-blue-900 hover:bg-blue-50'
            }`}
          >
            Log in
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;
