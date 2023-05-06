import React, { useState } from 'react';
import { View, TextInput, StyleSheet , Image, TouchableOpacity, Text, Alert} from 'react-native';
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/firestore";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const db = getFirestore();
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const usersCollection = collection(db, "users");
      const docRef = await setDoc(doc(usersCollection, user.uid), {
        email: email,
        password: password
      });
      console.log(user); // handle response data
      Alert.alert("Success", "Your account has been created successfully.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Weather Application</Text>
      <Image source={require("./assets/logo.png")} style={styles.logo} />
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

      <TouchableOpacity onPress={handleSignup}>
        <View style={styles.SignupButton}>
          <Text style={styles.SignupButtonText}>SIGN UP</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
        <View style={styles.SignupButton1}>
          <Text style={styles.SignupButtonText1}>Go to Login Screen</Text>
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
    backgroundColor: '#353740',
  },
  logo: {
    width: 310,
    height: 300,
    marginBottom: 20,
  },
  head:{
    fontSize:20,
    letterSpacing:5,
    color:'yellow',
    fontWeight: 'bold',
    marginTop:-30,
    marginBottom:40,
  },
  email: {
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
  SignupButton: {

    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 10,
    width: 100,
  },
  SignupButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  SignupButton1: {
    marginTop: 20,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 10,
    width: 150,
  },
  SignupButtonText1: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
});

export default SignupScreen;
