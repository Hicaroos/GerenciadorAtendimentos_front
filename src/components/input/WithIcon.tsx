import { TextInput, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { styles } from './styles';
import { DefaultInputProps } from ".";
import { useState } from "react";
import { Text } from "react-native";

type Props = DefaultInputProps & {
  iconFamily? : React.ElementType; 
  iconName?   : string; 
}

export function WithIcon({ 
  iconFamily: IconFamily = Feather,
  label, 
  iconName = "user",
  ...rest
}: Props) {

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={{gap: 6}}>
      <Text style={{ color: '#c0c0c0', fontWeight: 'bold' }}>
        {label}
      </Text>

      <View style={[
        styles.input_container_dark, 
        isFocused && { borderColor: '#fff' },
        {
          alignItems: 'center',
          paddingHorizontal: 8,
        } 
      ]}>       
        <IconFamily 
          name={iconName} 
          size={22} 
          color={isFocused ? "#fff" : "#1A5987"} 
        />

        <TextInput          
          {...rest}
          underlineColorAndroid="transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ 
            flex: 1, 
            paddingVertical: 8,
            color: '#b5b5b5',
            outlineStyle: 'none', 
          } as any}
        ></TextInput>
      </View>
    </View>
  )
}

