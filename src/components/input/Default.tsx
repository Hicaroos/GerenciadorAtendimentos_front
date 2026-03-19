import { TextInput, TextInputProps, View, Text, StyleSheet } from "react-native";

import { styles } from './styles';

type Props = TextInputProps & {
  hasLabel : boolean;
  label    : string;
}

export function Default({ 
  hasLabel,
  label,
  ...rest
}: Props) {
  if (!hasLabel) {
    return <TextInput 
      style={styles.input} 
      {...rest}
    ></TextInput>
  }

  return (
    <View style={{gap: 6}}>
      <Text style={{ color: '#c0c0c0', fontWeight: 'bold' }}>
        {label}
      </Text>

      <TextInput 
        style={styles.input_dark} 
        {...rest}
      ></TextInput>
    </View>
  )
}

