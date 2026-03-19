import { AppointmentsList } from "@/types/appointmentsList";

export const updateListLogic = (
  prevList               : AppointmentsList[], 
  shouldBeInTheList      : boolean,
  updatedAppointmentData : AppointmentsList,
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