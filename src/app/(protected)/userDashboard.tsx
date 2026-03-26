import { useAuth } from "@/hooks/useAuth";
import { yearMonthDayOnly } from "@/utils/yearMonthDayOnly";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Modal } from "@/components/modal";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { AppointmentStatus } from "@/components/card/nextAppointment";
import { Input } from "@/components/input";
import { Redirect } from "expo-router";
import { Calendar } from "react-native-calendars";
import { style } from "./style/userDashboard";


export default function Index() {

  const { logout, role, username } = useAuth();

  if (role !== "ROLE_STUDENT") {
    return <Redirect href="/(protected)/adminDashboard" />;
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

  const handleRemoveAppointment = async(id : number) => {
    if (processing) return;
    setProcessing(true);

  };

  const DASHBOARD_CARDS_DATA = [
    { title: 'Agendamentos Hoje' , value: '4'     , icon: <MaterialIcons name="calendar-month" size={30} color="turquoise" />},
    { title: 'Próximo Horário'   , value: '16:30' , icon: <MaterialCommunityIcons name="clock-time-nine-outline" size={30} color="orange" />},
    { title: 'Confirmados'       , value: '4'     , icon: <MaterialIcons name="check-circle-outline" size={30} color="#4BC233" />},
    { title: 'Pendentes'         , value: '4'     , icon: <MaterialIcons name="info-outline" size={30} color="#BA1C1C" />},
  ];

  const APPOINTMENTS_DATA = [
    { disciplineName: 'Cálculo I'   , disciplineProfessor: 'Aline Martins'     , appointmentStartHour: '13:50', appointmentEndHour: '14:00', appointmentStatus: 'CONFIRMED' },
    { disciplineName: 'Cálculo II'  , disciplineProfessor: 'Reginaldo Pereira' , appointmentStartHour: '14:50', appointmentEndHour: '15:00', appointmentStatus: 'PENDING' },
    { disciplineName: 'Química I'   , disciplineProfessor: 'Dênis de Castro'   , appointmentStartHour: '15:50', appointmentEndHour: '16:00', appointmentStatus: 'CONFIRMED' },
    { disciplineName: 'Cálculo I'   , disciplineProfessor: 'Aline Martins'     , appointmentStartHour: '13:50', appointmentEndHour: '14:00', appointmentStatus: 'CONFIRMED' },
    { disciplineName: 'Cálculo II'  , disciplineProfessor: 'Reginaldo Pereira' , appointmentStartHour: '14:50', appointmentEndHour: '15:00', appointmentStatus: 'PENDING' },
    { disciplineName: 'Química I'   , disciplineProfessor: 'Dênis de Castro'   , appointmentStartHour: '15:50', appointmentEndHour: '16:00', appointmentStatus: 'CONFIRMED' },
  ];

  return (
    <>
    <Modal.AppointmentForm
      modalVisible={modalVisible === 'NEW_APPOINTMENT'}
      onClose={() => setModalVisible(null)}
    />

    <ScrollView style={style.wrapper_container}>

      <View style={style.header}>
        <View style={style.header_container}>
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

      <View style={style.main_container}>
        <View style={style.welcome_message_and_search_bar_container}>
          <View style={style.welcome_message_container}>
            <Text style={style.welcome_text}>
              Seja bem vindo(a), {username}!
            </Text>

            <Text style={style.brief_text}>
              Aqui está o resumo dos seus agendamentos
            </Text>
          </View>

          <View>
            <Input.Search/>         
          </View>
        </View>

        <View style={style.dashboard_stats_cards_container}>
          {DASHBOARD_CARDS_DATA.map((item) => (
            <Card.DashboardStatistics
              key={item.title}
              title={item.title}
              value={item.value}
              icon={() => item.icon}
            />
          ))}
        </View>

        <View style={style.next_appointments_and_calendar_container}>
          <View style={style.next_appointments_container}>
            <View style={style.next_appointments_title_and_new_appointment_button_container}>
              <Text style={style.next_appointments_title}>
                Próximos Agendamentos
              </Text>

              <Button.WithIcon
                title="Novo Agendamento"
                iconFamily={AntDesign}
                iconName={'plus-circle'}
                iconSide={'RIGHT'}
                padding={8}
                textSize="SM"
                borderRadius={32}
                onPress={() => setModalVisible('NEW_APPOINTMENT')}
              />  
            </View>

            <FlatList
              data={APPOINTMENTS_DATA}
              keyExtractor={(_, index) => String(index)}
              contentContainerStyle={style.next_appointments_list}
              renderItem={({ item }) => (
                <Card.NextAppointment.FromStudent 
                  appointmentEndHour={item.appointmentEndHour}
                  appointmentStartHour={item.appointmentStartHour}
                  appointmentStatus={item.appointmentStatus as AppointmentStatus}
                  disciplineName={item.disciplineName}
                  disciplineProfessor={item.disciplineProfessor}
                />
              )}
            />
          </View>

          <View style={style.calendar_container}>
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
      </View>

    </ScrollView>
    </>
  );
}


