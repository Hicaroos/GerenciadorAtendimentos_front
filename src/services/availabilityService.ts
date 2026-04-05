import { api } from "./api";
import {
  AvailabilityResponse,
  CreateAvailabilityRequest,
} from "@/types/availability";

export const availabilityService = {
  create: async (payload: CreateAvailabilityRequest) => {
    const response = await api.post<AvailabilityResponse>("/availability", payload);
    return response.data;
  },

  listAll: async () => {
    const response = await api.get<AvailabilityResponse[]>("/availability");
    return response.data;
  },

  listByTeacher: async (teacherId: number) => {
    const response = await api.get<AvailabilityResponse[]>(
      `/availability/teacher/${teacherId}`,
    );
    return response.data;
  },
};
