import { create } from "zustand";

import { dashboardService } from "@/services";
import { ChartData, DashboardMetrics } from "@/types";

interface DashboardState {
  metrics: DashboardMetrics | null;
  chartData: Array<ChartData>;
  isLoadingMetrics: boolean;
  isLoadingChartData: boolean;
  error: string | null;
}

interface DashboardActions {
  fetchMetrics: () => Promise<void>;
  fetchChartData: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetDashboard: () => void;
}

type DashboardStore = DashboardState & DashboardActions;

const initialState: DashboardState = {
  metrics: null,
  chartData: [],
  isLoadingMetrics: false,
  isLoadingChartData: false,
  error: null,
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  ...initialState,

  fetchMetrics: async () => {
    set({ isLoadingMetrics: true, error: null });

    try {
      const metrics = await dashboardService.getMetrics();
      set({ metrics, isLoadingMetrics: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Erro ao carregar métricas",
        isLoadingMetrics: false,
      });
    }
  },

  fetchChartData: async () => {
    set({ isLoadingChartData: true, error: null });

    try {
      const chartData = await dashboardService.getChartData();
      set({ chartData, isLoadingChartData: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao carregar dados do gráfico",
        isLoadingChartData: false,
      });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  resetDashboard: () => {
    set(initialState);
  },
}));
