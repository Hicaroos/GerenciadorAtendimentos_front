import { TextInput, View, Text, StyleSheet } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

import { DefaultInputProps } from ".";

export function Search({ 
  ...rest
}: DefaultInputProps) {
  return (
    <View style={styles.input_container}>
      <Feather 
        name="search" 
        size={18} 
        color="gray" 
      />

      <TextInput 
        placeholder="Buscar"
        style={styles.input}
        {...rest}
      />

      <AntDesign 
        name="close" 
        size={16} 
        color="gray" 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input_container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: 'gray',
    paddingHorizontal: 8,
    gap: 8,
    backgroundColor: '#fff'
  },
  
  input: {
    padding: 5,
    flex: 1,
  }
});

