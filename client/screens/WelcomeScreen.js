import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";
import ListaProductos from "../components/ListaProductos";
import BackButton from "../components/buttons/BackButton";

export default function WelcomeScreen({ route, navigation }) {
  const { idSupermercado } = route.params;
  const [supermercado, setSupermercado] = useState({});
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/supermercados/superById/${idSupermercado}`)
      .then((response) => {
        setSupermercado(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del supermercado:", error);
      });
  }, [idSupermercado]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
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
    marginTop: 10,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinear el contenido al inicio del eje principal
    width: '100%',
  },
  supermercadoText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 1, // Hacer que el texto ocupe el espacio restante para centrarlo
  },
});
