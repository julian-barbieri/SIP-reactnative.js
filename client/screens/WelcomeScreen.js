import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
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
    justifyContent: "center", // Asegura que el contenido esté centrado verticalmente
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Alinear el texto horizontalmente en el centro
  },
  supermercadoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
