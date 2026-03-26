import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Entypo from '@expo/vector-icons/Entypo';
import { DateInputProps } from '.';
import { yearMonthDayOnly } from '@/utils/yearMonthDayOnly';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export const CalendarDate = ({ 
  padding = 8, 
  borderRadius = 8, 
  hasLabel = false,
  label,
  inputValue,
  onChange,
}:DateInputProps) => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const selectedString = date.toISOString().split('T')[0];

  const handleConfirm = (day: any) => {
    const selectedDate = new Date(day.dateString + 'T12:00:00');
    setDate(selectedDate);
    setShowModal(false);
    
    onChange(selectedDate.toISOString());
  };

  return (
    <View>
      <View style={{ gap: 5 }}>
        {hasLabel &&
          <Text style={{ color: '#5561D7', fontWeight: 'bold' }}>
            { label }
          </Text>
        }

        <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.input, 
          { 
            padding, 
            borderRadius, 
            borderColor: '#5561D7'        
          }
        ]} 
        onPress={() => setShowModal(true)}
        >
          <Entypo 
            name="calendar" 
            size={18} 
            color="#5561D7" 
          />

          <Text style={[
            styles.text, 
          ]}>
            {inputValue ? yearMonthDayOnly(inputValue, true) : date.toLocaleDateString('pt-BR')}
          </Text>

          <Entypo 
            name="chevron-down" 
            size={18} 
            color={'#5561D7'} 
            style={{marginLeft: 'auto'}}
          />
        </TouchableOpacity>
      </View>

      <Modal 
      visible={showModal} 
      transparent 
      animationType="fade"
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowModal(false)}
        >
          <View style={styles.calendarContainer}>
            <Calendar
              current={selectedString}
              onDayPress={(day: any) => handleConfirm(day)}
              markingType="custom"
              markedDates={{
                [selectedString]: { 
                  selected: true, 
                  selectedColor: '#5561D7',
                },
                [selectedString]: {
                  customStyles: {
                    container: {
                      backgroundColor: '#5562d73b', 
                      borderRadius: '50%',
                    },
                    text: {
                      color: '#5561D7',
                      fontWeight: 'bold',
                    },
                  },
                },
              }}
              theme={{
                backgroundColor: '#5561D7',
                calendarBackground: '#fff',
                textSectionTitleColor: '#5561D7',
                selectedDayBackgroundColor: '#5561D7',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#5561D7',
                dayTextColor: '#959595',
                textDisabledColor: '#4444443e',
                monthTextColor: '#5561D7',
                arrowColor: '#5561D7',
                textDayHeaderFontWeight: '500',
                textMonthFontWeight: '700',
                textDayFontWeight: '500',
              }}
            />         
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderColor: '#5561D7',
  },

  text: { 
    color: '#5561D7', 
    fontSize: 16 
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  calendarContainer: {
    width: 350,
    borderWidth: 1.5,
    borderColor: '#5561D7',
    borderRadius: 12,
    overflow: 'hidden',
  }
});