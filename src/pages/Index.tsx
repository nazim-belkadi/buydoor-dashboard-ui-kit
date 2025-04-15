
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <SidebarTrigger className="lg:hidden" />
          </div>
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Bienvenue sur Buydoor Dashboard
            </h2>
            <p className="text-muted-foreground">
              Sélectionnez une option dans le menu de navigation pour commencer.
            </p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
