import { TouchableOpacity, Text, Pressable } from "react-native";
import { baseStyles, getButtonStyle, getButtonStyleWhileHover } from './style';
import { WithIconButtonProps } from ".";
import Loading from "../ui/Loading";
import { useState } from "react";

export function WithIcon({ 
  title, 
  iconFamily: Icon,
  iconName,
  padding = 18, 
  borderRadius = 8,
  fullWidth = false,
  gapAdjust = 10,
  filled,
  iconSide = 'LEFT',
  textSize = 'MD',
  processing,
  processingLabel,
  ...rest 
}: WithIconButtonProps) {

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const buttonStyle = getButtonStyle(filled ?? false);
  const buttonStyleWhileHover = getButtonStyleWhileHover(filled ?? false);

  const fontSize = textSize === 'MD' ? 16 : textSize === 'LG' ? 24 : 12;
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
      {...rest}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        baseStyles.button,
        appliedButtonStyle,
        {
          padding,
          gap: gapAdjust,
          borderRadius,
          paddingHorizontal: 20,
          width: fullWidth ? '100%' : 'auto',
        },
      ]}
    >
      {iconSide === 'LEFT' ? (
        <>
          {!processing ? (
            <Icon 
              size={fontSize} 
              color={textColor} 
              name={iconName}
            />
          ) : (
            <Loading size="small" color={textColor} />
          )}

          <Text style={[
            baseStyles.title,
            { 
              color    : textColor, 
              fontSize, 
            }
          ]}>
            {processing ? processingLabel : title}
          </Text>
        </>
      ) : (
        <>
          <Text style={[
            baseStyles.title,
            { 
              color    : textColor, 
              fontSize, 
            }
          ]}>
            {processing ? processingLabel : title}
          </Text>

          {!processing ? (
            <Icon 
              size={fontSize} 
              color={textColor} 
              name={iconName}
            />
          ) : (
            <Loading size="small" color={textColor} />
          )}
        </>
      )}
    </Pressable>
  );
}

