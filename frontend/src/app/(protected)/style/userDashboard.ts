import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  wrapper_container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },

  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#b9b9b9',
  },

  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    height: 67,
    maxWidth: 1080,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },

  main_container: {
    flex: 1,
    maxWidth: 1080,
    alignSelf: 'center',
    paddingHorizontal: 40,
    width: '100%',
    paddingVertical: 16,
    gap: 16,
  },

  welcome_message_and_search_bar_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  welcome_message_container: {
    gap: 3,
  },

  welcome_text: {
    fontSize: 18,
    color: '#5561D7',
    fontWeight: 500,
  },

  brief_text: {
    color: 'gray',
  },

  dashboard_stats_cards_container: {
    flexDirection: 'row',
    gap: 8
  },

  next_appointments_and_calendar_container: {
    flexDirection: 'row',
    gap: 8,
  },

  next_appointments_container: {
    flex: 3,
    gap: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b9b9b9',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  calendar_container: {
    flex: 1.035,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b9b9b9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  next_appointments_title_and_new_appointment_button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  next_appointments_title: {
    color: '#5561D7',
    fontWeight: 'bold',
    fontSize: 18,
  },

  next_appointments_list: {
    gap: 8,
    height: 245,
    paddingRight: 5,
  },
});