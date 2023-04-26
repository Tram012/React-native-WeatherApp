import React,{useState} from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import WeatherApp from './src';


export default function App() {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setIsScrolling(y > 0);
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar
        backgroundColor="#b5b5b5"
        barStyle={isScrolling ? "dark-content" : "light-content"}
      />
        <ScrollView onScroll={handleScroll}>
        <WeatherApp />
        </ScrollView>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
