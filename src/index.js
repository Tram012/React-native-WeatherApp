import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = '96d12bbd375e7f2c864d417f194efa4e';
const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=Olongapo City&appid=${API_KEY}`;

const WeatherApp = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getCurrentWeather = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}&lat=35&lon=139`);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentWeather();
    const interval = setInterval(() => {
      getCurrentWeather();
    }, 300000); // refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getCurrentWeather();
    setRefreshing(false);
  };

  if (!forecast) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const current = forecast.weather[0];

  const gradientColors = {
    Thunderstorm: ['#2c3e50', '#bdc3c7','white','white'],
    Rain: ['#2c3e50', '#bdc3c7','white','white'],
    Snow: ['#1e3c72', '#bdc3c7','white','white'],
    Clear: ['#2980b9', '#6dd5fa', '#ffffff','white','white'],
    Clouds: ['#757f9a', '#bdc3c7','white','white'],
    Mist: ['#4ca1af', '#c4e0e5','white','white'],
  };

 const bgColors = gradientColors[current.main] || gradientColors.Clear;

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LinearGradient colors={bgColors} style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Weather App
          </Text>
          <View>
          <Text style={styles.loc}>
            YOUR LOCATION
          </Text>
          </View>
            <Image //https://openweathermap.org/img/w/${current.icon}.png
              source={{
                uri: ` https://openweathermap.org/img/wn/${current.icon}.png`,
              }}
              style={styles.icon}
            />
          <View>
            <Text style={styles.feel}>
              {current.description}
            </Text>
            <Text style={styles.temp}>
              {Math.round((forecast.main.temp - 273.15) * 100) / 100}°C
            </Text>
          <View style={styles.b1}>
            <Image source={require('./assets/temp.png')} style={styles.tpic}  />
            <Text style={styles.fl}>              
              {Math.round((forecast.main.feels_like - 273.15) * 100) / 100}°C{"\n"}
              Feels Like 
            </Text>
            
            </View>
          <View style={styles.b2}>
           <Image source={require('./assets/hum.png')} style={styles.hpic}  />
            <Text style={styles.hum}>
              {forecast.main.humidity}%{"\n"}
              Humidity
            </Text>
          </View>
            </View> 
          <View>
          <Text style={styles.hf}>
            HOURLY FORECAST
          </Text>
          </View>          
          {/* <Text style={styles.des}>
            Description: {forecast.weather[0].main}
          </Text> */}
        </View>
        <View>
        <Text style={styles.text_down}>
            Weather Application
          </Text>
        </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

export default WeatherApp;

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    icon:{
      position:'relative',
      marginLeft:30,
      marginTop:40,
      width:200,
      height:150,
    },
    title:{   
      textAlign:'center',   
      marginTop:90,
      color:'white',
      fontSize:36,
      fontWeight:'bold',
      letterSpacing: 2,
      textShadowColor: 'black', 
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 5,
    },
    loc:{
      textAlign:'center',
      marginTop:20,
      color:'black',
      fontSize:25,
      textShadowColor: 'white', 
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 5,
    },
    feel:{
      textAlign:'center',
      marginTop:-30,
      color:'white',     
      fontSize:25,
      letterSpacing: 5,
      textTransform:'uppercase',
      textShadowColor: 'black', 
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 5,
      
    },
    temp:{
      position: 'absolute',
      top: -105,
      right: 40,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 35,
      textTransform: 'uppercase',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
    },
    hf:{
      position:'absolute',
      marginTop:150,
      color:'white',
      fontWeight:'bold',
      fontSize:20,
      letterSpacing:6,
      textTransform:'uppercase',
      textShadowColor: 'black', 
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 5,
    },
    fl:{
      textAlign: 'center',
      color:'black',
      fontSize:15,
      textTransform:'uppercase',
      textShadowColor: 'white', 
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 5,
    }, 
    hum:{
      textAlign: 'center',
      color:'black',
      fontSize:15,
      textTransform:'uppercase',
      textShadowColor: 'white', 
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 5,
    }, 

    b1:{
      position:'absolute',
      marginTop:40,
      marginLeft:30,
      width: 125,
      height: 100,
      backgroundColor: 'lightblue', 
      borderRadius:5
    },
    tpic:{
      marginTop:5,
      marginLeft:40,
      width:50,
      height:50,
    },
    hpic:{
      marginTop:5,
      marginLeft:35,
      width:50,
      height:50,
    },
    b2:{
      position:'absolute',
      marginTop:40,
      marginLeft:210,
      width: 125,
      height: 100,
      backgroundColor: 'lightblue', 
      borderRadius:5
      
    },
    text_down:{
      textAlign:'center',
      marginTop:860,
      fontSize: 20,
      fontWeight: 'bold',      
    },

  })
