import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../theme.config';
import StepOne from './SignupFragments/StepOne';
import StepFour from './SignupFragments/StepFour';
import StepTwo from './SignupFragments/StepTwo';
import StepThree from './SignupFragments/StepThree';
import Disclaimer from './SignupFragments/Disclaimer';
import UserService from '../services/UserService';
import {StackActions} from 'react-navigation';
const {ColorTheme, FontFamily} = theme;
const {createNativeStackNavigator} = require('@react-navigation/native-stack');

const Signup = ({navigation, route}) => {
  const {Navigator, Screen, Group} = createNativeStackNavigator();
  const {params} = route;
  useEffect(() => {
    if (params?.redirectTo) {
      console.log('Redirecting to ' + params.redirectTo);
      navigation.replace(params.redirectTo);
    }
  }, []);

  const [stepCircles, setStepCircles] = useState([
    {active: false, completed: false, step: 1},
    {active: false, completed: false, step: 2},
    {active: false, completed: false, step: 3},
    {active: false, completed: false, step: 4},
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="user" size={24} color={ColorTheme.accent} solid={true} />
      </View>
      <Text style={styles.title}>Create a new account</Text>
      <View style={styles.stepsProgressContainer}>
        {stepCircles.map((item, index) => (
          <View
            key={index}
            style={[
              styles.stepCircle,
              item.active ? styles.activeStepCircle : null,
              item.completed ? styles.completedStepCircle : null,
            ]}></View>
        ))}
      </View>
      <View style={styles.stepsContainer}>
        <Navigator>
          <Group
            screenOptions={{
              presentation: 'modal',
              headerShown: false,
              animation: 'slide_from_right',
              animationTypeForReplace: 'push',
            }}>
            <Screen
              name="Disclaimer"
              component={Disclaimer}
              listeners={{
                focus: () => {
                  setStepCircles([
                    {active: false, completed: false, step: 1},
                    {active: false, completed: false, step: 2},
                    {active: false, completed: false, step: 3},
                    {active: false, completed: false, step: 4},
                  ]);
                },
              }}
            />
            <Screen
              name="Login Information"
              component={StepOne}
              listeners={{
                focus: () => {
                  setStepCircles([
                    {active: true, completed: false, step: 1},
                    {active: false, completed: false, step: 2},
                    {active: false, completed: false, step: 3},
                    {active: false, completed: false, step: 4},
                  ]);
                },
              }}
            />
            <Screen
              name="Personal Details"
              component={StepTwo}
              listeners={{
                focus: () => {
                  setStepCircles([
                    {active: false, completed: true, step: 1},
                    {active: true, completed: false, step: 2},
                    {active: false, completed: false, step: 3},
                    {active: false, completed: false, step: 4},
                  ]);
                },
              }}
            />
            <Screen
              name="Additional Details"
              component={StepThree}
              listeners={{
                focus: () => {
                  setStepCircles([
                    {active: false, completed: true, step: 1},
                    {active: false, completed: true, step: 2},
                    {active: true, completed: false, step: 3},
                    {active: false, completed: false, step: 4},
                  ]);
                },
              }}
            />
            <Screen
              name="Medical Information"
              component={StepFour}
              listeners={{
                focus: () => {
                  setStepCircles([
                    {active: false, completed: true, step: 1},
                    {active: false, completed: true, step: 2},
                    {active: false, completed: true, step: 3},
                    {active: true, completed: false, step: 4},
                  ]);
                },
              }}
            />
          </Group>
        </Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorTheme.background,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsContainer: {
    backgroundColor: ColorTheme.background,
    width: '100%',
    height: 500,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    borderRadius: 100,
    backgroundColor: ColorTheme.primary,
    marginTop: 30,
  },
  stepsProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  stepCircle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginHorizontal: 5,
    backgroundColor: ColorTheme.primary,
  },
  activeStepCircle: {
    backgroundColor: ColorTheme.warning,
  },
  completedStepCircle: {
    backgroundColor: ColorTheme.success,
  },
});

export default Signup;
