import { api } from "./api";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/auth";
import { UserRole } from "@/types/common";

export const authService = {
  register: async (payload: RegisterRequest) => {
    const response = await api.post<void>("/auth/register", payload);
    return response.data;
  },

  login: async (payload: LoginRequest) => {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },

  createAdmin: async (payload: RegisterRequest, role: UserRole = "ROLE_TEACHER") => {
    const response = await api.post<void>(`/auth/admin?role=${role}`, payload);
    return response.data;
  },
};
