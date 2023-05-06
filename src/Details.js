import * as React from 'react';
import { Button, Linking } from 'react-native';


const Details = ({navigation}) => {
    Linking.openURL('https://openweathermap.org/');
  }
  
  <Button title="See 16 days Weather forecast" onPress={Details} />

  export default Details;
