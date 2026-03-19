import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  wrapper_container: {
    flex: 1,
    backgroundColor: 'black',
  },

  scroll_content_container: {
    maxHeight: 100,
  },

  scroll_content_items: {
    gap: 8,
  },

  main_container: {
    padding: 20,
    width: '100%',
    gap: 24,
    alignSelf: 'center',
    backgroundColor: 'black',
    maxWidth: 1080,
  },

  header_title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
  },
  
  header_container: {
    flexDirection  : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
  },
  
  appointments_day_and_new_appointment_container: {
    flexDirection: 'row',
    gap: 8,
  },

  appointments_main_container: {
    gap: 16,
  },

  appointments_container: {
    borderWidth: 1.5,
    borderColor: '#3E3C41',
    borderRadius: 8,
  },

  appointments_period_label_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  appointments_container_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#3E3C41',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },

  text_color: {
    color: '#9c97a4'
  },

  no_list_text_color: {
    color: '#635f68',
  },

  appointments_list_table_container: {
    paddingVertical: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    gap: 10,
  },

  appointments_list_table_row: {
    flexDirection: 'row',
  },
});