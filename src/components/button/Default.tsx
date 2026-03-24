import { TouchableOpacity, Text, Pressable } from "react-native";
import { getButtonStyle, baseStyles } from "./style";
import { DefaultButtonProps } from ".";
import Loading from "../ui/Loading";
import { useState } from "react";

export function Default({ 
  title, 
  padding = 18, 
  borderRadius = 8,
  filled,
  gapAdjust = 10,
  fullWidth = false,
  textSize = 'MD',
  darkTheme = false,
  processing,
  processingLabel,
  unable,
  ...rest 
}: DefaultButtonProps) {

  const buttonStyle = getButtonStyle(filled ?? false, darkTheme);
  const fontSize = textSize === 'MD' ? 16 : textSize === 'LG' ? 24 : 12;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Pressable 
    activeOpacity={0.8} 
    onHoverIn={() => setIsHovered(true)}
    onHoverOut={() => setIsHovered(false)}
    disabled={unable || processing}
    style={({pressed}) => [
        baseStyles.button,
        { 
          padding, 
          gap: gapAdjust,
          borderRadius, 
          paddingHorizontal : 20,
          backgroundColor : pressed 
            ? (darkTheme ? "#444" : "#124063") 
          : isHovered 
            ? (darkTheme ? "#333" : "#5561D7") 
          : buttonStyle.backgroundColor,
          borderWidth       : buttonStyle.borderWidth,
          borderColor       : buttonStyle.borderColor,
          width             : fullWidth ? '100%' : 'auto',
          opacity           : unable ? 0.3 : 1,
          flexDirection     : 'row',
          alignItems        : 'center',
          justifyContent    : 'center',
        },
      ]}
    {...rest}
    >
      {processing &&
        <Loading
          size="small"
          color="#fff"
        />
      }

      <Text style={[
        baseStyles.title,
        { 
          color    : buttonStyle.textColor,
          fontSize,
        }
      ]}>     
        {processing ? processingLabel : title}
      </Text>
    </Pressable>
  );
}


