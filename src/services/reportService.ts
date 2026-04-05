import { WeeklyReportResponse } from "@/types/reports";
import { api } from "./api";

export const reportService = {
  weekly: async (weekStart: string) => {
    const response = await api.get<WeeklyReportResponse>("/relatorios/semanais", {
      params: { weekStart },
    });
    return response.data;
  },

  weeklyCoordination: async (weekStart: string) => {
    const response = await api.get<WeeklyReportResponse>(
      "/relatorios/semanais/coordenacao",
      {
        params: { weekStart },
      },
    );
    return response.data;
  },
};
