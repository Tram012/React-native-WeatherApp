import React, { useState } from 'react';
import { Constants } from 'expo-constants';
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase/compat/app'; // add this line to import firebase package
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import WeatherApp from './src/HomeScreen';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import BottomNav from './src/BottomNav';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyD59lG2Mx98prl86Y5v99408nqGsWCM5mw",
  authDomain: "weather-17d6f.firebaseapp.com",
  projectId: "weather-17d6f",
  storageBucket: "weather-17d6f.appspot.com",
  messagingSenderId: "970291158976",
  appId: "1:970291158976:web:26a409483b4605cb10f225",
  measurementId: "G-N564J914KH"
};

firebase.initializeApp(firebaseConfig); // initialize the app with the config object


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Bottom" component={BottomNav} />
        <Stack.Screen name="Home" component={WeatherApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
