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
  darkTheme = false,
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
          <Text style={{ color: '#c0c0c0', fontWeight: 'bold' }}>
            { label }
          </Text>
        }

        <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.input, 
          { padding, 
            borderRadius, 
            borderColor: darkTheme ? '#3E3C41' : '#1A5987'        
          }
        ]} 
        onPress={() => setShowModal(true)}
        >
          <Entypo 
            name="calendar" 
            size={18} 
            color="#1A5987" 
          />

          <Text style={[
            styles.text, 
            darkTheme && { color: '#c0c0c0' }
          ]}>
            {inputValue ? yearMonthDayOnly(inputValue, true) : date.toLocaleDateString('pt-BR')}
          </Text>

          <Entypo 
            name="chevron-down" 
            size={18} 
            color={darkTheme ? '#c0c0c0' : '#1A5987'} 
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
              markedDates={{
                [selectedString]: { 
                  selected: true, 
                  selectedColor: '#1A5987' 
                }
              }}
              theme={{
                backgroundColor: '#1A1A1A',
                calendarBackground: '#1A1A1A',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#1A5987',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#1A5987',
                dayTextColor: '#fff',
                textDisabledColor: '#444',
                monthTextColor: '#fff',
                arrowColor: '#1A5987',
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
    borderWidth: 1.5,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  text: { 
    color: '#1A5987', 
    fontSize: 16 
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  calendarContainer: {
    width: 350,
    borderWidth: 1.5,
    borderColor: '#3E3C41',
    borderRadius: 12,
    overflow: 'hidden',
  }
});