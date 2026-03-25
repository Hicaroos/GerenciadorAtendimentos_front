import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

const NextAppointment = () => {
  return (
    <View style={style.outter_container}>
      <View style={style.inner_left_container}>
        <View style={style.left_container_from_inner_left_container}>
          <View style={style.discipline_icon_container}>
            <Text style={style.discipline_icon}>
              C
            </Text>
          </View>

          <View style={style.discipline_name_and_its_professor_name_container}>
            <Text style={style.discipline_name}>
              Cálculo III
            </Text>

            <Text style={style.discipline_professor_name}>
              Prof. Ana Martins
            </Text>
          </View>
        </View>

        <View style={style.right_container_from_inner_left_container}>
          <View style={style.appointment_hour_container}>
            <MaterialCommunityIcons 
              name="clock-time-nine-outline" 
              size={16} 
              color="gray" 
            />

            <Text style={style.appointment_hour}>
              14:30 - 15:00
            </Text>
          </View>
        </View>
      </View>

      <View style={style.inner_right_container}>
        <View style={style.appointment_status_tag}>
          <Text style={style.appointment_status_tag_text}>
            Confirmado
          </Text>
        </View>

        <TouchableOpacity style={style.edit_button}>
          <Octicons 
            name="pencil" 
            size={18} 
            color="#5E6BEF" 
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  outter_container: {
    flexDirection: 'row',
  },

  inner_left_container: {
    flex: 1,
    flexDirection: 'row',
  },
  
  inner_right_container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
  },

  left_container_from_inner_left_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },

  right_container_from_inner_left_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },

  discipline_icon_container: {  
    width: 47,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A4ABF0',
    borderRadius: 8,
  },

  discipline_icon: {
    color:  '#5E6BEF',
    fontWeight: 'bold',
    fontSize: 18
  },

  discipline_name_and_its_professor_name_container: {
    flex: 2,
  },

  discipline_name: {
    fontWeight: 500,
    fontSize: 18,
  },

  discipline_professor_name: {
    color: 'gray',
  },

  appointment_hour_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    marginBottom: 2,
  },

  appointment_hour: {
    color: 'gray',
    fontWeight: 500,
  },

  appointment_status_tag: {
    backgroundColor: '#CEEFD0',
    paddingHorizontal: 30,
    borderRadius: 16,
    paddingVertical: 4,
  },

  appointment_status_tag_text: {
    color: 'green',
    paddingBottom: 2,
  },

  edit_button: {

  },
});

export default NextAppointment

