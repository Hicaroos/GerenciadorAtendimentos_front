import { StyleSheet } from "react-native";
import { style as userDashboardStyle } from './userDashboard';

export const style = StyleSheet.create({
  peding_solicitations_and_calendar_container: {
    ...userDashboardStyle.next_appointments_and_calendar_container,
  },

  peding_solicitations_container: {
    ...userDashboardStyle.next_appointments_container,
  },

  peding_solicitations_title_and_see_all_solicitaions_button_container: {
    ...userDashboardStyle.next_appointments_title_and_new_appointment_button_container,
  },

  peding_solicitations_title: {
    ...userDashboardStyle.next_appointments_title,
  },

  peding_solicitations_list: {
    ...userDashboardStyle.next_appointments_list,
    gap: 12,
    height: 250,
  },

  next_appointments_and_professor_disciplines_container: {
    ...userDashboardStyle.next_appointments_and_calendar_container,
  },

  next_appointments_title_and_see_all_appoitments_button_container: {
    ...userDashboardStyle.next_appointments_title_and_new_appointment_button_container,
  },

  professor_disciplines_container: {
    ...userDashboardStyle.calendar_container,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 16,
  },

  next_appointments_list: {
    ...userDashboardStyle.next_appointments_list,
    gap: 14,
  },

  professor_disciplines_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5561D7',
    marginTop: 20,
    marginLeft: 20,

  },

  professor_discipline_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 20,
  },

  professor_discipline_text: {
    fontWeight: 500,
    color: 'gray',
  },
  
  professor_disciplines_list: {
    gap: 8,
  },

  professor_discipline_icon_container: {
    width: 47,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A4ABF0',
    borderRadius: 8,
  },

  professor_discipline_icon: {
    color:  '#5E6BEF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});