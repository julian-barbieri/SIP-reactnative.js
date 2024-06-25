import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';

export default function SuperList() {
    const [listaSuper, setListaSuper] = useState([]);
    const [superCompleto, setSuperCompleto] = useState([]);
    const [supermercado, setSupermercado] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        axios.get(`http://localhost:3001/supermercados`)
            .then((response) => {
                setSuperCompleto(response.data);
                const supermercadosOptions = response.data.map((supermercado) => ({
                    key: supermercado.id,
                    value: `${supermercado.nombre} - ${supermercado.direccion}`,
                }));
                setListaSuper(supermercadosOptions);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de supermercados:', error);
            });
    }, []);



    const handleOnSelect = (selectedOption) => {
        setSupermercado(selectedOption)
        // selectedOption contiene el supermercado seleccionado
        if (supermercado) {
          navigation.navigate('Welcome', {
            idSupermercado: supermercado,
          });
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Seleccioná el supermercado</Text>
            <SelectList 
                data={listaSuper}
                save='key' 
                search={false}
                setSelected={(val) => setSupermercado(val)}
                placeholder='Seleccioná una opción'
                onSelect={handleOnSelect}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
    imageStyle: {
        width: 35,
        height: 24,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 30,
        height: 30,
    },
    inputSearchStyle: {
        height: 30,
        fontSize: 16,
    },
});
