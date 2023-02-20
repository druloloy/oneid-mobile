import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import theme from '../../theme.config';
const {ColorTheme} = theme;

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={ColorTheme.primary} />
  </View>
);
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: ColorTheme.background,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default Loading;
