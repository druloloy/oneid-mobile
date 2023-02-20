import {StyleSheet, Text, View} from 'react-native';
import React, {Profiler} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from './HomeFragments/Index';
import MyId from './HomeFragments/MyId';
import {useEffect} from 'react';
import Profile from './HomeFragments/Profile';
const Home = ({navigation, route}) => {
  const {Screen, Group, Navigator} = createStackNavigator();

  return (
    <View style={styles.container}>
      <Navigator
        screenOptions={{
          headerShown: false,
          headerBackVisible: false,
        }}>
        <Screen name="Index" component={Index} />
      </Navigator>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
