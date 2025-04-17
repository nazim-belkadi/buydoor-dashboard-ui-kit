
import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, Users, ShoppingCart, TrendingUp } from "lucide-react";

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

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Utilisateurs" value="1,234" icon={Users} colorClass="bg-blue-100 text-blue-600" />
      <StatCard title="Commandes" value="156" icon={ShoppingCart} colorClass="bg-green-100 text-green-600" />
      <StatCard title="Ventes" value="€8,234" icon={TrendingUp} colorClass="bg-purple-100 text-purple-600" />
      <StatCard title="Produits" value="89" icon={LayoutDashboard} colorClass="bg-orange-100 text-orange-600" />
    </div>
  );
};
