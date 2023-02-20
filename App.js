import React from 'react';
import {Provider, defaultTheme} from '@react-native-material/core';
import {NavigationContainer} from '@react-navigation/native';

import theme from './theme.config';
import StackNavigator from './routes/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
const {ColorTheme} = theme;

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Provider
        theme={{
          ...defaultTheme,
          palette: {
            ...defaultTheme.palette,
            primary: {
              main: ColorTheme.primary,
              on: ColorTheme.accent,
            },
            secondary: {
              main: ColorTheme.secondary,
              on: ColorTheme.accent,
            },
            surface: {
              main: ColorTheme.primary,
              on: ColorTheme.secondary + '80',
            },
          },
        }}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
