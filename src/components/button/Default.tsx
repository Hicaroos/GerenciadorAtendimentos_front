import { TouchableOpacity, Text } from "react-native";
import { getButtonStyle, baseStyles } from "./style";
import { DefaultButtonProps } from ".";

export function Default({ 
  title, 
  padding = 18, 
  borderRadius = 8,
  filled,
  gapAdjust = 10,
  fullWidth = false,
  textSize = 'MD',
  darkTheme = false,
  unable,
  ...rest 
}: DefaultButtonProps) {

  const buttonStyle = getButtonStyle(filled ?? false, darkTheme);
  const fontSize = textSize === 'MD' ? 16 : textSize === 'LG' ? 24 : 12;

  return (
    <TouchableOpacity 
    activeOpacity={0.8} 
    style={[
        baseStyles.button,
        { 
          padding, 
          gap: gapAdjust,
          borderRadius, 
          paddingHorizontal : 20,
          backgroundColor   : buttonStyle.backgroundColor,
          borderWidth       : buttonStyle.borderWidth,
          borderColor       : buttonStyle.borderColor,
          width             : fullWidth ? '100%' : 'auto',
          opacity           : unable ? 0.3 : 1,
        },
      ]}
    {...rest}
    >
      <Text style={[
        baseStyles.title,
        { 
          color    : buttonStyle.textColor,
          fontSize,
        }
      ]}> 
        {title}
      </Text>
    </TouchableOpacity>
  );
}


