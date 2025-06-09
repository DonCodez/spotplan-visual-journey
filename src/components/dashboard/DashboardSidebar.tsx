
import React from "react";
import { motion } from "framer-motion";
import { Home, Map, User, Settings, LogOut } from "lucide-react";
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
  map: Map,
  user: User,
  settings: Settings,
};

const DashboardSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/");

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarContent className="bg-white border-r border-gray-200">
        <SidebarGroup className="pt-8">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {dashboardData.navigation.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                const active = isActive(item.path);
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={`
                          w-full h-12 px-4 rounded-lg transition-all duration-200
                          ${active 
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                        id={`sidebar-nav-${item.label.toLowerCase()}`}
                      >
                        <Link to={item.path} className="flex items-center w-full">
                          <IconComponent className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                          {!collapsed && (
                            <span className="font-medium">{item.label}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                );
              })}
              
              {/* Logout button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="pt-8"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="w-full h-12 px-4 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                    id="sidebar-nav-logout"
                  >
                    <LogOut className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                    {!collapsed && <span className="font-medium">Logout</span>}
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
