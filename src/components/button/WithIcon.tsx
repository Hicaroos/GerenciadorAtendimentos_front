import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { baseStyles, getButtonStyle } from './style';
import { WithIconButtonProps } from ".";

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
  darkTheme = false,
  ...rest 
}: WithIconButtonProps) {

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
      }
    ]} 
    {...rest}
    >
      {iconSide === 'LEFT' ? (
        <>
          <Icon 
            size={fontSize} 
            color={buttonStyle.textColor} 
            name={iconName}
          />

          <Text style={[
            baseStyles.title,
            { 
              color: buttonStyle.textColor,
              fontSize,
            }
          ]}>
            {title}
          </Text>
        </>
      ) : (
        <>
          <Text style={[
            baseStyles.title,
            { 
              color: buttonStyle.textColor,
              fontSize,
            }
          ]}>
            {title}
          </Text>

          <Icon 
            size={fontSize} 
            color={buttonStyle.textColor} 
            name={iconName}
          />
        </>
      )}
    </TouchableOpacity>
  );
}

