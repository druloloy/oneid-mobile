import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../theme.config';
const {ColorTheme} = theme;
const Inbox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Walang laman.</Text>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: ColorTheme.primary,
  },
});
