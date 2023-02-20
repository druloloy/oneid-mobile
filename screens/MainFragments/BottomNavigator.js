import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import theme from '../../theme.config';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {ColorTheme} = theme;

const BottomNavigator = ({items, setItems}) => {
  const handlePress = index => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });

    setItems(newItems);
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => {
            handlePress(index);
            item.navigate();
          }}>
          <Icon
            name={item.icon}
            size={14}
            color={item.active ? ColorTheme.background : ColorTheme.secondary}
          />
          <Text style={item?.active ? styles.textActive : styles.text}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: ColorTheme.primary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  item: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: ColorTheme.secondary,
  },
  textActive: {
    fontSize: 14,
    textAlign: 'center',
    color: ColorTheme.background,
  },
});

export default BottomNavigator;
