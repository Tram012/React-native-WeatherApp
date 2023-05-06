import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Alert, StatusBar } from 'react-native';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        // login user
        const auth = firebase.auth();
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          password
        );
         // redirect user to home screen
    navigation.navigate('Bottom');
    setEmail('');
    setPassword('');

      } catch (error) {
        Alert.alert("Error", error.message);
        console.error(error);
      }
    };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#b5b5b5" barStyle={"light-content"} />
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.head}>Weather</Text>
      <Text style={styles.head1}>Application</Text>
      <TextInput
        style={styles.email}
        placeholder="Email"
        placeholderTextColor="white"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.pass}
        placeholder="Password"
        placeholderTextColor="white"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.t1}>Don't Have An Account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <View style={styles.signupButton}>
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#1AA7EC',
  },
  logo:{
    position:'relative',
    height:225,
    width:225,
    alignContent:'center',
  },  
  head:{
    marginTop:-20,
    fontSize:30,
    letterSpacing:10,
    color:'yellow',
    fontWeight: 'bold',
    
  },
  head1:{
    fontSize:30,
    marginBottom:20,
    color:'white',
    letterSpacing:10,

  },
  email: {
    fontSize:20,
    width: '80%',
    marginBottom: 10,
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    // backgroundColor:'#63e5ff',
    paddingLeft: 10,
    color: 'white',
    borderRadius: 15,
  },
  pass: {
    fontSize:20,
    width: '80%',
    marginBottom: 10,
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 15,
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    width: 150,
    marginBottom:20,
  },
  loginButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  t1:{
    textAlign: 'center',
    color:'yellow',
    marginTop: 60,
    marginBottom: -20,
    fontWeight: 'bold',
    letterSpacing:1,
  },
  signupButton: {
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    width: 100,
  },
  signupButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',    
  },
});

export default LoginScreen;