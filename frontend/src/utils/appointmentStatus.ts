import { AppointmentStatus } from "@/types/common";

export type UiAppointmentStatus = "PENDING" | "CONFIRMED" | "DENIED" | "CANCELLED";

export function normalizeAppointmentStatus(status: AppointmentStatus): Exclude<AppointmentStatus, "AGENDADO"> | "APROVADO" {
  if (status === "AGENDADO") return "APROVADO";
  return status;
}

export function toUiAppointmentStatus(status: AppointmentStatus): UiAppointmentStatus {
  const normalizedStatus = normalizeAppointmentStatus(status);

  if (normalizedStatus === "PENDENTE") return "PENDING";
  if (normalizedStatus === "APROVADO") return "CONFIRMED";
  if (normalizedStatus === "RECUSADO") return "DENIED";
  return "CANCELLED";
}

export function isCancelableStatus(status: AppointmentStatus): boolean {
  const normalizedStatus = normalizeAppointmentStatus(status);
  return normalizedStatus === "PENDENTE" || normalizedStatus === "APROVADO";
}

export function isReSchedulableStatus(status: AppointmentStatus): boolean {
  const normalizedStatus = normalizeAppointmentStatus(status);
  return normalizedStatus === "PENDENTE" || normalizedStatus === "APROVADO";
}

export function isApprovableStatus(status: AppointmentStatus): boolean {
  return normalizeAppointmentStatus(status) === "PENDENTE";
}
