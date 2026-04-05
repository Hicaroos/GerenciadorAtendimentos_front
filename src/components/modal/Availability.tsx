import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from '../button'

type Props = {
  modalVisible: boolean;
  onClose?: () => void;
  onSubmit?: (data: {
    startTime: string;
    endTime: string;
  }) => Promise<void>;
}

const morningHours = ["09:00", "10:00", "11:00", "12:00"];
const afternoonHours = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const AvailabilityForm = ({
  modalVisible,
  onSubmit,
  onClose,
}: Props) => {
  const [processing, setProcessing] = useState(false);
  const [startHour, setStartHour] = useState<string | null>(null);
  const [endHour, setEndHour] = useState<string | null>(null);

  useEffect(() => {
    if (!modalVisible) return;
    setStartHour(null);
    setEndHour(null);
  }, [modalVisible]);

  const handleHourPress = (hour: string) => {
    if (!startHour || (startHour && endHour)) {
      setStartHour(hour);
      setEndHour(null);
      return;
    }

    if (hour <= startHour) {
      setStartHour(hour);
      setEndHour(null);
      return;
    }

    setEndHour(hour);
  };

  const isInRange = (hour: string) => {
    if (!startHour) return false;
    if (!endHour) return hour === startHour;
    return hour >= startHour && hour <= endHour;
  };

  const handleSubmit = async () => {
    if (!onSubmit || !startHour || !endHour) return;

    setProcessing(true);
    try {
      await onSubmit({ startTime: `${startHour}:00`, endTime: `${endHour}:00` });
      onClose?.();
    } finally {
      setProcessing(false);
    }
  };

  const renderHourButton = (hour: string) => (
    <Button
      key={hour}
      filled={isInRange(hour)}
      padding={6}
      title={hour}
      textSize="SM"
      onPress={() => handleHourPress(hour)}
    />
  );

  const canSubmit = !!startHour && !!endHour;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>Definir Disponibilidade</Text>
            <Button
              hoverAnimation={false}
              title="X"
              style={{ backgroundColor: 'transparent', borderWidth: 0 }}
              onPress={onClose}
            />
          </View>

          <View style={{ gap: 8 }}>
            <Text style={{ color: '#5561D7', fontWeight: 'bold' }}>
              Horários (selecione início e fim)
            </Text>

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

            {startHour && (
              <Text style={{ color: '#656565', fontSize: 12 }}>
                {endHour
                  ? `Intervalo: ${startHour} — ${endHour}`
                  : `Início: ${startHour} (selecione o fim)`}
              </Text>
            )}
          </View>

          <Button
            processing={processing}
            processingLabel="Salvando"
            filled
            title="Salvar Disponibilidade"
            padding={10}
            onPress={handleSubmit}
            unable={!canSubmit}
            disabled={!canSubmit}
          />
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
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#5561D7',
    gap: 16,
  },
  title: {
    color: '#5561D7',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AvailabilityForm
