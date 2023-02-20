import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Appearance,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput} from '@react-native-material/core';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../../theme.config';
import Validator from '../../services/validator';
import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';
import {StackActions} from 'react-navigation';
import bloodTypesDropDown from '../../datasets/bloodType';
const {ColorTheme, FontFamily} = theme;

const StepFour = ({navigation}) => {
  DropDownPicker.setTheme(
    Appearance.getColorScheme() === 'dark' ? 'LIGHT' : 'DARK',
  );

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState(0);
  const [allergies, setAllergies] = useState('');

  const [bloodTypeOpen, setBloodTypeOpen] = useState(false);
  const [bloodType, setBloodType] = useState(null);
  const [bloodTypeItems, setBloodTypeItems] = useState(bloodTypesDropDown);

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

  const next = () => {
    const [heightFeet, heightInches] =
      height && height.replace('"', '').split("'");
    const heightinCm = height && heightFeet * 30.48 + heightInches * 2.54;

    const allergiesArray = allergies.includes(',')
      ? allergies.split(',').forEach(allergy => allergy.trim())
      : [allergies];

    const validate = Validator.medicalDetailsValidation({
      height,
      weight,
      bloodType,
      allergies: allergiesArray,
    });

    console.log(allergies);

    const passes = validate.passes();
    if (!passes) {
      setHeightError(validate.errors.first('height'));
      setWeightError(validate.errors.first('weight'));
      setBloodTypeError(validate.errors.first('bloodType'));
      setAllergiesError(validate.errors.first('allergies'));
      return;
    }

    UserService.addMedicalDetails({
      height: heightinCm,
      weight,
      bloodGroup: bloodType,
      allergies: allergiesArray,
    })
      .then(() => {
        navigation.replace('Signup', {
          redirectTo: 'Main',
        });
      })
      .catch(err => {
        console.log(err);
        let message = '';
        if (err.response.status === 401) {
          message = 'Maglog in ulit';
        } else if (err.response.status === 500) {
          message = 'May problema sa server, subukan ulit.';
        } else {
          message = 'May problema, subukan ulit.';
        }

        setTimeout(() => {
          Alert.alert('Error', message, [
            {
              text: 'OK',
              onPress: () => {
                Promise.all([
                  TokenService.removeLocalUser(),
                  TokenService.removeLocalSession(),
                  UserService.logout(),
                ]).finally(() => {
                  navigation.replace('Signup', {
                    redirectTo: 'Login',
                  });
                });
              },
            },
          ]);
        }, 1000);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Impormasyong Pangkalusugan</Text>
      <ScrollView style={styles.scrollView}>
        {/* start form */}
        <View style={styles.form}>
          {/* input section */}
          <View style={styles.inputSection}>
            {/* height input*/}
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
            {/* End height input */}
            {/* weight input*/}
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
            {weightError.length > 0 && (
              <Text style={styles.error}>{weightError}</Text>
            )}
            {/* End weight input */}
            {/* allergies input*/}
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
            <Text style={styles.error}>{allergiesError}</Text>
            {/* End allergies input */}
            {/* blood type input*/}
            <Text style={styles.label}>Blood Type*</Text>
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
            {/* End blood type input */}
          </View>
          {/* End input section */}

          {/* start gender section */}

          {/* create account button */}
          <TouchableOpacity style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          {/* End create account button */}
        </View>
      </ScrollView>
      {/* end form */}
    </View>
  );
};

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
    paddingHorizontal: 5,
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
  inputSection: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  unit: {
    fontSize: 18,
    color: ColorTheme.primary,
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
    marginTop: 5,
  },
});
export default StepFour;
