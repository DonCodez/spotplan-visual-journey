
import React from "react";
import { motion } from "framer-motion";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm"
    >
      <div className="flex h-16 items-center px-6">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="md:hidden mr-4" />
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-900">SPOTPLAN</span>
        </Link>
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* User actions could go here */}
      </div>
    </motion.nav>
  );
};

export default DashboardNavbar;
