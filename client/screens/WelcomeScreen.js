// WelcomeScreen.js

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import ListaProductos from "../components/ListaProductos";

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
        console.error("Error al obtener los datos del supermercado:", error);
      });
  }, [idSupermercado]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/productos/bySuper/${idSupermercado}`)
      .then((response) => {
        setListaProductos(response.data);
      })
      .catch((error) => {
        console.error(
          "Error al obtener los datos de los productos del supermercado:",
          error
        );
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.supermercadoText}>
          Supermercado: {supermercado.nombre}
        </Text>
      </View>
      <ListaProductos supermercadoId={idSupermercado} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  supermercadoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
