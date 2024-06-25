import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MapaBotonFinalizar({ idSupermercado }) {
  
    const navigation = useNavigation();
    const handleFinalizar = () => {
        navigation.navigate('Welcome', {
          idSupermercado: idSupermercado,
        });
    };
    
  
    return (
    <TouchableOpacity
        style={styles.finalizarButton}
        onPress={handleFinalizar}
    >
        <Text style={styles.finalizarButtonTexto}>Finalizar recorrido</Text>
   </TouchableOpacity>
  );
}
// Estilos
const styles = StyleSheet.create({
    finalizarButton: {
      border: 1,
      borderRadius: 8,
      padding: 10,
      backgroundColor: 'blue',
      marginTop: 50,
      marginRight: 75,
      marginLeft: 75,
      alignItems: 'center',
    },
    finalizarButtonTexto: {
      color: 'white',
      fontWeight: 'bold',
    }
});