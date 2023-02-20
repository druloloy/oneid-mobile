import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import React from 'react';
import theme from '../theme.config';
import dateFormat from '../utils/dateFormat';
const {ColorTheme, FontFamily} = theme;
const ConditionBox = ({data, showConditions}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{data.condition}</Text>
        <Text style={styles.cardSubtitle}>
          last updated {dateFormat(data.latestUpdate)}
        </Text>
      </View>
      <TouchableHighlight style={styles.cardButton} onPress={showConditions}>
        <Text style={styles.cardButtonText}>View</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ConditionBox;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: ColorTheme.primary,
    marginBottom: 10,
    borderRadius: 10,
    borderRightWidth: 5,
    borderRightColor: ColorTheme.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetails: {
    flex: 3,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  cardTitle: {
    color: ColorTheme.accent,
    fontFamily: FontFamily.black,
    fontSize: 24,
  },
  cardSubtitle: {
    color: ColorTheme.accent,
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
  cardButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: ColorTheme.accent,
    paddingHorizontal: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginVertical: 5,
    marginStart: 5,
  },
  cardButtonText: {
    color: ColorTheme.secondary,
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
});
