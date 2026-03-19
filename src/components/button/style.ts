import { StyleSheet } from "react-native";

export const getButtonStyle = (
  filled    : boolean, 
  darkTheme : boolean,
) => (
  (darkTheme) ? {
  backgroundColor: filled ? "#fff" : "#000",
  textColor: filled ? "#000" : "#fff",
  borderWidth: filled ? 0 : 1.5,
  borderColor: "#3E3C41",
} : { 
  backgroundColor: filled ? "#1A5987" : "white",
  textColor: filled ? "#fff" : "#1A5987",
  borderWidth: filled ? 0 : 1,
  borderColor: "#1A5987",
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