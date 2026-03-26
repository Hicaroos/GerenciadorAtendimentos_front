import { StudentAppointmentRequest } from '@/types/appointment/studentAppointmentRequest'
import Entypo from '@expo/vector-icons/Entypo'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from '../button'
import { Input } from '../input'

type Props = {
  modalVisible : boolean;
  onClose?      : () => void;
  onSuccess?    : {
    toast      : () => void;
    updateList : (data: any) => void;
  };
  onFailure?    : () => void;
  appointments? : StudentAppointmentRequest[];
  editAppointmentData?: StudentAppointmentRequest;
} 

const AppointmentForm = ({
  editAppointmentData,
  modalVisible,
  appointments,
  onSuccess,
  onFailure,
  onClose,
}:Props) => {

  const [processing, setProcessing] = useState<boolean>(false);

  const [appointmentId, setAppointmentId] = useState<number | null>(null); 
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const morningHours = ["09:00", "10:00", "11:00", "12:00"];
  const afternoonHours = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const isHourOccupied = (hour: string) => {

  };

  const renderHourButton = (hour: string) => {
    const occupied = isHourOccupied(hour);
    const isSelected = selectedHour === hour;

    return (
      <Button 
        key={hour}
        filled={isSelected}
        padding={6}
        title={hour}
        textSize="SM"
        onPress={() => {}}
      />
    );
  };

  const handleNewAppointment = async() => {
    
  };

  const handleEditAppointment = async(id:number) => {
    
  }

  useEffect(() => {
   
  }, [editAppointmentData, modalVisible]);

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
              {editAppointmentData 
                ? 'Editar agendamento' 
                : 'Agende um atendimento'
              }   
            </Text>
            <Button
              hoverAnimation={false}
              title='X' 
              style={{ backgroundColor: 'transparent', borderWidth: 0 }}
              onPress={onClose}
            />
          </View>
          
          <Input.CalendarDate
            onChange={(date) => setDate(date)}
            inputValue={date}
            darkTheme
            hasLabel
            label={'Data'}
          />

          <View style={{ gap: 8 }}>
            <Text style={{ color: '#5561D7', fontWeight: 'bold' }}>
              Horários
            </Text>

            <View style={{ gap: 8 }}>
              <Text style={{ color: '#5561D7'}}>
                Manhã
              </Text>

              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                {morningHours.map((hour) => renderHourButton(hour))}
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ color: '#5561D7'}}>
                Tarde
              </Text>

              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                {afternoonHours.map((hour) => renderHourButton(hour))}
              </View>
            </View>
          </View>

          <Input.Default.WithIcon
            hasLabel
            value={name}
            label="Nome"
            onChangeText={setName}
          />

          <Input.Default.WithIcon
            iconFamily={Entypo}
            iconName='phone'
            hasLabel
            value={phone}
            label="Número"
            onChangeText={setPhone}
          />
          
          <Button 
            processing={processing}
            processingLabel={editAppointmentData ? 'Editando' : 'Agendando'}
            filled
            title={editAppointmentData ? 'Editar' : 'Agendar'} 
            padding={10} 
            onPress={() => {}}
            unable={!selectedHour || !name || !date || !phone}
            disabled={!selectedHour || !name || !date || !phone}
          />
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  new_appointment_modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  new_appointment_modal_content: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#5561D7',
    gap: 16,
  },

  new_appointment_modal_title: {
    color: '#5561D7',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AppointmentForm