import { ChartData, DashboardMetrics } from "@/types";

import { api } from "./api";

export class DashboardService {
  async getMetrics(): Promise<DashboardMetrics> {
    return api.get<DashboardMetrics>("/dashboard/metrics");
  }

  async getChartData(): Promise<Array<ChartData>> {
    return api.get<Array<ChartData>>("/dashboard/chart-data");
  }

  async getSalesData(period: string = "30d"): Promise<any> {
    return api.get("/dashboard/sales", { params: { period } });
  }

  async getOrdersData(period: string = "30d"): Promise<any> {
    return api.get("/dashboard/orders", { params: { period } });
  }

  async getCustomersData(period: string = "30d"): Promise<any> {
    return api.get("/dashboard/customers", { params: { period } });
  }
}

export const dashboardService = new DashboardService();
