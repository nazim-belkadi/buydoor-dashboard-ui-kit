
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export const RecentActivities = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Activités récentes</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-5 w-5 text-muted-foreground" style={{ color: 'oklch(47.22% 0.1834 290.74)' }} />
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
  );
};
