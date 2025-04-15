
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
      <div className="fixed top-0 left-0 w-64 bg-sidebar-background z-50 border-r border-sidebar-border">
        {/* Logo section - now fixed at top */}
        <div className="flex items-center font-bold text-xl p-4 border-b border-sidebar-border">
          <span className="text-primary">Buy</span>
          <span className="text-blue-600">door</span>
        </div>
      </div>

      <SidebarHeader className="mt-16 p-4">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-8 w-full"
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
                  <SidebarMenuButton className="w-full">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainNavigation;
