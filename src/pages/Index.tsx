
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import MainNavigation from "@/components/MainNavigation";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { UsersChart } from "@/components/dashboard/UsersChart";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your Buydoor portal</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <SidebarTrigger 
                className="lg:hidden" 
                style={{ color: 'oklch(47.22% 0.1834 290.74)' }} 
              />
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SalesChart />
            <UsersChart />
          </div>

          <div className="w-full">
            <RecentActivities />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
