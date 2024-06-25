import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapaListaGondolas({ gondolas }) {
  return (
    <View style={styles.listaGondolas}>
    {gondolas.map((gondola) => (
      <View key={gondola.id} style={styles.item}>
        <Text style={styles.gondolaItem}>{gondola.id}: {gondola.categoria}</Text>
      </View>
    ))}
  </View>
  );
}
// Estilos

const styles = StyleSheet.create({
    listaGondolas:{
      alignItems: 'center',
      marginTop: 10,
      display: 'flex',
    },
    gondolaItem: {
      color: 'blue',  
    },
});