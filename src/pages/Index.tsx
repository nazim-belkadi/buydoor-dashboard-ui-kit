import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import MainNavigation from "@/components/MainNavigation";
import { LayoutDashboard, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "next-themes";

const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  colorClass: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className={`rounded-full p-3 ${colorClass}`}>
          <Icon className="h-6 w-6" style={{ color: 'oklch(47.22% 0.1834 290.74)' }} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <MainNavigation />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-1">Tableau de bord</h1>
                <p className="text-muted-foreground">Bienvenue sur votre espace Buydoor</p>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <SidebarTrigger 
                  className="lg:hidden" 
                  style={{ color: 'oklch(47.22% 0.1834 290.74)' }} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Utilisateurs" value="1,234" icon={Users} colorClass="bg-blue-100 text-blue-600" />
              <StatCard title="Commandes" value="156" icon={ShoppingCart} colorClass="bg-green-100 text-green-600" />
              <StatCard title="Ventes" value="€8,234" icon={TrendingUp} colorClass="bg-purple-100 text-purple-600" />
              <StatCard title="Produits" value="89" icon={LayoutDashboard} colorClass="bg-orange-100 text-orange-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Activités récentes</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Users 
                            className="h-5 w-5 text-muted-foreground" 
                            style={{ color: 'oklch(47.22% 0.1834 290.74)' }} 
                          />
                        </div>
                        <div>
                          <p className="font-medium">Nouvel utilisateur inscrit</p>
                          <p className="text-sm text-muted-foreground">Il y a {i * 5} minutes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
