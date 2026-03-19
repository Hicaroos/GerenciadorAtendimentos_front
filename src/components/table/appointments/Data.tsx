import { hoursOnly } from '@/utils/hoursOnly';
import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AppointmentsList } from '@/types/appointmentsList';

type Props = AppointmentsList & {
  onEdit   : () => void;
  onRemove : () => void;
}

const Data = ({
  hour,
  number,
  userName,
  onEdit,
  onRemove,
}:Props) => {
  return (
    <View style={style.appointments_list_table_row}>
      <Text style={style.appointments_list_table_hour_column}>
        {hour}
      </Text>

      <Text style={style.appointments_list_table_name_column}>
        {userName}
      </Text>

      <Text style={style.appointments_list_table_number_column}>
        {number}
      </Text>

      <View style={style.appointments_list_table_crud_actions_column}>
        <Pressable 
          style={({ pressed, hovered }: any) => [
            style.action_button,
              hovered && style.button_hover,
              pressed && style.button_active
          ]}
          onPress={onEdit}
        >
          {({ hovered }: any) => (
            <MaterialCommunityIcons 
              name="pencil" 
              size={16} 
              color={hovered ? "orange" : "#1A5987"} 
            />
          )}
        </Pressable>

        <Pressable 
          style={({ pressed, hovered }: any) => [
            style.action_button,
            hovered && style.delete_button_hover,
            pressed && style.button_active
          ]}
          onPress={onRemove}
        >
          {({ hovered }: any) => (
            <FontAwesome6 
              name="trash-alt" 
              size={16} 
              color={hovered ? "#ff4d4d" : "#1A5987"} 
            />
          )}
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  appointments_list_table_row: {
    flexDirection: 'row',
  },

  appointments_list_table_hour_column: {
    color: 'white',
    flex: 0.75,
  },
  
  appointments_list_table_name_column: {
    color: '#9c97a4',
    flex: 4,
  },
  
  appointments_list_table_number_column: {
    color: '#9c97a4',
    flex: 4,
  },

  appointments_list_table_crud_actions_column: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    flex: 0.5,
  },

  action_button: {
    borderRadius: 4,
    transitionDuration: '150ms',
  },

  button_hover: {
    backgroundColor: '#1a598722', 
  },

  delete_button_hover: {
    backgroundColor: '#ff4d4d22', 
  },

  button_active: {
    opacity: 0.5,
    transform: [{ scale: 0.9 }], 
  },
});

export default Data