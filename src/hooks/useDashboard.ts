import { useEffect } from "react";

import { useDashboardStore } from "@/stores";

export const useDashboard = () => {
  const dashboardStore = useDashboardStore();

  useEffect(() => {
    dashboardStore.fetchMetrics();
    dashboardStore.fetchChartData();
  }, []);

  const refreshData = async () => {
    await Promise.all([
      dashboardStore.fetchMetrics(),
      dashboardStore.fetchChartData(),
    ]);
  };

  return {
    ...dashboardStore,
    refreshData,
  };
};
