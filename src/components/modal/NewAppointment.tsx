import React, { useState } from 'react'
import { Modal, StyleSheet, View, Text } from 'react-native'
import { Input } from '../input'
import { Button } from '../button'
import { Alert } from 'react-native'
import { AppointmentsList } from '@/types/appointmentsList'

type Props = {
  modalVisible : boolean;
  onClose: () => void;
  appointments: AppointmentsList[];
} 

const NewAppointment = ({
  modalVisible,
  appointments,
  onClose,
}:Props) => {

  const [date, setDate] = useState('');
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const morningHours = ["09:00", "10:00", "11:00", "12:00"];
  const afternoonHours = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const isHourOccupied = (hour: string) => {
    return appointments.some(appointment => appointment.hour === hour);
  };

  const renderHourButton = (hour: string) => {
    const occupied = isHourOccupied(hour);
    const isSelected = selectedHour === hour;

    return (
      <Button 
        key={hour}
        darkTheme={!isSelected}
        filled={isSelected}
        padding={6}
        title={hour}
        textSize="SM"
        disabled={occupied}
        onPress={() => !occupied && setSelectedHour(hour)}
        unable={occupied}
      />
    );
  };

  const handleAppointment = () => {
    if (!selectedHour || !name || !date) {
      Alert.alert("Erro", "Por favor, preencha a data, nome e escolha um horário.");
      return;
    }

    const formData = {
      date,
      hour: selectedHour,
      userName: name,
      number: phone
    };

    console.log("Dados do Agendamento:", formData);
    
    // try / catch / finally...
    
    onClose(); 
  };

  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={onClose}
    >
      <View style={style.new_appointment_modal_overlay}>
        <View style={style.new_appointment_modal_content}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={style.new_appointment_modal_title}>
              Agende um atendimento
            </Text>
            <button 
            style={{ backgroundColor: 'transparent', borderWidth: 0, color: 'white', fontWeight: 'bold', fontSize: 16 }}
            onClick={onClose}
            >
              X
            </button>
          </View>
          
          <Input.CalendarDate
            onChange={() => {}}
            darkTheme
            hasLabel
            label={'Data'}
          />

          <View style={{ gap: 8 }}>
            <Text style={{ color: '#c0c0c0', fontWeight: 'bold' }}>
              Horários
            </Text>

            <View style={{ gap: 8 }}>
              <Text style={{ color: '#c0c0c0'}}>
                Manhã
              </Text>

              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                {morningHours.map((hour) => renderHourButton(hour))}
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ color: '#c0c0c0'}}>
                Tarde
              </Text>

              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                {afternoonHours.map((hour) => renderHourButton(hour))}
              </View>
            </View>
          </View>

          <Input
            hasLabel
            label="Nome"
          />

          <Input
            hasLabel
            label="Número"
          />
          
          <Button 
            filled
            title="Agendar" 
            onPress={onClose}
            padding={10} 
          />
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  new_appointment_modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  new_appointment_modal_content: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#3E3C41',
    gap: 16,
  },

  new_appointment_modal_title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default NewAppointment