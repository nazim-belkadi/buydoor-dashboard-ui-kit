
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Fév", sales: 3000 },
  { name: "Mars", sales: 2000 },
  { name: "Avr", sales: 2780 },
  { name: "Mai", sales: 1890 },
  { name: "Juin", sales: 2390 },
];

export const SalesChart = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Ventes mensuelles</h3>
        <div className="h-[300px] w-full">
          <ChartContainer
            className="w-full"
            config={{
              sales: {
                theme: {
                  light: "oklch(47.22% 0.1834 290.74)",
                  dark: "oklch(47.22% 0.1834 290.74)",
                },
              },
            }}
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--color-sales)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

