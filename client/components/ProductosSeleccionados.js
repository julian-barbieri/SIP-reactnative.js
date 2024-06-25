import React, {useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/Ionicons'

export default function ProductosSeleccionados({ productosSeleccionados, supermercadoId }) {

  // Marcar los productos seleccionados al inicializar el componente
  useEffect(() => {
    const initialCheckedItems = {};
    for (const producto of productosSeleccionados) {
      initialCheckedItems[producto.id] = true;
    }
  }, [productosSeleccionados]);
  

  const navigation = useNavigation();

  const handleSubmit = async (data) => {
      navigation.navigate('Mapa', {
        idSupermercado: supermercadoId,
        productosSeleccionados: productosSeleccionados, 
      });
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={[
                styles.finalizarButton,
                {
                backgroundColor: productosSeleccionados.length > 0 ? 'blue' : 'gray',
                },
            ]}
            onPress={handleSubmit}
            title="Submit"
            disabled={productosSeleccionados.length <= 0}
            >
            <Text style={styles.buttonText}>Finalizar lista</Text>
        </TouchableOpacity>

      {productosSeleccionados.map((producto) => (
        <View style={styles.productoSeleccionado} key={producto.id}>
          {/*<Icon style={styles.productoCruz} name="radio-button-on" size={15} />*/}
          <Text style={styles.productoNombre}>{producto.nombre}</Text>
          <Text style={styles.productoMarca}>{producto.marca}</Text>
          {/* Agregar más detalles del producto seleccionado según tus necesidades */}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    border: 1
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productoSeleccionado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  productoMarca: {
    fontSize: 16,
    marginLeft: 10,
  },
  finalizarButton: {
    backgroundColor: 'blue', // Color de fondo predeterminado
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Color del texto
  },
  
  // Agregar más estilos según tus necesidades
});
