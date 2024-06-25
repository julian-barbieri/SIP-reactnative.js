import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ProductosSeleccionados from '../components/ProductosSeleccionados';
//import Icon from 'react-native-vector-icons/Ionicons'

export default function ListaProductos({ supermercadoId }) {
  const [listaProductos, setListaProductos] = useState([]);
  const [search, setSearch] = useState(''); // Estado para el término de búsqueda
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/productos/bySuper/${supermercadoId}`)
      .then((response) => {
        setListaProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los productos del supermercado:', error);
      });
  }, [supermercadoId]);

  const { width } = Dimensions.get('window'); // Obtener el ancho de la ventana

  const eliminarProductoSeleccionado = (id) => {
    const item = filteredProductos.find((item) => item.id === id);
    setProductosSeleccionados((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== item.id)
    );
  };
  
  const quitarProductosSinStock = (listaProductos) => {
    const productosSinStock = [];
    listaProductos.map(producto => {
      if(producto.stock === true){
        productosSinStock.push(producto);
      }
    })
    return productosSinStock;
  }

    // Filtrar la lista de productos según el término de búsqueda
    const filteredProductos = quitarProductosSinStock(listaProductos).filter((item) =>
    item.stock == true && 
    item.nombre.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por nombre
    item.marca.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por marca
    item.categoria.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por categoria
    item.subCategoria.toLowerCase().includes(search.toLowerCase())  // Búsqueda por subCategoria
  );

  const productoSeleccionado = (id) => {
    const item = filteredProductos[id-1];
    // Realiza cualquier otra acción que desees con el elemento seleccionado.
    //setSelectedProduct(item);
    //console.log(selectedProduct.nombre);
    const productoSeleccionado = filteredProductos.find((item) => item.id === id);

    // Verificar si el producto ya está en la lista de productos seleccionados
    if ((!productosSeleccionados.some((selected) => selected.id === productoSeleccionado.id)) && productosSeleccionados.length<=4  ){
      // Si no está en la lista, agrégalo
      setProductosSeleccionados([...productosSeleccionados, productoSeleccionado]);
    }
    if (productosSeleccionados.length>4){
      alert('Máximo 5 producto');
    }
  }
  
  return (
    <View style={styles.container}>
      <ProductosSeleccionados
        productosSeleccionados={productosSeleccionados}
        eliminarProductoSeleccionado={eliminarProductoSeleccionado}
        supermercadoId={supermercadoId}
      />
      <TextInput
        style={styles.input}
        placeholder="Buscar productos"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <View style={styles.listaProductos}>
      <FlatList 
        numColumns={2}
        data={filteredProductos} // Mostrar la lista filtrada
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => 
          <TouchableOpacity
            style={styles.productoItem}
            onPress={() => productoSeleccionado(item.id)}
            >
            {/*<Icon style={styles.productoCruz} onPress={() => eliminarProductoSeleccionado(item.id)} name="close-outline" size={20} color="red" />*/}
            <Text style={styles.productoNombre}>{item.nombre}</Text>
            <Text style={styles.productoMarca}>{item.marca}</Text>
            <Text style={styles.productoPrecio}>${item.precioUnidad}</Text>
            {item.stock === false && (
              <Text style={styles.stock}>Sin stock</Text>
            )}
          </TouchableOpacity>
      }
      />
      </View>
      

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
  listaProductos: {
    marginRight: 10,
    marginLeft: 10,
    width: 'auto',
    height: 'auto',
    flex: 1 
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  productoItem: {
    backgroundColor: '#fedb41',
    padding: 16,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 175,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productoPrecio: {
    fontSize: 16,
  },
  productoMarca: {
    fontSize: 16,
  },
  productoCruz: {
    marginRight: 10,
  },
  stock: {
    color: 'red',
    fontWeight: 'bold',
  },
  productosSeleccionadosContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  productosSeleccionadosTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productoSeleccionado: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
