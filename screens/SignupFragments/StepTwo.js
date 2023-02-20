import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import RadioGroup from 'react-native-radio-buttons-group';

import theme from '../../theme.config';
import {ScrollView} from 'react-native';
import {Pressable} from 'react-native';
import Validator from '../../services/validator';
const {ColorTheme, FontFamily} = theme;

const StepTwo = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [suffixError, setSuffixError] = useState('');

  const onFirstNameChange = text => {
    setFirstName(text);
  };

  const onMiddleNameChange = text => {
    setMiddleName(text);
  };

  const onLastNameChange = text => {
    setLastName(text);
  };

  const onSuffixChange = text => {
    setSuffix(text);
  };

  // const getSex = () => {
  //   // find the selected button
  //   const selectedButton = radioButtons.find(e => e.selected == true);
  //   // if found, return the value of that button
  //   if (selectedButton) {
  //     return selectedButton.value;
  //   }
  //   // otherwise return null
  //   return null;
  // };

  const next = () => {
    const validate = Validator.nameValidation({
      firstName,
      middleName,
      lastName,
      suffix,
    });
    const passes = validate.passes();
    if (!passes) {
      setFirstNameError(validate.errors.first('firstName'));
      setMiddleNameError(validate.errors.first('middleName'));
      setLastNameError(validate.errors.first('lastName'));
      setSuffixError(validate.errors.first('suffix'));
      return;
    }

    navigation.navigate('Additional Details', {
      data: {
        firstName,
        middleName,
        lastName,
        suffix,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal na Impormasyon</Text>
      <ScrollView style={styles.scrollView}>
        {/* start form */}
        <View style={styles.form}>
          {/* name section */}
          {/* first name input*/}
          <TextInput
            variant="standard"
            label="Unang Pangalan (hal. Juan)*"
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            onChangeText={onFirstNameChange}
            value={firstName}
          />
          <Text style={styles.error}>{firstNameError}</Text>
          {/* End first name input */}
          {/* middle name input*/}
          <TextInput
            variant="standard"
            label="Gitnang Pangalan (hal. Dimaano)"
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            onChangeText={onMiddleNameChange}
            value={middleName}
          />
          <Text style={styles.error}>{middleNameError}</Text>
          {/* End middle name input */}
          {/* last name input*/}
          <TextInput
            variant="standard"
            label="Apelyido (hal. Dela Cruz)*"
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            onChangeText={onLastNameChange}
            value={lastName}
          />
          <Text style={styles.error}>{lastNameError}</Text>
          {/* End last name input */}
          {/* suffix input*/}
          <TextInput
            variant="standard"
            label="Suffix (hal. Jr., Sr., III)"
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            onChangeText={onSuffixChange}
            value={suffix}
          />
          <Text style={styles.error}>{suffixError}</Text>
          {/* End suffix input */}
          {/* End name section */}
          {/* next button */}
          <TouchableOpacity style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          {/* End next button */}
        </View>
        {/* end form */}
      </ScrollView>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorTheme.background,
    height: '100%',
    padding: 20,
  },
  scrollView: {
    backgroundColor: ColorTheme.background,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
    paddingVertical: 5,
  },
  form: {
    width: '100%',
    marginTop: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 18,
    color: ColorTheme.primary,
  },
  input: {
    marginVertical: 0,
  },
  inputContainer: {
    width: '100%',
    fontSize: 18,
    color: ColorTheme.primary,
    alignSelf: 'flex-start',
  },
  inputStyle: {
    fontSize: 20,
    color: ColorTheme.primary,
  },
  button: {
    width: '100%',
    backgroundColor: ColorTheme.primary,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: ColorTheme.accent,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: FontFamily.bold,
  },
  cancel: {},
  label: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
    marginTop: 10,
    marginBottom: 5,
  },
  error: {
    color: ColorTheme.error,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});
