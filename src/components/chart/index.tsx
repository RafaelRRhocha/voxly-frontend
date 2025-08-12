"use client";

import { DollarSign } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useDashboard } from "@/hooks";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartConfig, ChartContainer } from "../ui/chart";

const ChartOverview = () => {
  const { chartData, isLoadingChartData } = useDashboard();

  const fallbackData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const displayData = chartData.length > 0 ? chartData : fallbackData;

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <div className="flex items-center justify-center select-none">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Vendas por Período
          </CardTitle>
          <DollarSign className="ml-auto size-4" />
        </div>

        <CardDescription>
          {isLoadingChartData
            ? "Carregando dados..."
            : "Comparativo de vendas desktop vs mobile"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={displayData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartOverview;
