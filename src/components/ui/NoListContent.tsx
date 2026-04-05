import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type Props = {
  message: string;
}

const NoListContent = ({
  message
}:Props) => {
  return (
    <View style={style.container}>
      <FontAwesome6 
        name="clipboard-question" 
        size={24} 
        color="gray" 
      />

      <Text style={style.message}>
        { message }
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center', 
  },

  message: {
    color: 'gray',
  },
});

export default NoListContent