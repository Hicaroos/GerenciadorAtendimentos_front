import { api } from "./api";
import {
  AppointmentResponse,
  AvailableSlotResponse,
  CreateAppointmentRequest,
  RescheduleAppointmentRequest,
} from "@/types/appointment";

export const appointmentService = {
  create: async (payload: CreateAppointmentRequest) => {
    const response = await api.post<AppointmentResponse>("/agendamentos", payload);
    return response.data;
  },

  listAvailableSlots: async (params: {
    professorId: number;
    locationId: number;
    from: string;
    to: string;
    slotMinutes: number;
    stepMinutes?: number;
  }) => {
    const response = await api.get<AvailableSlotResponse[]>(
      "/agendamentos/disponiveis/slots",
      { params },
    );
    return response.data;
  },

  listMyAppointments: async () => {
    const response = await api.get<AppointmentResponse[]>("/agendamentos/meus");
    return response.data;
  },

  listMyTeacherAppointments: async () => {
    const response = await api.get<AppointmentResponse[]>("/agendamentos/professor/meus");
    return response.data;
  },

  listTeacherPending: async () => {
    const response = await api.get<AppointmentResponse[]>(
      "/agendamentos/professor/pendentes",
    );
    return response.data;
  },

  listTeacherApproved: async () => {
    const response = await api.get<AppointmentResponse[]>(
      "/agendamentos/professor/aprovados",
    );
    return response.data;
  },

  approve: async (id: number) => {
    const response = await api.patch<AppointmentResponse>(`/agendamentos/${id}/aprovar`);
    return response.data;
  },

  deny: async (id: number) => {
    const response = await api.patch<AppointmentResponse>(`/agendamentos/${id}/recusar`);
    return response.data;
  },

  cancel: async (id: number) => {
    const response = await api.patch<AppointmentResponse>(`/agendamentos/${id}/cancelar`);
    return response.data;
  },

  reschedule: async (id: number, payload: RescheduleAppointmentRequest) => {
    const response = await api.post<AppointmentResponse>(
      `/agendamentos/${id}/reagendar`,
      payload,
    );
    return response.data;
  },

  listMyHistory: async () => {
    const response = await api.get<AppointmentResponse[]>("/agendamentos/historico/meus");
    return response.data;
  },

  listMyTeacherHistory: async () => {
    const response = await api.get<AppointmentResponse[]>(
      "/agendamentos/historico/professor/meus",
    );
    return response.data;
  },
};
