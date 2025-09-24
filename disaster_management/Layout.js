
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { 
  Waves, 
  MapPin, 
  BarChart3, 
  AlertTriangle, 
  Users, 
  Settings,
  Menu,
  X,
  Shield,
  Activity,
  Bell,
  User as UserIcon // Added User as UserIcon import
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Activity,
    roles: ["citizen", "volunteer", "official", "analyst"]
  },
  {
    title: "Report Hazard",
    url: createPageUrl("ReportHazard"),
    icon: AlertTriangle,
    roles: ["citizen", "volunteer", "official", "analyst"]
  },
  {
    title: "Social Analytics",
    url: createPageUrl("SocialAnalytics"),
    icon: BarChart3,
    roles: ["official", "analyst"]
  },
  {
    title: "Verify Reports",
    url: createPageUrl("VerifyReports"),
    icon: Shield,
    roles: ["official", "analyst"]
  },
  {
    title: "User Management",
    url: createPageUrl("UserManagement"),
    icon: Users,
    roles: ["official"]
  },
  {
    title: "Profile",
    url: createPageUrl("UserProfile"),
    icon: UserIcon, // Using the new UserIcon
    roles: ["citizen", "volunteer", "official", "analyst"] // Available to all roles
  }
];

const roleColors = {
  citizen: "bg-blue-100 text-blue-800",
  volunteer: "bg-green-100 text-green-800", 
  official: "bg-purple-100 text-purple-800",
  analyst: "bg-orange-100 text-orange-800"
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.error("User not authenticated");
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await User.logout();
    window.location.reload();
  };

  const filteredNavItems = user 
    ? navigationItems.filter(item => item.roles.includes(user.role_type))
    : navigationItems.filter(item => item.roles.includes("citizen"));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Waves className="w-8 h-8 text-blue-600 animate-pulse" />
          <span className="text-lg font-medium text-slate-700">Loading INCOIS Platform...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Waves className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">INCOIS Ocean Hazard Platform</h1>
          <p className="text-slate-600 mb-6">Integrated Platform for Crowdsourced Ocean Hazard Reporting and Social Media Analytics</p>
          <Button 
            onClick={() => User.login()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <style>{`
          :root {
            --ocean-primary: #0066CC;
            --ocean-secondary: #004080;
            --ocean-light: #E6F3FF;
            --ocean-accent: #FF6B35;
            --slate-text: #334155;
          }
        `}</style>
        
        <Sidebar className="border-r border-slate-200 bg-white/95 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">INCOIS Platform</h2>
                <p className="text-xs text-slate-500">Ocean Hazard Reporting</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mb-1 ${
                          location.pathname === item.url ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Emergency Contacts
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <a href="tel:108" className="block p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-800">
                      <Bell className="w-4 h-4" />
                      Emergency: 108
                    </div>
                  </a>
                  <a href="tel:04023895000" className="block p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                    <div className="text-sm font-semibold text-blue-800">INCOIS Control Room</div>
                    <div className="text-xs text-blue-600">040-23895000</div>
                  </a>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{user.full_name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{user.full_name}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${roleColors[user.role_type]}`}>
                      {user.role_type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {user.verification_status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2"> {/* Added flex container for buttons */}
                <Link to={createPageUrl("UserProfile")} className="flex-1"> {/* Profile button */}
                  <Button variant="outline" size="sm" className="w-full">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex-1" // Ensure both buttons take equal space
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">INCOIS Platform</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
