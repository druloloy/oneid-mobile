import {StyleSheet, View} from 'react-native';
import {TextInput} from '@react-native-material/core';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Dropbox = ({label, containerStyle, inputStyle}) => {
  const [visible, setVisible] = useState(false);

  const handleFocus = () => {
    setVisible(true);
  };

  return (
    <View style={containerStyle}>
      <TextInput
        label={label}
        style={inputStyle}
        onFocus={handleFocus}
        trailing={<Icon name="menu-down" />}
        trailingContainerStyle={inputStyle}
      />
    </View>
  );
};

export default Dropbox;

const styles = StyleSheet.create({});
