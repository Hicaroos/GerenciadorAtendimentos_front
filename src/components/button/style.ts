import { StyleSheet } from "react-native";

export const getButtonStyle = (
  filled    : boolean, 
) => ({ 
  backgroundColor: filled ? "#5561D7" : "white",
  color: filled ? "#fff" : "#5561D7",
  borderWidth: 1,
  borderColor: "#5561D7",
});

export const getButtonStyleWhileHover = (
  filled    : boolean, 
) => ({ 
  backgroundColor: filled ? "white" : "#5561D7",
  color: filled ? "#5561D7" : "#fff",
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