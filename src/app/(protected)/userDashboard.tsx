import { useState } from "react"; 
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { Toast } from "@/components/ui/Toast";
import { ScrollView, Text, View } from "react-native";
import { Table } from "@/components/table/appointments";
import { AppointmentsList } from "@/types/appointmentsList";
import { yearMonthDayOnly } from "@/utils/yearMonthDayOnly";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

import { style } from "./style/userDashboard";
import { Redirect } from "expo-router";

// SIMULAÇÃO DE REQUISIÇÃO JSON DO BACK VIA GET ****(APAGAR DEPOIS)****
const MORINIG_APPOINTMENTS_LIST : AppointmentsList[] = [
  {date: '2026-03-20T15:00:00.000Z', id: 1, hour: '09:00', number: null, userName: 'Leony Leandro Barros'},
  {date: '2026-03-19T15:00:00.000Z', id: 2, hour: '10:00', number: null, userName: 'Marcus Invanir Nunes Culau'},
  {date: '2026-03-19T15:00:00.000Z', id: 3, hour: '11:00', number: null, userName: 'Eberth Matheus Pimenta'},
];

// SIMULAÇÃO DE REQUISIÇÃO JSON DO BACK VIA GET ****(APAGAR DEPOIS)****
const AFTERNOON_APPOINTMENTS_LIST : AppointmentsList[] = [
  {date: '2026-03-19T15:00:00.000Z', id: 4, hour: '13:00', number: null, userName: 'Leony Leandro Barros'},
  {date: '2026-03-19T15:00:00.000Z', id: 5, hour: '14:00', number: null, userName: 'Marcus Invanir Nunes Culau'},
  {date: '2026-03-19T15:00:00.000Z', id: 6, hour: '15:00', number: null, userName: 'Matheus Eberth Pimenta'},
  {date: '2026-03-19T15:00:00.000Z', id: 7, hour: '16:00', number: null, userName: 'Leony Leandro Barros'},
  {date: '2026-03-20T15:00:00.000Z', id: 8, hour: '17:00', number: null, userName: 'Marcus Invanir Nunes Culau'},
  {date: '2026-03-20T15:00:00.000Z', id: 9, hour: '18:00', number: null, userName: 'Matheus Eberth Pimenta'},
];

export default function Index() {

  const { logout, role, username } = useAuth();

  if (role !== "ROLE_STUDENT") {
    return <Redirect href="/(protected)/adminDashboard" />;
  }

  const [modalVisible, setModalVisible] = useState<
  | 'NEW_APPOINTMENT' 
  | 'EDIT_APPOINTMENT' 
  | 'REMOVE_APPOINTMENT_CONFIRM' 
  | null
  >(null);

  const [toastVisible, setToastVisible] = useState<{
    message : string;
    type    : 'success' | 'error';
  } | null>(null);

  const [todayDate, setTodayDate] = useState<string>(yearMonthDayOnly(new Date()));
  const [processing, setProcessing] = useState<boolean>(false);

  const [morningList, setMorningList] = useState<AppointmentsList[]>(MORINIG_APPOINTMENTS_LIST);
  const [afternoonList, setAfternoonList] = useState<AppointmentsList[]>(AFTERNOON_APPOINTMENTS_LIST);

  const [appointmentToBeEdit, setAppointmentToBeEdited] = useState<AppointmentsList | null>(null);
  const [appointmentIdToBeRemoved, setAppointmentIdToBeRemoved] = useState<number | null>(null);

  // Função que só atualiza ao vivo a tabela com novos agendamentos visualmente. 
  // Os dados em sí devem ser inseridos no banco para persistirem.
  const addNewAppointment = (newApp : AppointmentsList) => {
    const hourInt = parseInt(newApp.hour.substring(0, 2));
    
    if (hourInt <= 12) {
      setMorningList(prev => [...prev, newApp]);
    } else {
      setAfternoonList(prev => [...prev, newApp]);
    }
  };

  const editAppointment = (updatedAppointmentData : AppointmentsList) => {
    
    const hourInt = parseInt(updatedAppointmentData.hour.substring(0, 2));
    const isMorning = hourInt <= 12;

    setMorningList(prev => prev.filter(item => item.id !== updatedAppointmentData.id));
    setAfternoonList(prev => prev.filter(item => item.id !== updatedAppointmentData.id));
    
    if (isMorning) {
      setMorningList(prev => [...prev, updatedAppointmentData]);
    } else {
      setAfternoonList(prev => [...prev, updatedAppointmentData]);
    }

    setAppointmentToBeEdited(null);
  };

  const handleRemoveAppointment = async(id : number) => {
    if (processing) return;
    setProcessing(true);

    try {
      // Lógica de remoção no back
      setMorningList(prev => prev.filter(item => item.id !== id));
      setAfternoonList(prev => prev.filter(item => item.id !== id));

      setToastVisible({ message: 'Agendamento removido com sucesso!', type: 'success'});
    } catch (error:any) {
      console.error(error);
      setToastVisible({message: `Houve um erro ao desagendar!: ${error}`, type: 'error'});
    } finally {
      setModalVisible(null);
      setProcessing(false);
    }
  };

  const morningAppointmentsListFilteredByDate : AppointmentsList[] = morningList
    .filter((appointment) => yearMonthDayOnly(appointment.date) === todayDate)
    .sort((a, b) => a.hour.localeCompare(b.hour)); 

  const afternoonAppointmentsListFilteredByDate : AppointmentsList[] = afternoonList
    .filter((appointment) => yearMonthDayOnly(appointment.date) === todayDate)
    .sort((a, b) => a.hour.localeCompare(b.hour));

  return (
    <View style={style.wrapper_container}>

      <Modal.AppointmentForm
        modalVisible={modalVisible === 'NEW_APPOINTMENT'}
        onClose={() => { setModalVisible(null)}}
        onSuccess={{
          updateList : (data) => addNewAppointment(data),
          toast      : () => setToastVisible({message: 'Agendamento realizado com sucesso!', type: 'success'}),
        }}
        onFailure={() => setToastVisible({message: 'Houve um erro ao realizar o agendamento. Tente novamente mais tarde!', type: 'error'})}
        appointments={[
          ...morningAppointmentsListFilteredByDate, 
          ...afternoonAppointmentsListFilteredByDate,
        ]}
      />

      <Modal.AppointmentForm
        modalVisible={modalVisible === 'EDIT_APPOINTMENT' && !!appointmentToBeEdit}
        onClose={() => { setModalVisible(null)}}
        onSuccess={{
          updateList : (data) => editAppointment(data),
          toast      : () => setToastVisible({message: 'Agendamento editado com sucesso!', type: 'success'}),
        }}
        onFailure={() => setToastVisible({message: 'Houve um erro ao editar o agendamento. Tente novamente mais tarde!', type: 'error'})}
        appointments={[
          ...morningAppointmentsListFilteredByDate, 
          ...afternoonAppointmentsListFilteredByDate,
        ]}
        editAppointmentData={appointmentToBeEdit!}
      />

      <Modal.ConfirmAction
        loading={processing}
        message="Tem certeza em desagendar esse atendimento?"
        title="Confirmar desegendamento"
        modalVisible={modalVisible === 'REMOVE_APPOINTMENT_CONFIRM'}
        onClose={() => setModalVisible(null)}
        onConfirm={() => handleRemoveAppointment(appointmentIdToBeRemoved!)}
      />

      <Toast 
        message={toastVisible?.message!} 
        type={toastVisible?.type!}
        visible={!!toastVisible} 
        onClose={() => setToastVisible(null)} 
      />

      <View>
        <View style={style.main_container}>
          <View style={style.header_container}>
            <Text style={style.header_title}>
              Sua Agenda 
            </Text>

            <View style={style.appointments_day_and_new_appointment_container}>
              <Button.WithIcon
                darkTheme
                padding={8}
                gapAdjust={30}
                iconSide="RIGHT"
                textSize="MD"
                title="Novo"
                iconFamily={AntDesign}
                iconName="plus"
                onPress={() => setModalVisible('NEW_APPOINTMENT')}
              />

              <Input.CalendarDate 
                darkTheme
                onChange={(date) => {
                  console.log(date);
                  setTodayDate(yearMonthDayOnly(date));
                }}
              />

              <Button.WithIcon
                iconFamily={Entypo}
                iconName="log-out"
                title="Sair"
                darkTheme
                padding={1}
                onPress={logout}
              />
            </View>
          </View>

          <View style={style.appointments_main_container}>
            <View style={style.appointments_container}>
              <View style={style.appointments_container_header}>
                <View style={style.appointments_period_label_container}>
                  <Feather 
                    name="sunrise" 
                    size={18} 
                    color="#1A5987" 
                  />
                  <Text style={style.text_color}>
                    Manhã
                  </Text>
                </View>

                <View>
                  <Text style={style.text_color}>
                    09h - 12h
                  </Text>
                </View>
              </View>

              <View style={style.appointments_list_table_container}>
                {morningAppointmentsListFilteredByDate.length > 0 ? (
                  <>
                    <Table.Appointments.Header />
                    
                    <ScrollView 
                    style={style.scroll_content_container} 
                    contentContainerStyle={style.scroll_content_items}
                    showsVerticalScrollIndicator={false}
                    >
                      {morningAppointmentsListFilteredByDate.map((item, index) => (                                            
                        <Table.Appointments.Data
                          key={item.id}
                          hour={item.hour}
                          userName={item.userName}
                          number={item.number}
                          lastItem={index !== morningAppointmentsListFilteredByDate.length - 1}
                          onEdit={() => {
                            console.log(`Editando agendamento ${item.id}`);
                            setAppointmentToBeEdited(item);
                            setModalVisible('EDIT_APPOINTMENT');
                          }}
                          onRemove={() => {
                            console.log(`Removendo agendamento ${item.id}`);
                            setAppointmentIdToBeRemoved(item.id);
                            setModalVisible('REMOVE_APPOINTMENT_CONFIRM')
                          }}
                        />                       
                      ))}
                    </ScrollView>
                  </>
                ) : (
                  <Text style={style.no_list_text_color}>
                    Nada marcado para você nesse horário...
                  </Text>
                )}
              </View>
            </View>

            <View style={style.appointments_container}>
              <View style={style.appointments_container_header}>
                <View style={style.appointments_period_label_container}>
                  <FontAwesome5 
                    name="cloud-sun"
                    size={18} 
                    color="#1A5987" 
                  />
                  <Text style={style.text_color}>
                    Tarde
                  </Text>
                </View>

                <View>
                  <Text style={style.text_color}>
                    13h - 18h
                  </Text>
                </View>
              </View>

              <View style={style.appointments_list_table_container}>
                {afternoonAppointmentsListFilteredByDate.length > 0 ? (
                  <>
                    <Table.Appointments.Header />

                    <ScrollView 
                    style={style.scroll_content_container} 
                    contentContainerStyle={style.scroll_content_items}
                    showsVerticalScrollIndicator={false}
                    >
                      {afternoonAppointmentsListFilteredByDate.map((item, index) => (
                        <Table.Appointments.Data
                          key={item.id}
                          hour={item.hour}
                          userName={item.userName}
                          number={item.number}
                          lastItem={index !== afternoonAppointmentsListFilteredByDate.length - 1}
                          onEdit={() => {
                            console.log(`Editando agendamento ${item.id}`);
                            setAppointmentToBeEdited(item);
                            setModalVisible('EDIT_APPOINTMENT');
                          }}
                          onRemove={() => {
                            console.log(`Removendo agendamento ${item.id}`);
                            setAppointmentIdToBeRemoved(item.id);
                            setModalVisible('REMOVE_APPOINTMENT_CONFIRM');
                          }}
                        />                     
                      ))}
                    </ScrollView>
                  </>              
                ) : (
                  <Text style={style.no_list_text_color}>
                    Nada marcado para você nesse horário...
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}


