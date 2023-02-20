import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Main from '../screens/Main';
import Signup from '../screens/Signup';
import StepOne from '../screens/SignupFragments/StepOne';
import StepTwo from '../screens/SignupFragments/StepTwo';

import theme from '../theme.config';
import {View, Text} from 'react-native';
import MyId from '../screens/MainFragments/HomeFragments/MyId';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Profile from '../screens/MainFragments/HomeFragments/Profile';
import Consultations from '../screens/MainFragments/HomeFragments/Consultations';
import PatientQueue from '../screens/MainFragments/HomeFragments/PatientQueue';
const {ColorTheme, FontFamily} = theme;

const StackNavigator = () => {
  const {Navigator, Screen, Group} = createNativeStackNavigator();
  const [sessionId, setSessionId] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const back = () => {
    console.log(navigation);
  };

  return (
    <Navigator>
      <Group
        screenOptions={{
          headerShown: false,
          headerBackVisible: false,
        }}>
        <Screen name="Main" component={Main} />
        <Screen name="Login" component={Login} />
        <Screen name="Signup" component={Signup} />
        <Screen
          name="MyId"
          component={MyId}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: ColorTheme.primary,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Icon
                  name="arrow-left"
                  size={20}
                  color={ColorTheme.accent}
                  onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerLeftText}>QR Code</Text>
              </View>
            ),
          })}
        />

        <Screen
          name="Profile"
          component={Profile}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: ColorTheme.primary,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Icon
                  name="arrow-left"
                  size={20}
                  color={ColorTheme.accent}
                  onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerLeftText}>My Profile</Text>
              </View>
            ),
          })}
        />
        <Screen
          name="PatientQueue"
          component={PatientQueue}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: ColorTheme.primary,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Icon
                  name="arrow-left"
                  size={20}
                  color={ColorTheme.accent}
                  onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerLeftText}>Patient Queue</Text>
              </View>
            ),
          })}
        />
        <Screen
          name="Consultations"
          component={Consultations}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: ColorTheme.primary,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Icon
                  name="arrow-left"
                  size={20}
                  color={ColorTheme.accent}
                  onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerLeftText}>Consultations</Text>
              </View>
            ),
          })}
        />
      </Group>
    </Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
  headerRightIcon: {
    marginRight: 20,
  },
  headerLeft: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    color: ColorTheme.background,
    fontFamily: FontFamily.bold,
    fontSize: 20,
    marginLeft: 5,
  },
});

export default StackNavigator;
