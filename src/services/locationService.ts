import { CreateLocationRequest, LocationResponse } from "@/types/location";
import { api } from "./api";

export const locationService = {
  create: async (payload: CreateLocationRequest) => {
    const response = await api.post<LocationResponse>("/locations", payload);
    return response.data;
  },

  list: async () => {
    const response = await api.get<LocationResponse[]>("/locations");
    return response.data;
  },
};
