
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        {/* Main content area */}
        <main className="flex-1 p-8">
          <SidebarTrigger className="mb-4" />
          <div className="rounded-lg border bg-card p-8">
            <h2 className="text-lg font-semibold mb-4">
              Welcome to Buydoor Dashboard
            </h2>
            <p className="text-muted-foreground">
              Select an option from the navigation menu to get started.
            </p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
