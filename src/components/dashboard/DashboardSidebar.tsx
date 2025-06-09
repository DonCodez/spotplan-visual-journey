
import React from "react";
import { motion } from "framer-motion";
import { Home, MapPin, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import dashboardData from "@/data/dashboard.json";

const iconMap = {
  home: Home,
  map: MapPin,
};

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/");

  // Filter out profile and settings from main navigation
  const mainNavItems = dashboardData.navigation.filter(item => 
    !['user', 'settings'].includes(item.icon)
  );

  const { user } = dashboardData;

  return (
    <Sidebar className={collapsed ? "w-12" : "w-48"} collapsible="icon">
      <SidebarContent className="bg-white border-r border-gray-100 flex flex-col h-full">
        {/* Header with Profile Avatar */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center justify-center">
            {/* Simple circle avatar with first letter */}
            <div className="h-8 w-8 bg-spot-primary/10 text-spot-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="pt-4 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                const active = isActive(item.path);
                
                // Only render if we have a valid icon component
                if (!IconComponent) {
                  console.warn(`Icon "${item.icon}" not found in iconMap`);
                  return null;
                }
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={`
                          w-full h-10 px-3 rounded-md transition-all duration-200 group
                          ${active 
                            ? "bg-spot-primary/10 text-spot-primary shadow-sm" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                        id={`sidebar-nav-${item.label.toLowerCase()}`}
                      >
                        <Link to={item.path} className="flex items-center w-full">
                          <IconComponent className={`h-4 w-4 ${collapsed ? "" : "mr-3"} transition-colors`} />
                          {!collapsed && (
                            <span className="font-medium text-sm">{item.label}</span>
                          )}
                          {active && !collapsed && (
                            <div className="ml-auto w-1 h-1 bg-spot-primary rounded-full" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section with Logout */}
        <SidebarGroup className="pb-4 mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="w-full h-10 px-3 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                    id="sidebar-nav-logout"
                  >
                    <LogOut className={`h-4 w-4 ${collapsed ? "" : "mr-3"} transition-colors`} />
                    {!collapsed && <span className="font-medium text-sm">Logout</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
