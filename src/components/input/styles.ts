import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    padding: 18,
    color: "#5561D7",
  },

  input_dark: {
    width: "100%",
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#3E3C41',
    borderRadius: 8,
    padding: 8,
    color: 'white',
  },

  input_bg_transparent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    borderColor: '#B8B8B8',
    color: '#858585',
  },

  input_container_dark: {
    width: "100%",
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#3E3C41',
    borderRadius: 8,
    flexDirection: 'row',
    color: 'white',
    gap: 8,
  },
});
