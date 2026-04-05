export type WeeklyReportItem = {
  teacherId?: number;
  teacherName?: string;
  studentId?: number;
  studentName?: string;
  locationId?: number;
  locationName?: string;
  totalAppointments?: number;
  approvedAppointments?: number;
  pendingAppointments?: number;
  cancelledAppointments?: number;
};

export type WeeklyReportResponse = {
  weekStart: string;
  weekEnd?: string;
  generatedAt?: string;
  items: WeeklyReportItem[];
};
