import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ubicGondolaSeleccionada from './PathFinding.js/ubicGondolaSeleccionada';
import encontrarCamino from './PathFinding.js/encontrarCamino';


export default function MapaCuadricula({ numAncho, numLargo, entradax, entraday, salidax, saliday, gondolas, productosSeleccionados }) {
    
  const [grid, setGrid] = useState([]);
  
  // Inicializa tu cuadrícula con celdas libres
  useEffect(() => {
    const initialGrid = Array(numLargo)
      .fill()
      .map(() => Array(numAncho).fill({ occupied: false }));
    setGrid(initialGrid);

    // Marca las celdas ocupadas por góndolas según tu base de datos
    gondolas.forEach((gondola) => {
      for (let row = gondola.ubicaciony; row < gondola.ubicaciony + gondola.largo; row++) {
        for (let col = gondola.ubicacionx; col < gondola.ubicacionx + gondola.ancho; col++) {
          // Marca estas celdas como ocupadas
          initialGrid[row][col] = { occupied: true };
        }
      }
    });

    setGrid(initialGrid);

  }, [numLargo, numAncho, gondolas]);

  function calculateCirclePosition(ubicExacta) {
    const circleStyle = {
      position: 'absolute',
      width: 15, // Tamaño 
      height: 15, // Tamaño
      backgroundColor: 'blue',
      margin: 'auto'
    };
  
    switch (ubicExacta) {
      case 'derecha':
        circleStyle.right = 0; // Coloca el círculo en el lado derecho
        circleStyle.top= 7;        
        break;
      case 'izquierda':
        circleStyle.left = 0; // Coloca el círculo en el lado izquierdo
        circleStyle.top= 7; // Ajusta la posición vertical
        break;
      case 'arriba':
        circleStyle.top = 0; // Coloca el círculo en la parte superior
        circleStyle.right= 7; // Ajusta la posición horizontal
        break;
      case 'abajo':
        circleStyle.top = 14; // Coloca el círculo en la parte inferior
        circleStyle.right= 7; // Ajusta la posición horizontal
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
            //console.log(`Renderizando celda en (${columna}, ${fila})`);
            const estiloCuadro = {
            ...styles.cuadroBlanco,
            textAlign: 'center',
            backgroundColor: 
                esEntrada ? 'green' : 
                esSalida ? 'red' : 
                gondolaOcupada ? 'orange' : 'white',
          };
          if (!gondolaOcupada && !esEntrada && !esSalida && camino && camino.some(([x, y]) => x === columna && y === fila)) {
            if (gondolaOcupada) {
              //console.log(`Intento de atravesar celda ocupada en (${columna}, ${fila})`);
            }
            estiloCuadro.backgroundColor = 'blue'; /// Puedes cambiar este color según tus preferencias
          }
          cuadros.push(
            <View key={`${fila}-${columna}`} style={estiloCuadro}>
              {camino && camino.some(([x, y]) => x === columna && y === fila) ? (
                <View style={styles.camino}></View>
              ) : null}
              
              {productosSeleccionados.map((producto) => {
                if(esSalida){
                  return (
                    <View key={producto.id}> 
                        <Text style={styles.textES} >S</Text>
                    </View>
                  );
                }
                if(esEntrada){
                  return (
                    <View key={producto.id}> 
                        <Text style={styles.textES} >E</Text>
                    </View>
                  );
                }
                if (gondolaOcupada && producto.GondolaId === gondolaOcupada.id)
                  {
                  return (
                    <View key={producto.id}>
                      <View style={calculateCirclePosition(producto.ubicExacta)} > 
                        <Text style={styles.numProd} >{gondolaOcupada.id}</Text>
                      </View>
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
    
      // Función para renderizar la cuadrícula completa
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
      //console.log(`Calculando camino para (${entradax}, ${entraday}) a (${ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolax}, ${ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolay})`);
      const camino = encontrarCamino(
        entradax, 
        entraday, 
        ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolax, 
        ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolay, 
        gondolas,
        numAncho, 
        numLargo);
      //console.log('Camino:', camino);
    return (
      <View style={styles.containerCuadricula}>
        <ScrollView style={styles.verticalScroll}>
        <ScrollView
        horizontal
        contentContainerStyle={styles.cuadricula}
        >
        {renderCuadricula()}
        </ScrollView>
        </ScrollView>
        {productosSeleccionados.map((producto) => (
          <View key={producto.id} style={styles.itemProd}>
            <Text style={styles.prodItem}>{producto.GondolaId}: {producto.nombre}</Text>
          </View>
        ))}
      </View>
    );
}
// Estilos
const styles = StyleSheet.create({
  cuadroCamino: {
    width: 30,
    height: 30,
    backgroundColor: 'yellow', // Color del cuadro en el camino
    borderWidth: 1,
    borderColor: 'black',
    cursor: 'pointer',
  },
  
  textES: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  numProd: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  containerCuadricula: {
    alignItems: 'center',
    marginTop: 10,
    display: 'flex',
  },
  cuadricula: {
    display: 'flex', // Utiliza flexbox para controlar el diseño
    flexDirection: 'column', // Las filas se apilan verticalmente
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    marginTop: 20,
  },
  verticalScroll: {
    maxHeight: 500, // Establece una altura máxima para habilitar el desplazamiento vertical
  },
  fila: {
    flexDirection: 'row', // Los cuadros en una fila se alinean horizontalmente
  },
  textInGondola: {
    color: 'black',
    fontSize: 10,
  },
  cuadroBlanco: {
    width: 30,  // Establece el ancho deseado
    height: 30, // Establece el alto deseado
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    cursor: 'pointer',
  },
});
