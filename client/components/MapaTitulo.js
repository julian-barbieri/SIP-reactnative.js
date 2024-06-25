import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MapaTitulo({ supermercado }) {
  return (
    <View style={styles.titulos}>
        <View style={styles.subtitulos}>
            <Text style={[styles.entrada]}>Entrada    </Text>
            <Text style={[styles.salida]}>Salida    </Text>
            <Text style={[styles.gondola]}>Gondolas    </Text>
        </View>
        <View>
            <Text style={[styles.camino]}>Encuentra tu producto siguiendo el camino azul</Text>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    titulos: {
        alignItems: 'center',
        marginTop: 10,
        display: 'flex',
      },
    subtitulos: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontWeight: 'bold',
      },
    supermercado: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    salida: {
        color: 'red',
        fontWeight: 'bold',
      },
    entrada: {
        color: 'green',
        fontWeight: 'bold',
      },
      gondola: {
        color: 'orange',
        fontWeight: 'bold',
      },
    camino: {
        color: 'black',
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
    }
});