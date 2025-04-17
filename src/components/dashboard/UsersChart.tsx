
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 250 },
  { month: "Apr", users: 310 },
  { month: "May", users: 420 },
  { month: "Jun", users: 500 },
];

export const UsersChart = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Growth</h3>
        <div className="h-[300px] w-full">
          <ChartContainer
            className="w-full"
            config={{
              users: {
                theme: {
                  light: "oklch(47.22% 0.1834 290.74)",
                  dark: "oklch(47.22% 0.1834 290.74)",
                },
              },
            }}
          >
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip />
              <Bar
                dataKey="users"
                fill="var(--color-users)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
