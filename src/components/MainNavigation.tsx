
import { useState } from "react";
import { Search, Plus, User, FolderTree, CreditCard, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const navItems = [
  { icon: Plus, label: "New Table" },
  { icon: User, label: "Utilisateur" },
  { icon: FolderTree, label: "Category" },
  { icon: CreditCard, label: "Payment" },
  { icon: Truck, label: "Shipping" },
];

const MainNavigation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar>
      {/* Logo Header - Fixed at top */}
      <div className="fixed top-0 left-0 w-64 bg-background shadow-sm z-50">
        <div className="flex items-center justify-center h-16 border-b border-border">
          <span className="text-2xl font-bold text-primary">Buy</span>
          <span className="text-2xl font-bold text-blue-600">door</span>
        </div>
      </div>

      {/* Search and Navigation Content */}
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <SidebarHeader className="p-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher..." 
              className="w-full pl-9 h-10 bg-background border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default MainNavigation;
