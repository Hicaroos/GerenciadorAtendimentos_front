import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Table } from "@/components/table/appointments";
import { useAuth } from "@/hooks/useAuth";
import { AppointmentsList } from "@/types/appointmentsList";
import { hoursOnly } from "@/utils/hoursOnly";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react"; 
import { Modal } from "@/components/modal";

export default function Index() {

  const { logout, role } = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const MORINIG_APPOINTMENTS_LIST : AppointmentsList[] = [
    {id: 1, hour: '09:00', number: null, userName: 'Leony Leandro Barros'},
    {id: 2, hour: '10:00', number: null, userName: 'Marcus Invanir Nunes Culau'},
    {id: 3, hour: '11:00', number: null, userName: 'Eberth Matheus Pimenta'},
  ];

  const AFTERNOOM_APPOINTMENTS_LIST : AppointmentsList[] = [
    {id: 4, hour: '13:00', number: null, userName: 'Leony Leandro Barros'},
    {id: 5, hour: '14:00', number: null, userName: 'Marcus Invanir Nunes Culau'},
    {id: 6, hour: '15:00', number: null, userName: 'Matheus Eberth Pimenta'},
    {id: 7, hour: '16:00', number: null, userName: 'Leony Leandro Barros'},
    {id: 8, hour: '17:00', number: null, userName: 'Marcus Invanir Nunes Culau'},
    {id: 9, hour: '18:00', number: null, userName: 'Matheus Eberth Pimenta'},
  ];

  return (
    <View style={style.wrapper_container}>

      <Modal.NewAppointment
        modalVisible={modalVisible}
        onClose={() => { setModalVisible(false) }}
        appointments={[
          ...MORINIG_APPOINTMENTS_LIST, 
          ...AFTERNOOM_APPOINTMENTS_LIST,
        ]}
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
                onPress={() => setModalVisible(true)}
              />

              <Input.CalendarDate 
                darkTheme
                onChange={(date) => console.log(date)}
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
                {MORINIG_APPOINTMENTS_LIST.length > 0 ? (
                  <>
                    <Table.Appointments.Header />
                    
                    <ScrollView 
                    style={style.scroll_content_container} 
                    contentContainerStyle={style.scroll_content_items}
                    showsVerticalScrollIndicator={false}
                    >
                      {MORINIG_APPOINTMENTS_LIST.map((item, index) => (
                        
                        <>
                          <Table.Appointments.Data
                            key={item.id}
                            id={item.id}
                            hour={item.hour}
                            userName={item.userName}
                            number={item.number}
                            onEdit={() => {
                              console.log(`Editando agendamento ${item.id}`)
                            }}
                            onRemove={() => {
                              console.log(`Removendo agendamento ${item.id}`)
                            }}
                          />

                          {index !== MORINIG_APPOINTMENTS_LIST.length - 1 &&
                            <View 
                              style={{
                                height: 1, 
                                width: '100%', 
                                backgroundColor: '#635f687a'
                              }}
                            />
                          }
                        </>
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
                {AFTERNOOM_APPOINTMENTS_LIST.length > 0 ? (
                  <>
                    <Table.Appointments.Header />

                    <ScrollView 
                    style={style.scroll_content_container} 
                    contentContainerStyle={style.scroll_content_items}
                    showsVerticalScrollIndicator={false}
                    >
                      {AFTERNOOM_APPOINTMENTS_LIST.map((item, index) => (
                        <>
                          <Table.Appointments.Data
                            key={item.id}
                            id={item.id}
                            hour={item.hour}
                            userName={item.userName}
                            number={item.number}
                            onEdit={() => {
                              console.log(`Editando agendamento ${item.id}`)
                            }}
                            onRemove={() => {
                              console.log(`Removendo agendamento ${item.id}`)
                            }}
                          />

                          {index !== AFTERNOOM_APPOINTMENTS_LIST.length - 1 &&
                            <View 
                              style={{
                                height: 1, 
                                width: '100%', 
                                backgroundColor: '#635f687a'
                              }}
                            />
                          }
                        </>
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

const style = StyleSheet.create({
  wrapper_container: {
    flex: 1,
    backgroundColor: 'black',
  },

  scroll_content_container: {
    maxHeight: 100,
  },

  scroll_content_items: {
    gap: 8,
  },

  main_container: {
    padding: 20,
    width: '100%',
    gap: 24,
    alignSelf: 'center',
    backgroundColor: 'black',
    maxWidth: 1080,
  },

  header_title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
  },
  
  header_container: {
    flexDirection  : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
  },
  
  appointments_day_and_new_appointment_container: {
    flexDirection: 'row',
    gap: 8,
  },

  appointments_main_container: {
    gap: 16,
  },

  appointments_container: {
    borderWidth: 1.5,
    borderColor: '#3E3C41',
    borderRadius: 8,
  },

  appointments_period_label_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  appointments_container_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#3E3C41',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },

  text_color: {
    color: '#9c97a4'
  },

  no_list_text_color: {
    color: '#635f68',
  },

  appointments_list_table_container: {
    paddingVertical: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    gap: 10,
  },

  appointments_list_table_row: {
    flexDirection: 'row',
  },
});


 {/* <Button   
          title="Sair" 
          onPress={logout} 
        /> */}