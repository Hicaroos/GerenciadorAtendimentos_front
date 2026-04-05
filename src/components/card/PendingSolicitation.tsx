import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialIcons } from '@expo/vector-icons';
import { yearMonthDayOnly } from '@/utils/yearMonthDayOnly';
type Props = {
  appointmentId        : number;
  disciplineName       : string;
  studentName          : string;
  appointmentStartHour : string;
  appointmentDate      : string;
  appointmentEndHour   : string;
  canManage?           : boolean;
  onCardPress?         : () => void;
  onApprove?           : (appointmentId: number) => void;
  onDeny?              : (appointmentId: number) => void;
};

const PendingSolicitation = ({
  appointmentId,
  disciplineName,
  studentName,
  appointmentStartHour,
  appointmentEndHour,
  appointmentDate,
  canManage = true,
  onCardPress,
  onApprove,
  onDeny,
}:Props) => {
  return (
    <Pressable style={style.outter_container} onPress={() => onCardPress?.()}>
      <View style={style.inner_left_container}>
        <View style={style.left_container_from_inner_left_container}>
          <View style={style.discipline_icon_container}>
            <Text style={style.discipline_icon}>
              { disciplineName.slice(0, 1).toUpperCase() }
            </Text>
          </View>

          <View style={style.discipline_name_and_its_professor_name_container}>
            <Text style={style.discipline_name}>
              { studentName }
            </Text>

            <Text style={style.discipline_professor_name}>
              { disciplineName }
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
                  { yearMonthDayOnly(appointmentDate, true) }
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

        
        <View style={style.appointment_solicitation_accept_or_deny_buttons_container}>
          <TouchableOpacity
            style={[style.accept_solicitation_button, { opacity: canManage ? 1 : 0.4 }]}
            disabled={!canManage}
            onPress={(e) => {
              (e as { stopPropagation?: () => void })?.stopPropagation?.();
              onApprove?.(appointmentId);
            }}
          >
            <AntDesign 
              name="check" 
              size={18} 
              color="#5EAB62" 
            />
          </TouchableOpacity>
            
          <TouchableOpacity
            style={[style.deny_solicitation_button, { opacity: canManage ? 1 : 0.4 }]}
            disabled={!canManage}
            onPress={(e) => {
              (e as { stopPropagation?: () => void })?.stopPropagation?.();
              onDeny?.(appointmentId);
            }}
          >
            <AntDesign 
              name="close" 
              size={18} 
              color="#AB5E5E" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
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
    justifyContent: 'center',
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
    fontSize: 16,
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

  appointment_solicitation_accept_or_deny_buttons_container: {
    flexDirection: 'row',
    gap: 8,
  },

  accept_solicitation_button: {
    backgroundColor: '#CEEFD0',
    padding: 4,
    borderRadius: 8,
  },

  deny_solicitation_button: {
    backgroundColor: '#EFCECE',
    padding: 4,
    borderRadius: 8,
  },
});

export default PendingSolicitation;

