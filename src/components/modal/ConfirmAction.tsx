import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from '../button';

type Props = {
  modalVisible : boolean;
  onClose      : () => void;
  onConfirm    : () => void;
  title        : string;
  message      : string; 
  loading      : boolean;
} 

const ConfirmAction = ({
  modalVisible,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}:Props) => {

  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={onClose}
    >
      <View style={style.modal_overlay}>
        <View style={style.modal_content}>
          <Text style={style.modal_title}>
            {title}
          </Text>

          <Text style={style.modal_message}>
            {message}
          </Text>

          <View style={style.buttons_container}>
            <View style={{ flex: 1 }}>
              <Button 
                processing={loading}
                processingLabel='Processando'
                title={'Sim'}
                filled
                fullWidth
                padding={5} 
                onPress={onConfirm}
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <Button 
                title={'Não'}
                darkTheme
                fullWidth
                padding={5}
                onPress={onClose}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modal_content: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#3E3C41',
    gap: 16,
  },

  modal_title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  modal_message: {
    color: '#a7a7a7'  
  },

  buttons_container: {
    flexDirection: 'row',
    gap: 12,
    width: '100%'
  },
});

export default ConfirmAction