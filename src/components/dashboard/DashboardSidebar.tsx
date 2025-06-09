
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Home, MapPin, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import dashboardData from "@/data/dashboard.json";

const iconMap = {
  home: Home,
  map: MapPin,
};

const DashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  
  // Filter out profile and settings from main navigation
  const mainNavItems = dashboardData.navigation.filter(item => 
    !['user', 'settings'].includes(item.icon)
  );

  const links = mainNavItems.map(item => ({
    label: item.label,
    href: item.path,
    icon: {
      home: <Home className="text-spot-primary h-5 w-5 flex-shrink-0" />,
      map: <MapPin className="text-spot-primary h-5 w-5 flex-shrink-0" />,
    }[item.icon] || <Home className="text-spot-primary h-5 w-5 flex-shrink-0" />
  }));

  const { user } = dashboardData;

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SidebarLink
            link={{
              label: "Logout",
              href: "/login",
              icon: <LogOut className="text-red-600 h-5 w-5 flex-shrink-0" />
            }}
          />
          <SidebarLink
            link={{
              label: user.name,
              href: "#",
              icon: (
                <div className="h-7 w-7 bg-spot-primary/10 text-spot-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-spot-primary py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-spot-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-spot-primary whitespace-pre"
      >
        SpotPlan
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-spot-primary py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-spot-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default DashboardSidebar;
