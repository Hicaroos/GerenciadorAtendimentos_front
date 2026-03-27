import FromProfessor from './FromProfessor';
import FromStudent from './FromStudent';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'DENIED' | 'CANCELLED';

export const NextAppointment = {
  FromStudent,
  FromProfessor,
}