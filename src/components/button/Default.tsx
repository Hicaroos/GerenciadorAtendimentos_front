import { Text, Pressable } from "react-native";
import { getButtonStyle, baseStyles, getButtonStyleWhileHover } from "./style";
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
  processing,
  processingLabel,
  unable,
  ...rest 
}: DefaultButtonProps) {

  const buttonStyle = getButtonStyle(filled ?? false);
  const buttonStyleWhileHover = getButtonStyleWhileHover(filled ?? false);
  const fontSize = textSize === 'MD' ? 16 : textSize === 'LG' ? 24 : 12;

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const appliedButtonStyle = isPressed
    ? buttonStyle
      : isHovered
    ? buttonStyleWhileHover
      : buttonStyle
  ;
  const textColor = isPressed 
    ? buttonStyle.color 
      : isHovered 
    ? buttonStyleWhileHover.color 
      : buttonStyle.color
  ;

  return (
    <Pressable 
    activeOpacity={0.8} 
    onHoverIn={()  => setIsHovered(true)}
    onHoverOut={() => setIsHovered(false)}
    onPressIn={()  => setIsPressed(true)}
    onPressOut={() => setIsPressed(false)}
    disabled={unable || processing}
    style={[
        baseStyles.button,
        appliedButtonStyle,
        { 
          padding, 
          gap: gapAdjust,
          borderRadius, 
          paddingHorizontal : 20,
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
          color={textColor}
        />
      }

      <Text style={[
        baseStyles.title,
        { 
          color : textColor,
          fontSize,
        }
      ]}>     
        {processing ? processingLabel : title}
      </Text>
    </Pressable>
  );
}


