import { TextInput, View, StyleSheet } from "react-native";
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
        size={16} 
        color="gray" 
      />

      <TextInput 
        placeholder="Buscar"
        style={styles.input}
        {...rest}
      />

      <AntDesign 
        name="close" 
        size={14} 
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
    borderRadius: 10,
    borderColor: '#a6a6a6',
    paddingHorizontal: 8,
    gap: 8,
    backgroundColor: '#fff'
  },
  
  input: {
    padding: 5,
    flex: 1,
    width: 180,
  }
});

