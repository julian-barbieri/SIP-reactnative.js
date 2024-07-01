import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProductosSeleccionados({
  eliminarProductoSeleccionado,
  productosSeleccionados,
  supermercadoId,
}) {
  // Marcar los productos seleccionados al inicializar el componente
  useEffect(() => {
    const initialCheckedItems = {};
    for (const producto of productosSeleccionados) {
      initialCheckedItems[producto.id] = true;
    }
  }, [productosSeleccionados]);

  const navigation = useNavigation();

  const handleSubmit = async (data) => {
    navigation.navigate("Mapa", {
      idSupermercado: supermercadoId,
      productosSeleccionados: productosSeleccionados,
    });
  };
  return (
    <View style={styles.container}>
      {/* BOTON FINALIZAR LISTA */}
      <Pressable
        style={[
          styles.finalizarButton,
          {
            backgroundColor:
              productosSeleccionados.length > 0 ? "#4169e1" : "gray",
          },
        ]}
        onPress={handleSubmit}
        title="Submit"
        disabled={productosSeleccionados.length <= 0}
      >
        <Text style={styles.buttonText}>Finalizar lista</Text>
      </Pressable>

      {productosSeleccionados.map((producto) => (
        <View style={styles.productoSeleccionado} key={producto.id}>
          {/*Eliminar boton*/}
          <Pressable
            style={styles.eliminarButton}
            onPress={() => eliminarProductoSeleccionado(producto.id)}
          >
            <MaterialIcons style={styles.productoCruz} name="close" size={15} selectable={undefined}/>
          </Pressable>

          {/*Info del producto*/}
          <Text style={styles.productoNombre}>{producto.nombre}</Text>
          <Text style={styles.productoMarca}>{producto.marca}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    border: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productoSeleccionado: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  productoMarca: {
    fontSize: 16,
    marginLeft: 10,
  },
  finalizarButton: {
    backgroundColor: "#4a90e2", // Color de fondo predeterminado
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Color del texto
  },
  productoCruz: {
    color: "#ff6f61", // Color
  },

  // Agregar más estilos según tus necesidades
});
