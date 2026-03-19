import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, View, Text } from 'react-native'
import { Input } from '../input'
import { Button } from '../button'
import { Alert } from 'react-native'
import { AppointmentsList } from '@/types/appointmentsList'
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  modalVisible : boolean;
  onClose      : () => void;
  onSuccess     : {
    toast      : () => void;
    updateList : (data: any) => void;
  };
  onFailure    : () => void;
  appointments : AppointmentsList[];
  editAppointmentData?: AppointmentsList;
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

  const handleNewAppointment = async() => {
    if (processing) return;
    setProcessing(true);
    
    if (!selectedHour || !name || !date || !phone) {
      Alert.alert("Erro", "Por favor, preencha a data, nome, número e escolha um horário.");
      setProcessing(false);
      return;
    }

    const formData:AppointmentsList = {
      id       : Math.random(), // Seria do próprio banco de dados que geraria, só botei isso pra simular msm
      date,
      hour     : selectedHour,
      userName : name,
      number   : phone
    };

    console.log("Dados do Agendamento:", formData);
    
    try {
      // Simulando POST
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const logic = Math.random() > 0.5; // Simular erro aleatório
          resolve(logic);
        }, 1000); // Simulando delay da requisição
      });

      setSelectedHour(null);
      setName('');
      setPhone('');
      onSuccess.updateList(formData);
      onSuccess.toast();
      onClose();
    } catch (error:any) {
      console.error(error);
      onFailure();
    } finally {
      setProcessing(false);
    }
  };

  const handleEditAppointment = async(id:number) => {
    if (processing) return;
    setProcessing(true);
    
    if (!selectedHour || !name || !date || !phone || !appointmentId) {
      Alert.alert("Erro", "Por favor, preencha a data, nome, número e escolha um horário.");
      setProcessing(false);
      return;
    }

    const formData:AppointmentsList = {
      id       : appointmentId,
      date,
      hour     : selectedHour,
      userName : name,
      number   : phone
    };

    console.log("Dados do Agendamento editado:", formData);
    
    try {
      // Simulando PUT/PATCH
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const logic = Math.random() > 0.5; // Simular erro aleatório
          resolve(logic);
        }, 1000); // Simulando delay da requisição
      });

      setAppointmentId(null);
      setSelectedHour(null);
      setName('');
      setPhone('');
      onSuccess.updateList(formData);
      onSuccess.toast();
      onClose();
    } catch (error:any) {
      console.error(error);
      onFailure();
    } finally {
      setProcessing(false);
    }
  }

  useEffect(() => {
    if (editAppointmentData) {
      setAppointmentId(editAppointmentData.id)
      setName(editAppointmentData.userName);
      setPhone(editAppointmentData.number || '');
      setSelectedHour(editAppointmentData.hour);
      setDate(editAppointmentData.date);
    } else {
      setName('');
      setPhone('');
      setSelectedHour(null);
      setDate(new Date().toISOString());
    }
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
              title='X' 
              darkTheme
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
            onPress={() => {
              if (editAppointmentData) {
                handleEditAppointment(editAppointmentData.id);
              } else {
                handleNewAppointment()
              }
            }}
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

export default AppointmentForm