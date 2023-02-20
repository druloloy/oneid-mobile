import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import theme from '../../theme.config';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {ColorTheme, FontFamily} = theme;

const Disclaimer = ({navigation}) => {
  const next = () => {
    navigation.navigate('Login Information');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maaring basahing mabuti bago magpatuloy</Text>

      {/* data privacy */}
      <Text style={styles.text}>
        Ang mga impormasyon na ibinigay sa amin ay magiging pribado at
        siguradong hindi ito ibabahagi sa ibang tao.
      </Text>
      <Text style={styles.text}>
        Ang app na ito ay para lamang sa mga tao na nakatira sa Central Bicutan,
        Taguig City.
      </Text>

      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>
          Ako ay sumasang-ayon sa mga nabanggit na kondisyon.
        </Text>
        <Icon name="arrow-right" size={20} color={ColorTheme.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    border: 0,
    height: '100%',
    width: '100%',
    backgroundColor: ColorTheme.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: FontFamily.regular,
    color: ColorTheme.primary,
    marginVertical: 5,
  },
  button: {
    width: '100%',
    backgroundColor: ColorTheme.accent,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FontFamily.black,
    color: ColorTheme.primary,
  },
});

export default Disclaimer;
