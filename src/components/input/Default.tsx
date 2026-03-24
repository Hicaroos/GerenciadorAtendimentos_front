import { TextInput, View, Text, StyleSheet } from "react-native";

import { styles } from './styles';
import { DefaultInputProps } from ".";

export function Default({ 
  hasLabel,
  label,
  bgTransparent,
  ...rest
}: DefaultInputProps) {
  if (!hasLabel) {
    return <TextInput 
      style={styles.input} 
      {...rest}
    />
  }

  return (
    <View style={{gap: 6}}>
      <Text style={[
        bgTransparent ? {
          color: '#5561D7'
        } : {
          color: '#c0c0c0'
        }, {
          fontWeight: 'bold' 
        }
      ]}>
        {label}
      </Text>

      <TextInput 
        style={bgTransparent 
          ? styles.input_bg_transparent 
          : styles.input_dark
        } 
        {...rest}
      />
    </View>
  )
}

