import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { useAuth } from "@/hooks/useAuth";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { style } from './style/adminDashboard';
import { style as userDashBoardStyle } from "./style/userDashboard";

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
