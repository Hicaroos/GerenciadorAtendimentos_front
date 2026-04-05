import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { AppointmentStatus } from '.';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { yearMonthDayOnly } from '@/utils/yearMonthDayOnly';

type Props = {
  appointmentId        : number;
  disciplineName       : string;
  disciplineProfessor  : string;
  appointmentStartHour : string;
  appointmentDay        : string;
  appointmentEndHour   : string;
  appointmentStatus    : AppointmentStatus;
  canEdit?             : boolean;
  canCancel?           : boolean;
  onEdit?              : (appointmentId: number) => void;
  onCancel?            : (appointmentId: number) => void;
};

const FromStudent = ({
  appointmentId,
  disciplineName,
  disciplineProfessor,
  appointmentStartHour,
  appointmentDay,
  appointmentEndHour,
  appointmentStatus,
  canEdit = false,
  canCancel = false,
  onEdit,
  onCancel,
}:Props) => {

  const APPOINTMENT_STATUS_MAP: Record<AppointmentStatus, string> = {
    PENDING   : 'Pendente',
    CONFIRMED : 'Confirmado',
    DENIED    : "Recusado",
    CANCELLED : "Cancelado",
  };

  return (
    <View style={style.outter_container}>
      <View style={style.inner_left_container}>
        <View style={style.left_container_from_inner_left_container}>
          <View style={style.discipline_icon_container}>
            <Text style={style.discipline_icon}>
              { disciplineName.slice(0, 1).toUpperCase() }
            </Text>
          </View>

          <View style={style.discipline_name_and_its_professor_name_container}>
            <Text style={style.discipline_name}>
              { disciplineName }
            </Text>

            <Text style={style.discipline_professor_name}>
              Prof. { disciplineProfessor }
            </Text>
          </View>
        </View>

        <View style={style.right_container_from_inner_left_container}>
          <View style={style.appointment_hour_container}>

            <View style={{ gap: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons 
                  name="calendar-month" 
                  size={16} 
                  color="gray" 
                />

                <Text style={style.appointment_hour}>
                  { yearMonthDayOnly(appointmentDay, true) }
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialCommunityIcons 
                  name="clock-time-nine-outline" 
                  size={16} 
                  color="gray" 
                />
                <Text style={style.appointment_hour}>
                  { appointmentStartHour } - { appointmentEndHour }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={style.inner_right_container}>
        <View style={[
          style.appointment_status_tag,
          appointmentStatus === 'CONFIRMED' ? style.confirmed_tag : undefined,
          appointmentStatus === 'PENDING' ? style.peding_tag : undefined,
          appointmentStatus === 'DENIED' ? style.denied_tag : undefined,
          appointmentStatus === 'CANCELLED' ? style.cancelled_tag : undefined,
        ]}>
          <Text style={[
            style.appointment_status_tag_text,
            appointmentStatus === 'CONFIRMED' ? style.confirmed_tag_text : undefined,
            appointmentStatus === 'PENDING' ? style.peding_tag_text : undefined,
            appointmentStatus === 'DENIED' ? style.denied_tag_text : undefined,
            appointmentStatus === 'CANCELLED' ? style.cancelled_tag_text : undefined,
          ]}>
            { APPOINTMENT_STATUS_MAP[appointmentStatus] }
          </Text>
        </View>

        { (appointmentStatus === 'CONFIRMED' || appointmentStatus === 'PENDING') &&
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
            disabled={!canEdit}
            onPress={() => onEdit?.(appointmentId)}
            style={{ opacity: canEdit ? 1 : 0.4 }}
            >
              <Octicons 
                name="pencil" 
                size={18} 
                color="#5E6BEF" 
              />
            </TouchableOpacity>

            <TouchableOpacity
            disabled={!canCancel}
            onPress={() => onCancel?.(appointmentId)}
            style={{ opacity: canCancel ? 1 : 0.4 }}
            >
              <FontAwesome 
                name="trash-o" 
                size={18} 
                color="#5E6BEF" 
              />
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  outter_container: {
    flexDirection: 'row',
  },

  inner_left_container: {
    flex: 2,
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
    fontSize: 16
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
    gap: 4,
    marginBottom: 2,
  },

  appointment_hour: {
    color: 'gray',
    fontWeight: 500,
  },

  appointment_status_tag: { 
    paddingHorizontal: 30,
    borderRadius: 16,
    paddingVertical: 4,
  },

  appointment_status_tag_text: {
    paddingBottom: 2,
  },

  confirmed_tag: {
    backgroundColor: '#CEEFD0',
  },
  
  confirmed_tag_text: {
    color: 'green',
  },
  
  peding_tag: {
    backgroundColor: '#EFCECE',
  },
  
  peding_tag_text: {
    color: '#AB5E5E',
  },

  denied_tag: {
    backgroundColor: "#f3d5d5",
  },

  denied_tag_text: {
    color: "#9f2f2f",
  },

  cancelled_tag: {
    backgroundColor: "#dddddd",
  },

  cancelled_tag_text: {
    color: "#6f6f6f",
  },
});

export default FromStudent;



