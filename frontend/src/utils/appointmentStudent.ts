import { AppointmentResponse } from "@/types/appointment";

type AppointmentStudentFields = AppointmentResponse & {
  studentUsername?: string;
  student_name?: string;
  student?: { name?: string; username?: string; fullName?: string };
};

type AppointmentTeacherFields = AppointmentResponse & {
  professor_name?: string;
  teacherUsername?: string;
  teacher_name?: string;
  teacher?: { name?: string; username?: string; fullName?: string };
};

export function getStudentDisplayName(appointment: AppointmentResponse): string {
  const a = appointment as AppointmentStudentFields;

  const candidates = [
    a.studentName,
    a.studentUsername,
    a.student_name,
    a.student?.fullName,
    a.student?.name,
    a.student?.username,
  ];

  for (const c of candidates) {
    const t = typeof c === "string" ? c.trim() : "";
    if (t) return t;
  }

  if (a.studentId != null) {
    return `Aluno (ID ${a.studentId})`;
  }

  return "Nome não informado";
}

export function getTeacherDisplayName(appointment: AppointmentResponse): string {
  const a = appointment as AppointmentTeacherFields;

  const candidates = [
    a.professorName,
    a.professor_name,
    a.teacherName,
    a.teacherUsername,
    a.teacher_name,
    a.teacher?.fullName,
    a.teacher?.name,
    a.teacher?.username,
  ];

  for (const c of candidates) {
    const t = typeof c === "string" ? c.trim() : "";
    if (t) return t;
  }

  const profId = a.professorId ?? a.teacherId;
  if (profId != null) {
    return `ID ${profId}`;
  }

  return "Não informado";
}
