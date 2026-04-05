import { AppointmentResponse } from '@/types/appointment'
import { getStudentDisplayName } from '@/utils/appointmentStudent'
import { hoursOnly } from '@/utils/hoursOnly'
import { toUiAppointmentStatus, type UiAppointmentStatus } from '@/utils/appointmentStatus'
import { yearMonthDayOnly } from '@/utils/yearMonthDayOnly'
import AntDesign from '@expo/vector-icons/AntDesign'
import React from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../button'

const statusLabelPt: Record<UiAppointmentStatus, string> = {
  PENDING: 'Pendente',
  CONFIRMED: 'Aprovado',
  DENIED: 'Recusado',
  CANCELLED: 'Cancelado',
};

type Props = {
  modalVisible: boolean;
  appointment: AppointmentResponse | null;
  processing?: boolean;
  canManage?: boolean;
  onClose?: () => void;
  onApprove?: (id: number) => void;
  onDeny?: (id: number) => void;
}

const PendingAppointmentDetail = ({
  modalVisible,
  appointment,
  processing,
  canManage = true,
  onClose,
  onApprove,
  onDeny,
}: Props) => {
  const open = modalVisible && !!appointment;
  const dateLabel = appointment ? yearMonthDayOnly(appointment.startDateTime, true) : '';
  const hourLabel = appointment
    ? `${hoursOnly(appointment.startDateTime)} – ${hoursOnly(appointment.endDateTime)}`
    : '';
  const statusKey = appointment ? toUiAppointmentStatus(appointment.status) : 'PENDING';
  const statusLabel = statusLabelPt[statusKey];

  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {appointment && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Detalhes da solicitação</Text>
                <Button
                  hoverAnimation={false}
                  title="X"
                  style={{ backgroundColor: 'transparent', borderWidth: 0 }}
                  onPress={onClose}
                />
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <View style={styles.row}>
                  <Text style={styles.label}>Aluno</Text>
                  <Text style={styles.value}>{getStudentDisplayName(appointment)}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Assunto</Text>
                  <Text style={styles.value}>{appointment.subjectName || 'Atendimento'}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Data</Text>
                  <Text style={styles.value}>{dateLabel}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Horário</Text>
                  <Text style={styles.value}>{hourLabel}</Text>
                </View>

                {!!appointment.locationName && (
                  <View style={styles.row}>
                    <Text style={styles.label}>Local</Text>
                    <Text style={styles.value}>{appointment.locationName}</Text>
                  </View>
                )}

                <View style={styles.row}>
                  <Text style={styles.label}>Status</Text>
                  <Text style={styles.value}>{statusLabel}</Text>
                </View>

                <View style={styles.reasonBlock}>
                  <Text style={styles.label}>Motivo da reunião</Text>
                  <Text style={styles.reasonText}>
                    {appointment.meetingReason?.trim() || 'Não informado.'}
                  </Text>
                </View>
              </ScrollView>

              {canManage && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.iconBtn, styles.approveBtn, { opacity: canManage ? 1 : 0.4 }]}
                    disabled={!canManage || processing}
                    onPress={() => onApprove?.(appointment.id)}
                  >
                    <AntDesign name="check" size={22} color="#5EAB62" />
                    <Text style={[styles.iconBtnLabel, { color: '#2d6a32' }]}>Aprovar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.iconBtn, styles.denyBtn, { opacity: canManage ? 1 : 0.4 }]}
                    disabled={!canManage || processing}
                    onPress={() => onDeny?.(appointment.id)}
                  >
                    <AntDesign name="close" size={22} color="#AB5E5E" />
                    <Text style={[styles.iconBtnLabel, { color: '#8b3a3a' }]}>Recusar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
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
    maxHeight: '88%',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#5561D7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#5561D7',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scroll: {
    maxHeight: 320,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    color: '#5561D7',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: '#333',
    fontSize: 16,
  },
  reasonBlock: {
    marginTop: 4,
    marginBottom: 8,
  },
  reasonText: {
    color: '#444',
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  iconBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  approveBtn: {
    backgroundColor: '#CEEFD0',
  },
  denyBtn: {
    backgroundColor: '#EFCECE',
  },
  iconBtnLabel: {
    fontWeight: '600',
    fontSize: 15,
  },
});

export default PendingAppointmentDetail
