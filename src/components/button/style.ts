import { StyleSheet } from "react-native";

export const getButtonStyle = (
  filled    : boolean, 
  darkTheme : boolean,
) => (
  (darkTheme) ? {
  backgroundColor: filled ? "#fff" : "#000",
  textColor: filled ? "#000" : "#fff",
  borderWidth: 1.5,
  borderColor: "#3E3C41",
} : { 
  backgroundColor: filled ? "#5561D7" : "white",
  textColor: filled ? "#fff" : "#5561D7",
  borderWidth: 1,
  borderColor: "#5561D7",
});

export const baseStyles = StyleSheet.create({
  button: {
    justifyContent    : "center",
    alignItems        : "center",
    flexDirection     : "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});