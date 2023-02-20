/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// disable console.log in production
if (!__DEV__) {
  console.disableYellowBox = true;
}

AppRegistry.registerComponent(appName, () => App);
