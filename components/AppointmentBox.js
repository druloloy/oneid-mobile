import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../theme.config';
import {dateFormatUnspecified} from '../utils/dateFormat';
const {ColorTheme, FontFamily} = theme;

const AppointmentBox = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.container.title}>
        {data ? dateFormatUnspecified(data.nextConsultation) : ''}
      </Text>
      <Text style={styles.container.subtitle}>
        {data ? data.condition : ''}
      </Text>
    </View>
  );
};

export default AppointmentBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    borderLeftColor: ColorTheme.primary,
    borderLeftWidth: 5,
    marginVertical: 10,

    title: {
      fontSize: 36,
      fontFamily: FontFamily.bold,
      color: ColorTheme.warning,
    },
    subtitle: {
      fontSize: 18,
      fontFamily: FontFamily.regular,
      color: ColorTheme.secondary,
    },
  },
});
