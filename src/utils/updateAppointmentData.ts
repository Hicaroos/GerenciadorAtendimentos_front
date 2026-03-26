import { Appointment } from "@/types/appointment/studentAppointmentRequest";

export const updateListLogic = (
  prevList               : Appointment[], 
  shouldBeInTheList      : boolean,
  updatedAppointmentData : Appointment,
) => {
  if (shouldBeInTheList) {
    const exists = prevList.find(item => item.id === updatedAppointmentData.id);

    if (exists) {
      return prevList.map(item => item.id === updatedAppointmentData.id 
        ? updatedAppointmentData 
        : item
      );
    }

    return [...prevList, updatedAppointmentData];
  } else {
    return prevList.filter(item => item.id !== updatedAppointmentData.id);
  }
};