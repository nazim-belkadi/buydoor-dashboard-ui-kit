
import { Search, Plus, User, FolderTree, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          {/* Logo */}
          <div className="flex items-center font-bold text-xl">
            <span className="text-primary">Buy</span>
            <span className="text-blue-600">door</span>
          </div>

          {/* Main navigation */}
          <nav className="flex-1 flex items-center gap-6 ml-6">
            <Button variant="ghost" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Table
            </Button>

            {/* Navigation items */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Utilisateur
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <FolderTree className="h-4 w-4" />
                Category
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Shipping
              </Button>
            </div>
          </nav>

          {/* Search bar */}
          <div className="relative w-72">
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
  );
};

export default Index;
