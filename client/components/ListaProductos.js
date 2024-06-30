// ListaProductos.js
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import axios from "axios";
import ProductosSeleccionados from "../components/ProductosSeleccionados";
import { useNavigation } from '@react-navigation/native';

export default function ListaProductos({ supermercadoId }) {
  const [listaProductos, setListaProductos] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el término de búsqueda
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  
  useEffect(() => {
    axios
      .get(`http://192.168.0.109:3001/productos/bySuper/${supermercadoId}`)
      .then((response) => {
        setListaProductos(response.data);
      })
      .catch((error) => {
        console.error(
          "Error al obtener los datos de los productos del supermercado:",
          error
        );
      });
  }, [supermercadoId]);

  const { width } = Dimensions.get("window"); // Obtener el ancho de la ventana

  const eliminarProductoSeleccionado = (id) => {
    const item = filteredProductos.find((item) => item.id === id);
    setProductosSeleccionados((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== item.id)
    );
  };

  const quitarProductosSinStock = (listaProductos) => {
    const productosSinStock = [];
    listaProductos.map((producto) => {
      if (producto.stock === true) {
        productosSinStock.push(producto);
      }
    });
    return productosSinStock;
  };

  // Filtrar la lista de productos según el término de búsqueda
  const filteredProductos = quitarProductosSinStock(listaProductos).filter(
    (item) =>
      (item.stock === true &&
        item.nombre.toLowerCase().includes(search.toLowerCase())) || // Búsqueda por nombre
      item.marca.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por marca
      item.categoria.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por categoría
      item.subCategoria.toLowerCase().includes(search.toLowerCase()) // Búsqueda por subcategoría
  );

  const productoSeleccionado = (id) => {
    const item = filteredProductos.find((item) => item.id === id);
    // Verificar si el producto ya está en la lista de productos seleccionados
    if (
      !productosSeleccionados.some(
        (selected) => selected.id === item.id
      ) &&
      productosSeleccionados.length <= 4
    ) {
      // Si no está en la lista, agrégalo
      setProductosSeleccionados([
        ...productosSeleccionados,
        item,
      ]);
    }
    if (productosSeleccionados.length > 4) {
      alert("Máximo 5 productos");
    }
  };

  return (
    <View style={styles.container}>
      <ProductosSeleccionados
        productosSeleccionados={productosSeleccionados}
        eliminarProductoSeleccionado={eliminarProductoSeleccionado}
        supermercadoId={supermercadoId}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar productos"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={styles.listaProductos}>
        <FlatList
          numColumns={2}
          data={filteredProductos} // Mostrar la lista filtrada
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.productoItem,
                productosSeleccionados.some(producto => producto.id === item.id) && styles.productoSeleccionado, // Estilo condicional
                ]}
                onPress={() => productoSeleccionado(item.id)}
            >
              <Text style={styles.productoNombre}>{item.nombre}</Text>
              <Text style={styles.productoMarca}>{item.marca}</Text>
              {item.descuento === 0 && (
                <Text style={styles.productoPrecio}>
                  ${item.precioUnidad}
                </Text>
              )}
              {item.descuento > 0 && (
                <>
                  <Text style={styles.productoPrecioDescuento}>
                    ${item.precioUnidad}
                  </Text>
                  <Text style={styles.productoPrecio}>
                    ${(
                      item.precioUnidad * (1 - item.descuento / 100)
                    ).toFixed(2)}
                  </Text>
                </>
              )}
              {item.stock === false && (
                <Text style={styles.stock}>Sin stock</Text>
              )}
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "80%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
  listaProductos: {
    marginRight: 10,
    marginLeft: 10,
    width: "auto",
    height: "auto",
    flex: 1,
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row", // Alinea el icono y el input horizontalmente
    alignItems: "center", // Centra el input verticalmente
    marginBottom: 10,
  },
  input: {
    flex: 1, // Ocupa el espacio restante
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
  },
  productoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    minWidth: 175,
    elevation: 3,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productoPrecio: {
    fontSize: 16,
    color: "#007bff",
  },
  productoMarca: {
    fontSize: 16,
    color: "#555",
  },
  stock: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  productosSeleccionadosContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
  },
  productosSeleccionadosTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productoSeleccionado: {
    borderColor: "#000", // Cambia el color del borde a negro si está seleccionado
    borderWidth: 2,
  },
  productoPrecioDescuento: {
    textDecorationLine: "line-through",
  },
});
