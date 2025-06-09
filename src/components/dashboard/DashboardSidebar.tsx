
import React from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Settings, LogOut } from "lucide-react";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import dashboardData from "@/data/dashboard.json";

const iconMap = {
  home: Home,
  map: MapPin,
  settings: Settings,
};

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/");

  // Filter out profile and settings from main navigation
  const mainNavItems = dashboardData.navigation.filter(item => 
    !['profile', 'settings'].includes(item.icon)
  );
  
  const settingsItem = dashboardData.navigation.find(item => item.icon === 'settings');

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r border-gray-100 flex flex-col h-full">
        {/* Main Navigation */}
        <SidebarGroup className="pt-6 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                const active = isActive(item.path);
                
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
                          w-full h-11 px-3 rounded-lg transition-all duration-200 group
                          ${active 
                            ? "bg-spot-primary/10 text-spot-primary shadow-sm" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                        id={`sidebar-nav-${item.label.toLowerCase()}`}
                      >
                        <Link to={item.path} className="flex items-center w-full">
                          <IconComponent className={`h-5 w-5 ${collapsed ? "" : "mr-3"} transition-colors`} />
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

        {/* Bottom Section with Profile and Actions */}
        <SidebarGroup className="pb-4 mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {/* Settings */}
              {settingsItem && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`
                        w-full h-11 px-3 rounded-lg transition-all duration-200
                        ${isActive(settingsItem.path) 
                          ? "bg-spot-primary/10 text-spot-primary shadow-sm" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                      id="sidebar-nav-settings"
                    >
                      <Link to={settingsItem.path} className="flex items-center w-full">
                        <Settings className={`h-5 w-5 ${collapsed ? "" : "mr-3"} transition-colors`} />
                        {!collapsed && (
                          <span className="font-medium text-sm">{settingsItem.label}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              )}
              
              {/* Logout */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="w-full h-11 px-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                    id="sidebar-nav-logout"
                  >
                    <LogOut className={`h-5 w-5 ${collapsed ? "" : "mr-3"} transition-colors`} />
                    {!collapsed && <span className="font-medium text-sm">Logout</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>

              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="pt-3 border-t border-gray-100"
              >
                <SidebarMenuItem>
                  <div className={`flex items-center ${collapsed ? "justify-center" : "px-3"} py-3`}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/lovable-uploads/78296343-29d6-4141-a8ff-28b5730a0c66.png" alt="Profile" />
                      <AvatarFallback className="bg-spot-primary/10 text-spot-primary font-medium">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                      <div className="ml-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                        <p className="text-xs text-gray-500 truncate">john@example.com</p>
                      </div>
                    )}
                  </div>
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
