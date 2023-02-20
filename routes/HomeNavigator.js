import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import theme from '../theme.config';
import BottomNavigator from '../screens/MainFragments/BottomNavigator';
import Home from '../screens/MainFragments/Home';
import Visits from '../screens/MainFragments/Visits';
import Inbox from '../screens/MainFragments/Inbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image} from 'react-native';
import UserService from '../services/UserService';
import TokenService from '../services/TokenService';
import {StackActions} from 'react-navigation';

const {ColorTheme, FontFamily} = theme;
const HomeNavigator = ({logout, toId}) => {
  const {Navigator, Screen} = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Visits') {
              iconName = focused ? 'door-open' : 'door-open';
            } else if (route.name === 'Inbox') {
              iconName = focused ? 'inbox' : 'inbox';
            }

            const color = focused ? ColorTheme.primary : ColorTheme.secondary;
            const size = 14;

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: ColorTheme.primary,
          tabBarInactiveTintColor: ColorTheme.secondary,
          headerShown: false,
        })}>
        <Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerTitle: 'Mabuhay!',
            headerTitleStyle: {
              fontFamily: FontFamily.black,
              color: ColorTheme.background,
            },
            headerLeft: () => (
              <Image
                source={require('../assets/logo/oneid_128x128.png')}
                style={styles.headerLeftImg}
              />
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <Icon
                  name="qrcode"
                  size={20}
                  color={ColorTheme.background}
                  style={styles.headerRightIcon}
                  onPress={toId}
                />
                <Icon
                  name="sign-out-alt"
                  size={20}
                  color={ColorTheme.background}
                  style={styles.headerRightIcon}
                  onPress={logout}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: ColorTheme.primary,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
          }}
        />
        <Screen name="Visits" component={Visits} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: ColorTheme.background,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerLeftImg: {
    width: 36,
    height: 36,
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerRightIcon: {
    marginRight: 20,
  },
});

export default HomeNavigator;
