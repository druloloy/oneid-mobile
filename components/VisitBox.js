import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../theme.config';
import {dateFormatUnspecified} from '../utils/dateFormat';
import interval from '../utils/interval';
const {ColorTheme, FontFamily} = theme;

const VisitBox = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.container.title}>{data ? data.purpose : ''}</Text>
      <Text style={styles.container.subtitle}>
        {data ? dateFormatUnspecified(data.createdAt) : ''}
      </Text>
      <Text style={styles.container.subtitle}>
        Wait Time: {data ? interval(data.timeServiced, data.timeStarted) : ''}
      </Text>
      <Text style={styles.container.subtitle}>
        Sevice Time: {data ? interval(data.timeEnded, data.timeServiced) : ''}
      </Text>
    </View>
  );
};

export default VisitBox;

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
      color: ColorTheme.primary,
    },
  },
});
