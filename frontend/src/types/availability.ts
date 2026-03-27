export type CreateAvailabilityRequest = {
  startTime: string;
  endTime: string;
};

export type AvailabilityResponse = {
  id: number;
  teacherId: number;
  teacherName?: string;
  locationId?: number;
  locationName?: string;
  startTime: string;
  endTime: string;
  createdAt?: string;
};
