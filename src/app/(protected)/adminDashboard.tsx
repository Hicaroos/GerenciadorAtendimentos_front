import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { AppointmentStatus } from "@/components/card/nextAppointment";
import { Input } from "@/components/input";
import { useAuth } from "@/hooks/useAuth";
import { AppointmentsList } from "@/types/appointmentsList";
import { yearMonthDayOnly } from "@/utils/yearMonthDayOnly";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { style } from './style/adminDashboard';
import { style as userDashBoardStyle } from "./style/userDashboard";

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

  if (role !== "ROLE_TEACHER") {
    return <Redirect href="/(protected)/userDashboard" />;
  }

  const today = new Date().toISOString().split('T')[0];

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

  const DASHBOARD_CARDS_DATA = [
    { title: 'Agendamentos Hoje' , value: '4'     , icon: <MaterialIcons name="calendar-month" size={30} color="turquoise" />},
    { title: 'Próximo Horário'   , value: '16:30' , icon: <MaterialCommunityIcons name="clock-time-nine-outline" size={30} color="orange" />},
    { title: 'Confirmados'       , value: '4'     , icon: <MaterialIcons name="check-circle-outline" size={30} color="#4BC233" />},
    { title: 'Pendentes'         , value: '4'     , icon: <MaterialIcons name="info-outline" size={30} color="#BA1C1C" />},
  ];

  const APPOINTMENTS_DATA = [
    { disciplineName: 'Cálculo I'   , studentName: 'Aline Martins'     , appointmentStartHour: '13:50', appointmentEndHour: '14:00' },
    { disciplineName: 'Cálculo II'  , studentName: 'Reginaldo Pereira' , appointmentStartHour: '14:50', appointmentEndHour: '15:00' },
    { disciplineName: 'Química I'   , studentName: 'Dênis de Castro'   , appointmentStartHour: '15:50', appointmentEndHour: '16:00' },
    { disciplineName: 'Cálculo I'   , studentName: 'Aline Martins'     , appointmentStartHour: '13:50', appointmentEndHour: '14:00' },
    { disciplineName: 'Cálculo II'  , studentName: 'Reginaldo Pereira' , appointmentStartHour: '14:50', appointmentEndHour: '15:00' },
    { disciplineName: 'Química I'   , studentName: 'Dênis de Castro'   , appointmentStartHour: '15:50', appointmentEndHour: '16:00' },
  ];

  const PENDING_SOLICITATIONS_DATA = [
    { disciplineName: 'Cálculo I'   , studentName: 'Aline Martins'     , appointmentStartHour: '13:50', appointmentEndHour: '14:00' },
    { disciplineName: 'Cálculo II'  , studentName: 'Reginaldo Pereira' , appointmentStartHour: '14:50', appointmentEndHour: '15:00' },
    { disciplineName: 'Química I'   , studentName: 'Dênis de Castro'   , appointmentStartHour: '15:50', appointmentEndHour: '16:00' },
    { disciplineName: 'Cálculo I'   , studentName: 'Aline Martins'     , appointmentStartHour: '13:50', appointmentEndHour: '14:00' },
    { disciplineName: 'Cálculo II'  , studentName: 'Reginaldo Pereira' , appointmentStartHour: '14:50', appointmentEndHour: '15:00' },
    { disciplineName: 'Química I'   , studentName: 'Dênis de Castro'   , appointmentStartHour: '15:50', appointmentEndHour: '16:00' },
  ];

  const PROFESSOR_DISCIPLINES = [
    'Calculo I',
    'Calculo II',
    'Calculo III',
    'Português',
  ];

  return (
    <ScrollView style={userDashBoardStyle.wrapper_container}>
      <View style={userDashBoardStyle.header}>
        <View style={userDashBoardStyle.header_container}>
          <Image
            source={require('@/assets/images/academicLogo.svg')}
            style={{ width: 70, height: 70, marginTop: 10, marginLeft: -10 }}
          />

          <Button 
            filled
            title={"Logout"}
            padding={5}       
            textSize="MD"   
            onPress={logout}
          />
        </View>
      </View>

      <View style={userDashBoardStyle.main_container}>
        <View style={userDashBoardStyle.welcome_message_and_search_bar_container}>
          <View style={userDashBoardStyle.welcome_message_container}>
            <Text style={userDashBoardStyle.welcome_text}>
              Seja bem vindo(a), Prof. {username}!
            </Text>

            <Text style={userDashBoardStyle.brief_text}>
              Aqui está o resumo dos seus agendamentos
            </Text>
          </View>

          <View>
            <Input.Search/>         
          </View>
        </View>

        <View style={userDashBoardStyle.dashboard_stats_cards_container}>
          {DASHBOARD_CARDS_DATA.map((item) => (
            <Card.DashboardStatistics
              key={item.title}
              title={item.title}
              value={item.value}
              icon={() => item.icon}
            />
          ))}
        </View>

        <View style={style.peding_solicitations_and_calendar_container}>
          <View style={style.peding_solicitations_container}>
            <View style={style.peding_solicitations_title_and_see_all_solicitaions_button_container}>
              <Text style={style.peding_solicitations_title}>
                Solicitações Pendentes
              </Text>

              <Button
                title="Ver todas"
                padding={8}
                textSize="SM"
                borderRadius={32}
              />  
            </View>

            <FlatList
              data={PENDING_SOLICITATIONS_DATA.slice(0, 4)}
              keyExtractor={(_, index) => String(index)}
              contentContainerStyle={style.peding_solicitations_list}
              renderItem={({ item }) => (
                <Card.PendingSolicitation
                  appointmentEndHour={item.appointmentEndHour}
                  appointmentStartHour={item.appointmentStartHour}
                  disciplineName={item.disciplineName}
                  studentName={item.studentName}
                />
              )}
            />
          </View>

          <View style={userDashBoardStyle.calendar_container}>
            <Calendar
              current={today}
              onDayPress={(day: any) => {}}
              markingType="custom"
              markedDates={{
                [today]: { 
                  selected: true, 
                  selectedColor: '#5561D7',
                },
                [today]: {
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
        </View>

        <View style={style.next_appointments_and_professor_disciplines_container}>
          <View style={userDashBoardStyle.next_appointments_container}>
            <View style={style.next_appointments_title_and_see_all_appoitments_button_container}>
              <Text style={userDashBoardStyle.next_appointments_title}>
                Próximos Agendamentos
              </Text>

              <Button
                title="Ver todas"
                padding={8}
                textSize="SM"
                borderRadius={32}
              />  
            </View>

            <FlatList
              data={APPOINTMENTS_DATA.slice(0, 4)}
              keyExtractor={(_, index) => String(index)}
              contentContainerStyle={style.next_appointments_list}
              renderItem={({ item }) => (                  
                <Card.NextAppointment.FromProfessor
                  appointmentEndHour={item.appointmentEndHour}
                  appointmentStartHour={item.appointmentStartHour}
                  disciplineName={item.disciplineName}
                  studentName={item.studentName}
                  appointmentDate={new Date().toISOString()}
                />
              )}
            />
          </View>

          <View style={style.professor_disciplines_container}>
            <Text style={style.professor_disciplines_title}>
              Minhas Diciplinas
            </Text>
            
            <FlatList
              data={PROFESSOR_DISCIPLINES}
              keyExtractor={(_, index) => String(index)}
              contentContainerStyle={style.professor_disciplines_list}
              renderItem={({ item }) => (
                <View style={style.professor_discipline_container}>
                  <View style={style.professor_discipline_icon_container}>
                    <Text style={style.professor_discipline_icon}>
                      { item.slice(0, 1).toUpperCase() }
                    </Text>
                  </View>

                  <Text style={style.professor_discipline_text}>
                    {item}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
