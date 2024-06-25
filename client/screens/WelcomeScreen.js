import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import ListaProductos from '../components/ListaProductos';

export default function WelcomeScreen({ route, navigation }) {
  const { idSupermercado } = route.params;
  const [supermercado, setSupermercado] = useState({});
  const [listaProductos, setListaProductos] = useState([]);
  

  useEffect(() => {
    // Realiza la solicitud de Axios para obtener datos del supermercado
    axios
      .get(`http://localhost:3001/supermercados/superById/${idSupermercado}`)
      .then((response) => {
        setSupermercado(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del supermercado:', error);
      });
  }, [idSupermercado]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/productos/bySuper/${idSupermercado}`)
      .then((response) => {
        setListaProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los productos del supermercado:', error);
      });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.supermercadoText}>
        Supermercado: {supermercado.nombre}
      </Text>
      <ListaProductos supermercadoId={idSupermercado}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f0f0f0',
  },
  supermercadoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Agrega más estilos según tus necesidades
});
