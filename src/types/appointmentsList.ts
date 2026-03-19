export type AppointmentsList = {
  id       : number;
  date     : string;
  hour     : string; // Está em formato ISO, Ex: 2026-03-20T15:00:00.000Z
  userName : string;
  number   : string | null;
};