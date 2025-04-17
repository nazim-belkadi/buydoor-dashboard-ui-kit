
import React, { useState } from "react";
import { Search, Package, User, FolderTree, CreditCard, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";
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
  { icon: Package, label: "Produit", path: "/products" },
  { icon: User, label: "Utilisateur", path: "/users" },
  { icon: FolderTree, label: "Category", path: "/categories" },
  { icon: CreditCard, label: "Payment", path: "/payments" },
  { icon: Truck, label: "Shipping", path: "/shipping" },
];

const MainNavigation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar>
      <div className="fixed top-0 left-0 w-64 bg-background shadow-sm z-50">
        <div className="flex items-center justify-center h-16 border-b border-border">
          <Logo />
        </div>
      </div>

      <div className="pt-16">
        <SidebarHeader className="p-4">
          <div className="relative w-full">
            <Search 
              className="absolute left-3 top-3 h-4 w-4" 
              style={{ color: 'oklch(47.22% 0.1834 290.74)' }} 
            />
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
                      onClick={() => window.location.href = item.path}
                    >
                      <item.icon 
                        className="h-5 w-5" 
                        style={{ color: 'oklch(47.22% 0.1834 290.74)' }} 
                      />
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
