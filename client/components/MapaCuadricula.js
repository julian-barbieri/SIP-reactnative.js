import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ubicGondolaSeleccionada from "./PathFinding.js/ubicGondolaSeleccionada";
import encontrarCamino from "./PathFinding.js/encontrarCamino";

export default function MapaCuadricula({
  numAncho,
  numLargo,
  entradax,
  entraday,
  salidax,
  saliday,
  gondolas,
  productosSeleccionados,
}) {
  const [grid, setGrid] = useState([]);

  // Inicializa tu cuadrícula con celdas libres
  useEffect(() => {
    const initialGrid = Array(numLargo)
      .fill()
      .map(() => Array(numAncho).fill({ occupied: false }));
    setGrid(initialGrid);

    // Marca las celdas ocupadas por góndolas según tu base de datos
    gondolas.forEach((gondola) => {
      for (
        let row = gondola.ubicaciony;
        row < gondola.ubicaciony + gondola.largo;
        row++
      ) {
        for (
          let col = gondola.ubicacionx;
          col < gondola.ubicacionx + gondola.ancho;
          col++
        ) {
          initialGrid[row][col] = { occupied: true };
        }
      }
    });

    setGrid(initialGrid);
  }, [numLargo, numAncho, gondolas]);

  function calculateCirclePosition(ubicExacta) {
    const circleStyle = {
      position: "absolute",
      width: 15,
      height: 15,
      borderRadius: 7.5,
      backgroundColor: "#4a90e2", // Azul suave
      alignItems: "center",
      justifyContent: "center",
    };

    switch (ubicExacta) {
      case "derecha":
        circleStyle.right = 0;
        circleStyle.top = 7.5;
        break;
      case "izquierda":
        circleStyle.left = 0;
        circleStyle.top = 7.5;
        break;
      case "arriba":
        circleStyle.top = 0;
        circleStyle.right = 7.5;
        break;
      case "abajo":
        circleStyle.bottom = 0;
        circleStyle.right = 7.5;
        break;
    }

    return circleStyle;
  }

  const renderFila = (fila) => {
    const cuadros = [];

    for (let columna = 0; columna < numAncho; columna++) {
      const esEntrada = fila === entraday && columna === entradax;
      const esSalida = fila === saliday && columna === salidax;
      const gondolaOcupada = gondolas.find((gondola) => {
        return (
          fila >= gondola.ubicaciony &&
          fila < gondola.ubicaciony + gondola.largo &&
          columna >= gondola.ubicacionx &&
          columna < gondola.ubicacionx + gondola.ancho
        );
      });

      const estiloCuadro = {
        ...styles.cuadro,
        backgroundColor: esEntrada
          ? "#4caf50" // Verde suave para entrada
          : esSalida
          ? "#cd5c5c" // Rojo suave para salida
          : gondolaOcupada
          ? "#fedb41" // Amarillo suave para góndolas
          : "white",
      };

      cuadros.push(
        <View key={`${fila}-${columna}`} style={estiloCuadro}>
          {camino && camino.some(([x, y]) => x === columna && y === fila) ? (
            <View style={styles.camino}></View>
          ) : null}

          {productosSeleccionados.map((producto) => {
            if (esEntrada) {
              return (
                <View key={producto.id}>
                  <Text style={styles.textES}>E</Text>
                </View>
              );
            }
            if (esSalida) {
              return (
                <View key={producto.id}>
                  <Text style={styles.textES}>S</Text>
                </View>
              );
            }
            if (gondolaOcupada && producto.GondolaId === gondolaOcupada.id) {
              return (
                <View
                  key={producto.id}
                  style={calculateCirclePosition(producto.ubicExacta)}
                >
                  <Text style={styles.numProd}>{gondolaOcupada.id}</Text>
                </View>
              );
            }

            return null;
          })}
        </View>
      );
    }

    return cuadros;
  };

  const renderCuadricula = () => {
    const filas = [];

    for (let fila = 0; fila < numLargo; fila++) {
      filas.push(
        <View key={`fila-${fila}`} style={styles.fila}>
          {renderFila(fila)}
        </View>
      );
    }

    return filas;
  };

  const camino = encontrarCamino(
    entradax,
    entraday,
    ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolax,
    ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolay,
    gondolas,
    numAncho,
    numLargo
  );

  return (
    <View style={styles.containerCuadricula}>
      {productosSeleccionados.map((producto) => (
        <View key={producto.id} style={styles.itemProd}>
          <Text style={styles.prodItem}>
            {producto.GondolaId}: {producto.nombre}
          </Text>
        </View>
      ))}
      <ScrollView style={styles.verticalScroll}>
        <ScrollView horizontal contentContainerStyle={styles.cuadricula}>
          {renderCuadricula()}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCuadricula: {
    alignItems: "center",
    marginTop: 10,
    display: "flex",
  },
  cuadricula: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  verticalScroll: {
    maxHeight: 500,
  },
  fila: {
    flexDirection: "row",
  },
  cuadro: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  textES: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  numProd: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  camino: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4a90e2",
    position: "absolute",
    top: 5,
    left: 5,
  },
  itemProd: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
    width: "90%",
    alignItems: "center",
  },
  prodItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
