import FromProfessor from './FromProfessor';
import FromStudent from './FromStudent';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED';

export const NextAppointment = {
  FromStudent,
  FromProfessor,
}