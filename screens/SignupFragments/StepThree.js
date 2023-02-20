import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TextInput} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from 'react-native-radio-buttons-group';

import theme from '../../theme.config';
import {ScrollView} from 'react-native';
import {Pressable} from 'react-native';
import Validator from '../../services/validator';
import UserService from '../../services/UserService';
import streetsDropDown from '../../datasets/streets';
const {ColorTheme, FontFamily} = theme;

const StepThree = ({navigation, route}) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthDatePlaceholder, setBirthDatePlaceholder] = useState('Pumili');
  const [houseNumber, setHouseNumber] = useState('');
  const [barangay, setBarangay] = useState('Central Bicutan');
  const [city, setCity] = useState('Taguig City');

  const [birthDateError, setBirthDateError] = useState('');
  const [sexError, setSexError] = useState('');
  const [houseNumberError, setHouseNumberError] = useState('');
  const [streetError, setStreetError] = useState('');

  const [bdateModalOpen, setBdateModalOpen] = useState(false);
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Lalaki',
      value: 'male',
      color: ColorTheme.primary,
      labelStyle: {
        color: ColorTheme.primary,
      },
    },
    {
      id: '2',
      label: 'Babae',
      value: 'female',
      color: ColorTheme.primary,
      labelStyle: {
        color: ColorTheme.primary,
      },
    },
  ]);

  const [streetsOpen, setStreetsOpen] = useState(false);
  const [street, setStreet] = useState(null);
  const [streetItems, setStreetItems] = useState(streetsDropDown);

  const onHouseNumberChange = text => {
    setHouseNumber(text);
  };

  const getSex = () => {
    // find the selected button
    const selectedButton = radioButtons.find(e => e.selected == true);
    // if found, return the value of that button
    if (selectedButton) {
      return selectedButton.value;
    }
    // otherwise return null
    return '';
  };

  const next = () => {
    const sex = getSex();
    const validate = Validator.personalDetailsValidation({
      birthDate,
      sex,
      houseNumber,
      street,
      barangay,
      city,
    });

    const passes = validate.passes();
    if (!passes) {
      setBirthDateError(validate.errors.first('birthDate'));
      setSexError(validate.errors.first('sex'));
      setHouseNumberError(validate.errors.first('houseNumber'));
      setStreetError(validate.errors.first('street'));
      return;
    }

    if (
      birthDate.getTime() > Date.now() ||
      birthDate.getTime() < new Date(1900, 0, 1).getTime()
    ) {
      setBirthDateError('Hindi maaaring mas malaki ang petsa kaysa sa ngayon.');
      return;
    }

    UserService.addPersonalDetails({
      ...route.params.data,
      birthdate: birthDate,
      sex,
      address: {
        houseNumber,
        street,
        barangay,
        city,
      },
    }).then(res => {
      if (res.status === 201) {
        navigation.replace('Medical Information');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal na Impormasyon</Text>
      <ScrollView style={styles.scrollView}>
        {/* start form */}
        <View style={styles.form}>
          {/* start birthdate section */}
          <Text style={styles.label}>Kapanganakan*</Text>
          <Pressable
            style={styles.pressable}
            onPress={() => setBdateModalOpen(true)}>
            <View style={styles.birthdateContainer} pointerEvents="none">
              <TextInput
                variant="standard"
                label="Petsa ng Kapanganakan"
                style={styles.input}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainer}
                value={birthDatePlaceholder}
                editable={false}
                trailing={
                  <Icon
                    name="calendar-alt"
                    size={24}
                    color={ColorTheme.primary}
                  />
                }
              />
            </View>
          </Pressable>
          <Text style={styles.error}>{birthDateError}</Text>
          {/* start gender section */}
          <Text style={styles.label}>Kasarian*</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={radioButtons => setRadioButtons(radioButtons)}
            layout="row"
            containerStyle={styles.radioGroupStyle}
          />
          <Text style={styles.error}>{sexError}</Text>
          {/* end gender section */}

          {/* start address section */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            variant="standard"
            label="House Number (hal. #16)*"
            style={styles.nameInput}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            value={houseNumber}
            onChangeText={onHouseNumberChange}
          />
          <Text style={styles.error}>{houseNumberError}</Text>
          <Text style={styles.label}>Street*</Text>
          <DropDownPicker
            open={streetsOpen}
            value={street}
            items={streetItems}
            setOpen={setStreetsOpen}
            setValue={setStreet}
            setItems={setStreetItems}
            placeholder="Piliin ang Street"
            dropDownContainerStyle={styles.dropdownContainer}
            containerStyle={styles.dropdownStyle}
            placeholderStyle={styles.dropdownPlaceholder}
            arrowIconStyle={styles.dropdownArrow}
            labelStyle={styles.dropdownInput}
            style={styles.dropdownInput}
            listMode="SCROLLVIEW"
          />
          <Text style={styles.error}>{streetError}</Text>
          {/* end address section */}

          {/* create account button */}
          <TouchableOpacity style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          {/* End create account button */}
        </View>
        {/* end form */}
      </ScrollView>

      {/* start date picker modal */}
      <DatePicker
        modal
        style={styles.datePicker}
        open={bdateModalOpen}
        mode="date"
        maximumDate={new Date()}
        date={birthDate}
        onConfirm={date => {
          setBdateModalOpen(false);
          setBirthDate(date);
          setBirthDatePlaceholder(date.toLocaleDateString());
        }}
        onCancel={() => {
          setBdateModalOpen(false);
        }}
      />
      {/* end date picker modal */}
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  container: {
    border: 0,
    height: '100%',
    width: '100%',
    backgroundColor: ColorTheme.background,
    padding: 10,
  },
  scrollView: {
    backgroundColor: ColorTheme.background,
    height: 100,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
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
    marginVertical: 10,
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
  birthdateContainer: {
    width: '100%',
    fontSize: 18,
    marginVertical: 10,
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
  label: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  radioGroupStyle: {
    alignSelf: 'flex-start',
    color: ColorTheme.primary,
    marginBottom: 10,
  },
  datePicker: {
    background: ColorTheme.accent,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    color: ColorTheme.primary,
  },
  error: {
    color: ColorTheme.error,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  pressable: {
    width: '100%',
  },
  dropdownStyle: {
    marginTop: 10,
    width: '100%',
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: ColorTheme.primary,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 1000,
    color: ColorTheme.primary,
  },
  dropdownPlaceholder: {
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
  },
  dropdownInput: {
    backgroundColor: 'transparent',
    borderColor: ColorTheme.primary,
    color: ColorTheme.primary,
  },
  dropdownArrow: {
    backgroundColor: ColorTheme.primary,
    borderRadius: 100,
    padding: 2,
    color: ColorTheme.accent,
  },
});
