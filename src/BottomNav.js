import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Searchbar } from 'react-native-paper';
import WeatherApp from './HomeScreen';
import Details from './Details';


const SearchRoute = () =>{
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const HomeRoute = () => {
    return(
        <WeatherApp />

    );
};

const DetailsRoute = () => {
  return(
      <Details />
  );
}

const BottomNav = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'search', title: 'Search', focusedIcon: 'card-search-outline'},
    { key: 'home', title: 'Home', focusedIcon: 'home-variant' },
    { key: 'details', title: 'Details', focusedIcon: 'format-list-bulleted' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    search: SearchRoute,
    home: HomeRoute,
    details: DetailsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: 'gray' }}
    />
  );
};

export default BottomNav;