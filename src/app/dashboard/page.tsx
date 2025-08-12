"use client";

import { DollarSign, Package, ShoppingCart, Users2 } from "lucide-react";

import ChartOverview from "@/components/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboard } from "@/hooks";

export default function DashboardPage() {
  const { metrics } = useDashboard();

  const cards = [
    {
      title: "Total de vendas",
      description: "Total de vendas do mês",
      icon: DollarSign,
      content: metrics
        ? `R$ ${metrics.totalSales.toLocaleString("pt-BR")}`
        : "R$ 100.000,00",
    },
    {
      title: "Total de clientes",
      description: "Total de clientes do mês",
      icon: Users2,
      content: metrics ? metrics.totalCustomers.toString() : "100",
    },
    {
      title: "Total de pedidos",
      description: "Total de pedidos do mês",
      icon: ShoppingCart,
      content: metrics ? metrics.totalOrders.toString() : "100",
    },
    {
      title: "Total de produtos",
      description: "Total de produtos cadastrados",
      icon: Package,
      content: metrics ? metrics.totalProducts.toString() : "100",
    },
  ];

  return (
    <section className="sm:ml-14 p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral das suas métricas</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.title + card.description}>
            <CardHeader>
              <div className="flex items-center justify-center select-none">
                <CardTitle className="text-lg sm:text-xl text-gray-800">
                  {card.title}
                </CardTitle>
                <card.icon className="ml-auto size-4" />
              </div>

              <CardDescription>{card.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <span className="text-base sm:text-lg font-bold">
                {card.content}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview />
      </div>
    </section>
  );
}
