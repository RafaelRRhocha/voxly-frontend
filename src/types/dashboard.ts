export interface DashboardCard {
  title: string;
  description: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ChartData {
  month: string;
  desktop: number;
  mobile: number;
}

export interface DashboardMetrics {
  totalSales: number;
  totalCustomers: number;
  totalOrders: number;
  totalProducts: number;
}
