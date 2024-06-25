import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header.js';
import RegisterForm from '../components/RegisterForm.js';
import Logo from '../components/Logo.js';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

    return (
        <View style={styles.container}>
          <Logo/>
          <Header title="Registrarse" />
          <RegisterForm />
          
          <TouchableOpacity style={styles.registerLink} onPress={handleLogin}>
            <Text style={styles.linkText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
    );
}
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
      },
      registerLink: {
        marginTop: 10,
      },
      linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
      },
    });
    
