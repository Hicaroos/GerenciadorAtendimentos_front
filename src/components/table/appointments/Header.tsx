import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'

const Header = () => {
  return (
    <View style={style.appointments_list_table_row}>
      <Text style={style.appointments_list_table_hour_column_label}>
        Horário
      </Text>
      <Text style={style.appointments_list_table_name_column_label}>
        Nome
      </Text>
      <Text style={style.appointments_list_table_number_column_label}>
        Número
      </Text>
      <View style={style.appointments_list_table_crud_actions_column}>

      </View>
    </View>
  )
}

const style = StyleSheet.create({
  appointments_list_table_row: {
    flexDirection: 'row',
  },

  appointments_list_table_hour_column_label: {
    color: 'white',
    fontWeight: 'bold',
    flex: 0.75,
  },

  appointments_list_table_name_column_label: {
    color: 'white',
    fontWeight: 'bold',
    flex: 4,
  },

  appointments_list_table_number_column_label: {
    color: 'white',
    fontWeight: 'bold',
    flex: 4,
  },

  appointments_list_table_crud_actions_column: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    flex: 0.5,
  },
});

export default Header