import { AvailabilityResponse } from '@/types/availability'
import { availabilityService } from '@/services/availabilityService'
import { yearMonthDayOnly } from '@/utils/yearMonthDayOnly'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { Button } from '../button'
import { Input } from '../input'

type Teacher = {
  id: number;
  name: string;
};

type SubmitData = {
  teacherId: number;
  locationId?: number;
  startDateTime: string;
  endDateTime: string;
  meetingReason: string;
};

type Props = {
  modalVisible: boolean;
  teachers: Teacher[];
  loadingTeachers?: boolean;
  onClose?: () => void;
  onSubmit?: (data: SubmitData) => Promise<void>;
}

const morningHours = ["09:00", "10:00", "11:00", "12:00"];
const afternoonHours = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const addOneHour = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const AppointmentForm = ({
  modalVisible,
  teachers,
  loadingTeachers,
  onSubmit,
  onClose,
}: Props) => {
  const [processing, setProcessing] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [meetingReason, setMeetingReason] = useState('');

  const [teacherAvailabilities, setTeacherAvailabilities] = useState<AvailabilityResponse[]>([]);

  const selectedDate = yearMonthDayOnly(new Date(date));

  const isHourInAvailability = (hour: string) => {
    const h = `${hour}:00`;
    return teacherAvailabilities.some((a) => h >= a.startTime && h < a.endTime);
  };

  useEffect(() => {
    if (!modalVisible) return;
    setSelectedTeacherId(null);
    setDate(new Date().toISOString());
    setSelectedHour(null);
    setMeetingReason('');
    setTeacherAvailabilities([]);
    setErrorMessage(null);
  }, [modalVisible]);

  useEffect(() => {
    setSelectedHour(null);
    setTeacherAvailabilities([]);
    setErrorMessage(null);

    if (!selectedTeacherId) return;

    const fetchAvailability = async () => {
      setLoadingAvailability(true);
      try {
        const data = await availabilityService.listByTeacher(selectedTeacherId);
        setTeacherAvailabilities(data);
      } catch {
        setTeacherAvailabilities([]);
      } finally {
        setLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [selectedTeacherId]);

  const handleSubmit = async () => {
    if (!onSubmit || !selectedTeacherId || !selectedHour) return;

    setErrorMessage(null);

    const locationId = teacherAvailabilities[0]?.locationId;
    const startDateTime = `${selectedDate}T${selectedHour}:00`;
    const endDateTime = `${selectedDate}T${addOneHour(selectedHour)}:00`;

    setProcessing(true);
    try {
      await onSubmit({
        teacherId: selectedTeacherId,
        locationId: locationId ?? undefined,
        startDateTime,
        endDateTime,
        meetingReason: meetingReason.trim(),
      });
      onClose?.();
    } catch (error: any) {
      setErrorMessage(error?.message || "Erro ao agendar. Tente outro horário.");
    } finally {
      setProcessing(false);
    }
  };

  const renderHourButton = (hour: string) => {
    const available = isHourInAvailability(hour);
    const isSelected = selectedHour === hour;

    return (
      <Button
        key={hour}
        filled={isSelected}
        padding={6}
        title={hour}
        textSize="SM"
        unable={!available}
        onPress={() => available && setSelectedHour(hour)}
      />
    );
  };

  const canSubmit =
    !!selectedTeacherId &&
    !!selectedHour &&
    meetingReason.trim().length >= 5;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Agende um atendimento</Text>
                <Button
                  hoverAnimation={false}
                  title="X"
                  style={{ backgroundColor: 'transparent', borderWidth: 0 }}
                  onPress={onClose}
                />
              </View>

              <View style={{ gap: 8 }}>
                <Text style={{ color: '#5561D7', fontWeight: 'bold' }}>Professor</Text>
                {loadingTeachers ? (
                  <ActivityIndicator color="#5561D7" />
                ) : (
                  <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                    {teachers.map((t) => (
                      <Button
                        key={t.id}
                        filled={selectedTeacherId === t.id}
                        padding={6}
                        title={t.name}
                        textSize="SM"
                        onPress={() => setSelectedTeacherId(t.id)}
                      />
                    ))}
                    {teachers.length === 0 && (
                      <Text style={{ color: '#959595', fontSize: 13 }}>Nenhum professor disponível</Text>
                    )}
                  </View>
                )}
              </View>

              <Input.CalendarDate
                onChange={(d) => setDate(d)}
                inputValue={date}
                darkTheme
                hasLabel
                label="Data"
              />

              <View style={{ gap: 8 }}>
                <Text style={{ color: '#5561D7', fontWeight: 'bold' }}>
                  Horários disponíveis
                </Text>

                {loadingAvailability ? (
                  <ActivityIndicator color="#5561D7" />
                ) : !selectedTeacherId ? (
                  <Text style={{ color: '#959595', fontSize: 13 }}>Selecione um professor primeiro</Text>
                ) : (
                  <>
                    <View style={{ gap: 8 }}>
                      <Text style={{ color: '#5561D7' }}>Manhã</Text>
                      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                        {morningHours.map(renderHourButton)}
                      </View>
                    </View>

                    <View style={{ gap: 8 }}>
                      <Text style={{ color: '#5561D7' }}>Tarde</Text>
                      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                        {afternoonHours.map(renderHourButton)}
                      </View>
                    </View>
                  </>
                )}
              </View>

              <Input.Default.WithIcon
                iconFamily={Entypo}
                iconName='text'
                hasLabel
                value={meetingReason}
                label="Motivo da reunião (mín. 5 caracteres)"
                onChangeText={setMeetingReason}
              />

              {!!errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}

              <Button
                processing={processing}
                processingLabel="Agendando"
                filled
                title="Agendar"
                padding={10}
                onPress={handleSubmit}
                unable={!canSubmit}
                disabled={!canSubmit}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#5561D7',
  },
  title: {
    color: '#5561D7',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fdeaea',
    borderRadius: 8,
    padding: 10,
  },
});

export default AppointmentForm
