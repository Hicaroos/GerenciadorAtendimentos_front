import { useAuth } from "@/hooks/useAuth";
import { appointmentService } from "@/services/appointmentService";
import { availabilityService } from "@/services/availabilityService";
import { yearMonthDayOnly } from "@/utils/yearMonthDayOnly";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useMemo, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Modal } from "@/components/modal";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { AppointmentStatus } from "@/components/card/nextAppointment";
import { Input } from "@/components/input";
import { Redirect } from "expo-router";
import { Calendar } from "react-native-calendars";
import { style } from "./style/userDashboard";
import { AppointmentResponse } from "@/types/appointment";
import { hoursOnly } from "@/utils/hoursOnly";
import { isCancelableStatus, isReSchedulableStatus, toUiAppointmentStatus } from "@/utils/appointmentStatus";
import { getTeacherDisplayName } from "@/utils/appointmentStudent";

type Teacher = { id: number; name: string };


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

  const [todayDate] = useState<string>(yearMonthDayOnly(new Date()));
  const [processing, setProcessing] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  const loadData = async () => {
    try {
      const [myAppointments] = await Promise.all([
        appointmentService.listMyAppointments(),
      ]);
      setAppointments(myAppointments);
    } catch (error: any) {
      setToastVisible({ message: error?.message || "Erro ao carregar dados.", type: "error" });
    }
  };

  const loadTeachers = async () => {
    setLoadingTeachers(true);
    try {
      const allAvailabilities = await availabilityService.listAll();
      const teacherMap = new Map<number, string>();
      allAvailabilities.forEach((a) => {
        if (a.teacherId) {
          teacherMap.set(a.teacherId, a.teacherName || `Professor #${a.teacherId}`);
        }
      });
      setTeachers(Array.from(teacherMap, ([id, name]) => ({ id, name })));
    } catch {
      setTeachers([]);
    } finally {
      setLoadingTeachers(false);
    }
  };

  useEffect(() => {
    loadData();
    loadTeachers();
  }, []);

  const handleRemoveAppointment = async(id : number) => {
    if (processing) return;
    setProcessing(true);
    try {
      const target = appointments.find((item) => item.id === id);
      if (!target || !isCancelableStatus(target.status)) {
        setToastVisible({ message: "Esse agendamento nao pode ser cancelado.", type: "error" });
        return;
      }

      await appointmentService.cancel(id);
      setToastVisible({ message: "Agendamento cancelado com sucesso.", type: "success" });
      await loadData();
    } catch (error: any) {
      setToastVisible({ message: error?.message || "Erro ao cancelar agendamento.", type: "error" });
    } finally {
      setProcessing(false);
    }
  };

  const handleOpenNewAppointmentModal = () => {
    setModalVisible('NEW_APPOINTMENT');
  };

  const handleNewAppointment = async (data: {
    teacherId: number;
    locationId?: number;
    startDateTime: string;
    endDateTime: string;
    meetingReason: string;
  }) => {
    await appointmentService.create({
      professorId: data.teacherId,
      locationId: data.locationId,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      meetingReason: data.meetingReason,
    });

    setToastVisible({ message: "Solicitação enviada com sucesso.", type: "success" });
    setModalVisible(null);
    await loadData();
  };

  const handleRescheduleAppointment = async (id: number) => {
    if (processing) return;
    setProcessing(true);
    try {
      const target = appointments.find((item) => item.id === id);
      if (!target || !isReSchedulableStatus(target.status)) {
        setToastVisible({ message: "Esse agendamento nao pode ser reagendado.", type: "error" });
        return;
      }

      setToastVisible({ message: "Use o modal de agendamento para reagendar.", type: "error" });
    } catch (error: any) {
      setToastVisible({ message: error?.message || "Erro ao reagendar.", type: "error" });
    } finally {
      setProcessing(false);
    }
  };

  const sortedAppointments = useMemo(
    () =>
      [...appointments].sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime(),
      ),
    [appointments],
  );

  const DASHBOARD_CARDS_DATA = [
    { title: 'Agendamentos Hoje' , value: String(sortedAppointments.filter((item) => yearMonthDayOnly(item.startDateTime) === todayDate).length)     , icon: <MaterialIcons name="calendar-month" size={30} color="turquoise" />},
    { title: 'Próximo Horário'   , value: sortedAppointments[0] ? hoursOnly(sortedAppointments[0].startDateTime) : '--:--' , icon: <MaterialCommunityIcons name="clock-time-nine-outline" size={30} color="orange" />},
    { title: 'Confirmados'       , value: String(sortedAppointments.filter((item) => toUiAppointmentStatus(item.status) === "CONFIRMED").length)     , icon: <MaterialIcons name="check-circle-outline" size={30} color="#4BC233" />},
    { title: 'Pendentes'         , value: String(sortedAppointments.filter((item) => toUiAppointmentStatus(item.status) === "PENDING").length)     , icon: <MaterialIcons name="info-outline" size={30} color="#BA1C1C" />},
  ];

  return (
    <>
    <Modal.AppointmentForm
      modalVisible={modalVisible === 'NEW_APPOINTMENT'}
      teachers={teachers}
      loadingTeachers={loadingTeachers}
      onSubmit={handleNewAppointment}
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
                onPress={handleOpenNewAppointmentModal}
              />  
            </View>

            <FlatList
              data={sortedAppointments}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={style.next_appointments_list}
              renderItem={({ item }) => (
                <Card.NextAppointment.FromStudent 
                  appointmentId={item.id}
                  appointmentEndHour={hoursOnly(item.endDateTime)}
                  appointmentStartHour={hoursOnly(item.startDateTime)}
                  appointmentStatus={toUiAppointmentStatus(item.status) as AppointmentStatus}
                  disciplineName={item.subjectName || "Atendimento"}
                  disciplineProfessor={getTeacherDisplayName(item)}
                  canCancel={isCancelableStatus(item.status)}
                  canEdit={isReSchedulableStatus(item.status)}
                  onCancel={handleRemoveAppointment}
                  onEdit={handleRescheduleAppointment}
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
