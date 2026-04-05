import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';

type ToastProps = {
  message : string;
  visible : boolean;
  onClose : () => void;
  type?   : 'success' | 'error' | 'info';
};

export function Toast({ message, visible, onClose, type = 'success' }: ToastProps) {
  const translateX = useRef(new Animated.Value(300)).current; 

  useEffect(() => {
    if (visible) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 8,
      }).start();
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateX }] },
        type === 'error' 
          ? styles.error 
        : type === 'success' 
          ? styles.success 
        : styles.info
      ]}
    >
      <View style={styles.content}>
        { type !== 'info' ? (
          <AntDesign 
            name={type === 'success' ? "check" : "exclamation"} 
            size={18} 
            color="white" 
          />
        ) : (
          <Fontisto 
            name="info" 
            size={18} 
            color="white" 
          />
        )}
        <Text style={styles.message}>
          {message}
        </Text>
      </View>

      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <AntDesign name="close" size={16} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 75, 
    right: 20, 
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 200,
    maxWidth: '80%',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 9999, 
  },

  success: { 
    backgroundColor: '#2e7d32' 
  },

  info: { 
    backgroundColor: '#2d60f9' 
  },

  error: { 
    backgroundColor: '#d32f2f' 
  },

  content: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    flex: 1 ,
  },

  message: { 
    color: 'white', 
    fontWeight: '600', 
    fontSize: 14, 
  },

  closeButton: { 
    marginLeft: 10, 
    padding: 4, 
  },
});