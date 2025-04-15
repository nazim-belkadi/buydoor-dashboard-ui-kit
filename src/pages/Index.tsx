
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainNavigation } from "@/components/MainNavigation";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <div className="flex-1">
          <header className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              {/* Search bar */}
              <div className="relative w-72 ml-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="p-8">
            <div className="rounded-lg border bg-card p-8">
              <h2 className="text-lg font-semibold mb-4">Welcome to Buydoor Dashboard</h2>
              <p className="text-muted-foreground">Select an option from the navigation menu to get started.</p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
