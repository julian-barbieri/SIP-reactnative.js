import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import Mapa from "../components/Mapa.js";
import MapaBotonFinalizar from "../components/MapaBotonFinalizar.js";
import BackButton from "../components/buttons/BackButton.js";

export default function MapaScreen({ route }) {
  const { idSupermercado, productosSeleccionados } = route.params;
  const [supermercado, setSupermercado] = useState({});

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
      <BackButton />
      <Mapa
        supermercado={supermercado}
        productosSeleccionados={productosSeleccionados}
      />
      <MapaBotonFinalizar idSupermercado={idSupermercado} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "left",
    marginTop: 10,
    width: '100%',
    justifyContent: 'flex-start',
  }
});