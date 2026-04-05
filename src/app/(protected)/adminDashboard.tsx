import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { useAuth } from "@/hooks/useAuth";
import { appointmentService } from "@/services/appointmentService";
import { availabilityService } from "@/services/availabilityService";
import { reportService } from "@/services/reportService";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Redirect } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { style } from './style/adminDashboard';
import { style as userDashBoardStyle } from "./style/userDashboard";
import { AppointmentResponse } from "@/types/appointment";
import { hoursOnly } from "@/utils/hoursOnly";
import { isApprovableStatus, toUiAppointmentStatus } from "@/utils/appointmentStatus";
import { getStudentDisplayName } from "@/utils/appointmentStudent";
import { yearMonthDayOnly } from "@/utils/yearMonthDayOnly";
import NoListContent from "@/components/ui/NoListContent";
import { Toast } from "@/components/ui/Toast";

export default function Index() {
  const { logout, role, username } = useAuth();

  if (role !== "ROLE_TEACHER") {
    return <Redirect href="/(protected)/userDashboard" />;
  }

  const today = new Date().toISOString().split('T')[0];

  const [toastVisible, setToastVisible] = useState<{
    message : string;
    type    : 'success' | 'error';
  } | null>(null);
  const [pendingAppointments, setPendingAppointments] = useState<AppointmentResponse[]>([]);
  const [approvedAppointments, setApprovedAppointments] = useState<AppointmentResponse[]>([]);
  const [reportCount, setReportCount] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [availabilityModalVisible, setAvailabilityModalVisible] = useState(false);
  const [pendingDetailAppointment, setPendingDetailAppointment] = useState<AppointmentResponse | null>(null);
  const [showAllList, setShowAllList] = useState<{
    solicitations: boolean;
    appoitments: boolean;
  }>({
    solicitations: false, 
    appoitments: false
  });

  const loadData = async () => {
    try {
      const weekStart = yearMonthDayOnly(new Date());
      const [pending, approved, report] = await Promise.all([
        appointmentService.listTeacherPending(),
        appointmentService.listTeacherApproved(),
        reportService.weekly(weekStart).catch(() => ({ items: [] })),
      ]);
      setPendingAppointments(pending);
      setApprovedAppointments(approved);
      setReportCount(report.items?.length || 0);
    } catch (error: any) {
      setToastVisible({ message: error?.message || "Erro ao carregar painel", type: "error" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateAvailability = async (data: {
    startTime: string;
    endTime: string;
  }) => {
    try {
      await availabilityService.create(data);
      setToastVisible({ message: "Disponibilidade cadastrada com sucesso", type: "success" });
      await loadData();
    } catch (error: any) {
      setToastVisible({ message: error?.message || "Erro ao cadastrar disponibilidade", type: "error" });
    }
  };

  const DASHBOARD_CARDS_DATA = useMemo(() => {
    const all = [...pendingAppointments, ...approvedAppointments];
    return [
      { title: 'Agendamentos Hoje' , value: String(all.filter((item) => yearMonthDayOnly(item.startDateTime) === yearMonthDayOnly(new Date())).length)     , icon: <MaterialIcons name="calendar-month" size={30} color="turquoise" />},
      { title: 'Próximo Horário'   , value: all[0] ? hoursOnly(all[0].startDateTime) : '--:--' , icon: <MaterialCommunityIcons name="clock-time-nine-outline" size={30} color="orange" />},
      { title: 'Confirmados'       , value: String(approvedAppointments.length)     , icon: <MaterialIcons name="check-circle-outline" size={30} color="#4BC233" />},
      { title: 'Pendentes'         , value: String(pendingAppointments.length)     , icon: <MaterialIcons name="info-outline" size={30} color="#BA1C1C" />},
    ];
  }, [approvedAppointments, pendingAppointments]);

  const handleApprove = async (id: number) => {
    if (processing) return;
    setProcessing(true);
    try {
      const target = pendingAppointments.find((item) => item.id === id);
      if (!target || !isApprovableStatus(target.status)) {
        setToastVisible({ message: "Solicitacao nao pode ser aprovada", type: "error" });
        return;
      }
      await appointmentService.approve(id);
      setToastVisible({ message: "Solicitacao aprovada", type: "success" });
      setPendingDetailAppointment(null);
      await loadData();
    } catch (error: any) {
      setToastVisible({ message: error?.message || "Erro ao aprovar solicitacao", type: "error" });
    } finally {
      setProcessing(false);
    }
  };

  const handleDeny = async (id: number) => {
    if (processing) return;
    setProcessing(true);
    try {
      const target = pendingAppointments.find((item) => item.id === id);
      if (!target || !isApprovableStatus(target.status)) {
        setToastVisible({ message: "Solicitacao nao pode ser recusada", type: "error" });
        return;
      }
      await appointmentService.deny(id);
      setToastVisible({ message: "Solicitacao recusada", type: "success" });
      setPendingDetailAppointment(null);
      await loadData();
    } catch (error: any) {
      setToastVisible({ message: error?.message || "Erro ao recusar solicitacao", type: "error" });
    } finally {
      setProcessing(false);
    }
  };


  return (
    <>
    <Modal.PendingAppointmentDetail
      modalVisible={!!pendingDetailAppointment}
      appointment={pendingDetailAppointment}
      processing={processing}
      canManage={pendingDetailAppointment ? isApprovableStatus(pendingDetailAppointment.status) : false}
      onClose={() => setPendingDetailAppointment(null)}
      onApprove={handleApprove}
      onDeny={handleDeny}
    />

    <Modal.AvailabilityForm
      modalVisible={availabilityModalVisible}
      onSubmit={handleCreateAvailability}
      onClose={() => setAvailabilityModalVisible(false)}
    />

    <Toast
      message={toastVisible?.message || '[Não foi possível exibir a mensagem]'}
      onClose={() => setToastVisible(null)}
      visible={!!toastVisible}
      type={toastVisible?.type}
    />

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

              { (!showAllList.solicitations && pendingAppointments.length > 0 ) && 
                <Button
                  title="Ver todas"
                  padding={8}
                  textSize="SM"
                  borderRadius={32}
                  onPress={() => setShowAllList(prev => ({...prev, solicitations: true}))}
                />  
              }
            </View>

            <FlatList
              data={showAllList.solicitations ? pendingAppointments : pendingAppointments.slice(0, 4)}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={style.peding_solicitations_list}
              ListEmptyComponent={<NoListContent message="Nenhuma solicitação pendente no momento!" />}
              renderItem={({ item }) => (
                <Card.PendingSolicitation
                  appointmentId={item.id}
                  appointmentEndHour={hoursOnly(item.endDateTime)}
                  appointmentStartHour={hoursOnly(item.startDateTime)}
                  appointmentDate={item.startDateTime}
                  disciplineName={item.subjectName || "Atendimento"}
                  studentName={getStudentDisplayName(item)}
                  onCardPress={() => setPendingDetailAppointment(item)}
                  onApprove={handleApprove}
                  onDeny={handleDeny}
                  canManage={isApprovableStatus(item.status)}
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

              { (!showAllList.appoitments && approvedAppointments.length > 0) &&
                <Button
                  title="Ver todas"
                  padding={8}
                  textSize="SM"
                  borderRadius={32}
                  onPress={() => setShowAllList(prev => ({...prev, appoitments: true}))}
                />  
              }
            </View>

            <FlatList
              data={showAllList.appoitments ? approvedAppointments : approvedAppointments.slice(0, 4)}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={style.next_appointments_list}
              ListEmptyComponent={<NoListContent message="Nenhum agendamento no momento!" />}
              renderItem={({ item }) => (                  
                <Card.NextAppointment.FromProfessor
                  appointmentEndHour={hoursOnly(item.endDateTime)}
                  appointmentStartHour={hoursOnly(item.startDateTime)}
                  disciplineName={item.subjectName || "Atendimento"}
                  studentName={getStudentDisplayName(item)}
                  appointmentDate={item.startDateTime}
                />
              )}
            />
          </View>

          <View style={style.professor_disciplines_container}>
            <View style={style.professor_availibity_container}>
              <Text style={style.professor_availibity_title}>
                Minha Disponibilidade
              </Text>

              <Button.WithIcon
                title="Adicionar"
                fullWidth
                iconFamily={AntDesign}
                iconName="plus"
                iconSide="RIGHT"
                padding={6}
                textSize="SM"
                borderRadius={32}
                onPress={() => setAvailabilityModalVisible(true)}
              />

              <View style={style.professor_reports_container}>
                <Text style={style.professor_reports_label}>
                  Relatórios desta semana:
                </Text>

                <Text style={style.professor_reports_numbers}>
                  { reportCount }
                </Text>
              </View>
            </View>      
          </View>
        </View>
      </View>
    </ScrollView>
    </>
  );
}
