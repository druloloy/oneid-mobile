import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../theme.config';
import {Appearance} from 'react-native';
import bloodTypesDropDown from '../datasets/bloodType';
import {TextInput} from '@react-native-material/core';
import {TouchableOpacity, ScrollView, Alert} from 'react-native';
import Validator from '../services/validator';
import UserService from '../services/UserService';
const {ColorTheme, FontFamily} = theme;

const UpdateProfileModal = ({setUpdateProfileModal, user, setUser}) => {
  DropDownPicker.setTheme(
    Appearance.getColorScheme() === 'dark' ? 'LIGHT' : 'DARK',
  );
  const [bloodTypeOpen, setBloodTypeOpen] = useState(false);
  const [bloodType, setBloodType] = useState(null);
  const [bloodTypeItems, setBloodTypeItems] = useState(bloodTypesDropDown);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');

  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [allergiesError, setAllergiesError] = useState('');
  const [bloodTypeError, setBloodTypeError] = useState('');

  const onHeightChange = text => {
    setHeight(text);
  };

  const onWeightChange = text => {
    setWeight(text);
  };

  const onAllergiesChange = text => {
    setAllergies(text);
  };

  const cmToFeet = cm => {
    let feet = Math.floor(cm / 30.48);
    let inches = Math.floor((cm - feet * 30.48) / 2.54);
    return `${feet}'${inches}`;
  };

  useEffect(() => {
    setHeight(cmToFeet(user?.height));
    setWeight(String(user?.weight));
    setAllergies(user.allergies ? user.allergies.join(', ') : '');
    setBloodType(user?.bloodGroup);
  }, [user]);

  const save = async () => {
    const [heightFeet, heightInches] =
      height && height.replace('"', '').split("'");
    const heightinCm = height && heightFeet * 30.48 + heightInches * 2.54;

    const allergiesArray = allergies.includes(',')
      ? allergies.split(',').map(allergy => allergy.trim())
      : [allergies];

    const validate = Validator.medicalDetailsValidation({
      height,
      weight,
      bloodType,
      allergies: allergiesArray,
    });

    const passes = validate.passes();
    if (!passes) {
      setHeightError(validate.errors.first('height'));
      setWeightError(validate.errors.first('weight'));
      setBloodTypeError(validate.errors.first('bloodType'));
      setAllergiesError(validate.errors.first('allergies'));
      return;
    }

    const data = {
      height: heightinCm,
      weight,
      bloodGroup: bloodType,
      allergies: allergiesArray,
    };

    await UserService.updateMedicalDetails(data)
      .then(res => {
        console.log(res.data);
        setUser(a => ({
          ...a,
          height: heightinCm,
          weight,
          bloodGroup: bloodType,
          allergies: allergiesArray,
        }));
        setUpdateProfileModal(false);
        Alert.alert('Success', 'Profile updated successfully');
      })
      .catch(err => {
        Alert.alert('Error', 'Profile update failed');
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contents}>
        <View style={styles.header}>
          <Text style={styles.bannerText}>Update Profile</Text>
          <Icon
            name="close-thick"
            size={30}
            color={ColorTheme.primary}
            onPress={() => setUpdateProfileModal(false)}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.section.title}>Height</Text>
            <TextInput
              variant="standard"
              label="Height (hal. 5'7 4'11)"
              style={styles.input}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainer}
              value={height}
              onChangeText={onHeightChange}
            />
            {heightError.length > 0 && (
              <Text style={styles.error}>{heightError}</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.section.title}>Weight</Text>
            <TextInput
              variant="standard"
              keyboardType="numeric"
              label="Weight in kg (hal. 50, 60)"
              style={styles.input}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainer}
              trailing={<Text style={styles.unit}>kg</Text>}
              value={weight}
              onChangeText={onWeightChange}
            />
            {heightError.length > 0 && (
              <Text style={styles.error}>{weightError}</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.section.title}>Blood Type</Text>
            <DropDownPicker
              open={bloodTypeOpen}
              value={bloodType}
              items={bloodTypeItems}
              setOpen={setBloodTypeOpen}
              setValue={setBloodType}
              setItems={setBloodTypeItems}
              placeholder="Piliin ang Blood Type"
              dropDownContainerStyle={styles.dropdownContainer}
              containerStyle={styles.dropdownStyle}
              placeholderStyle={styles.dropdownPlaceholder}
              arrowIconStyle={styles.dropdownArrow}
              labelStyle={styles.dropdownInput}
              style={styles.dropdownInput}
              listMode="SCROLLVIEW"
            />
            {bloodTypeError.length > 0 && (
              <Text style={styles.error}>{bloodTypeError}</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.section.title}>Allergies</Text>
            <TextInput
              variant="standard"
              label="Allergies"
              style={styles.input}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainer}
              value={allergies}
              helperText="Ipagpalagay ang mga allergies gamit ang comma (,) hal. Milk, Eggs"
              onChangeText={onAllergiesChange}
            />
            {allergiesError.length !== 0 && (
              <Text style={styles.error}>{allergiesError}</Text>
            )}
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={save}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfileModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contents: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorTheme.background,
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    color: ColorTheme.primary,
    fontFamily: FontFamily.bold,
    fontSize: 25,
    textAlign: 'center',
  },
  body: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },

  section: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 20,

    title: {
      color: ColorTheme.secondary,
      fontFamily: FontFamily.bold,
      fontSize: 20,
      textAlign: 'center',
    },
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
  input: {
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    fontSize: 18,
    color: ColorTheme.primary,
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
  unit: {
    fontSize: 18,
    color: ColorTheme.primary,
  },
  error: {
    color: ColorTheme.error,
    fontSize: 14,
    marginTop: 5,
  },
});
