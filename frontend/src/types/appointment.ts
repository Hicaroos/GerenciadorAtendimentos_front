import { AppointmentStatus } from "./common";

export type CreateAppointmentRequest = {
  professorId: number;
  locationId?: number;
  startDateTime: string;
  endDateTime: string;
  meetingReason: string;
};

export type AppointmentResponse = {
  id: number;
  status: AppointmentStatus;
  studentId?: number;
  studentName?: string;
  teacherId?: number;
  teacherName?: string;
  locationId?: number;
  locationName?: string;
  meetingReason?: string;
  subjectName?: string;
  startDateTime: string;
  endDateTime: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AvailableSlotResponse = {
  professorId: number;
  professorName?: string;
  locationId: number;
  locationName?: string;
  startDateTime: string;
  endDateTime: string;
};

export type RescheduleAppointmentRequest = {
  professorId: number;
  locationId: number;
  startDateTime: string;
  endDateTime: string;
  meetingReason: string;
};
