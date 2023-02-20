import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import theme from '../theme.config';
import {Flex, Spacer} from '@react-native-material/core';
const {ColorTheme, FontFamily} = theme;

const typeColor = {
  success: ColorTheme.success,
  error: ColorTheme.error,
  warning: ColorTheme.warning,
  info: ColorTheme.info,
  default: ColorTheme.primary,
};
const typeIcon = {
  success: 'check-circle',
  error: 'times-circle',
  warning: 'exclamation-circle',
  info: 'info-circle',
  default: 'info-circle',
};
const QuoteBox = ({children, type = 'default'}) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: ColorTheme.accent + '0d', // hex 0d is 5% opacity
      padding: 10,
      margin: 5,
      borderRadius: 5,
      borderLeftWidth: 5,
      borderLeftColor: typeColor[type],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    text: {
      color: ColorTheme[type],
      fontFamily: FontFamily.bold,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Icon name={typeIcon[type]} size={25} color={typeColor[type]} />
      {/* add default style to children */}
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

QuoteBox.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'default']),
  children: PropTypes.node.isRequired,
};
export default QuoteBox;
