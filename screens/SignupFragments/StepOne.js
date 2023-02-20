import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import QuoteBox from '../../components/QuoteBox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../theme.config';
import Validator from '../../services/validator';
import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';
import {StackActions} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
const {ColorTheme, FontFamily} = theme;

const StepOne = ({navigation}) => {
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const onMobileNumberChange = text => {
    setMobileNumber(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  const onConfirmPasswordChange = text => {
    setConfirmPassword(text);
  };

  const togglePassowrdVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassowrdVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const resetErrors = () => {
    setMobileNumberError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const createAccount = () => {
    resetErrors();
    const validate = Validator.signupValidation({
      mobileNumber,
      password,
      confirmPassword,
    });
    const passes = validate.passes();
    if (!passes) {
      setMobileNumberError(validate.errors.first('mobileNumber'));
      setPasswordError(validate.errors.first('password'));
      setConfirmPasswordError(validate.errors.first('confirmPassword'));
      return;
    }
    setLoading(true);
    UserService.signup(mobileNumber, password)
      .then(async res => {
        if (res.status === 201) {
          // set user data in local storage
          const cookies = res.headers['set-cookie'];

          Promise.all([
            TokenService.setLocalSession(
              TokenService.getFromCookieHeader(cookies, '_sid'),
            ),
            TokenService.setLocalUser(
              TokenService.getFromCookieHeader(cookies, '_uid'),
            ),
          ]).then(() => {
            navigation.reset({
              index: 2,
              routes: [{name: 'Personal Details'}],
            });
          });
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        setMobileNumberError(
          'Posibleng mayroon ka nang account sa app na ito.',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pakitandaan ang iyong password</Text>
      <ScrollView style={styles.ScrollView}>
        {/* start form */}
        <View style={styles.form}>
          {/* Mobile number input*/}
          <TextInput
            variant="standard"
            label="Numero ng selpon (hal. 9123456789)*"
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            helperText={mobileNumberError}
            value={mobileNumber}
            onChangeText={onMobileNumberChange}
            keyboardType="numeric"
          />
          {/* End mobile number input */}

          {/* Password input */}
          <TextInput
            variant="standard"
            label="Password (8 letra o higit pa)*"
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            helperText={passwordError}
            secureTextEntry={!showPassword}
            trailing={
              showPassword ? (
                <Icon
                  name="eye"
                  size={styles.icon.fontSize}
                  color={ColorTheme.primary}
                  onPress={togglePassowrdVisibility}
                />
              ) : (
                <Icon
                  name="eye-slash"
                  size={styles.icon.fontSize}
                  color={ColorTheme.primary}
                  onPress={togglePassowrdVisibility}
                />
              )
            }
            value={password}
            onChangeText={onPasswordChange}
          />
          {/* End password input */}

          {/* confirm password input */}
          <TextInput
            variant="standard"
            label="I-type muli ang password*"
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            helperText={confirmPasswordError}
            secureTextEntry={!showConfirmPassword}
            trailing={
              showConfirmPassword ? (
                <Icon
                  name="eye"
                  size={styles.icon.fontSize}
                  color={ColorTheme.primary}
                  onPress={toggleConfirmPassowrdVisibility}
                />
              ) : (
                <Icon
                  name="eye-slash"
                  size={styles.icon.fontSize}
                  color={ColorTheme.primary}
                  onPress={toggleConfirmPassowrdVisibility}
                />
              )
            }
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
          />
          <QuoteBox type="info">Pakitandaan ang iyong password</QuoteBox>
          {/* End confirm password input */}

          {/* create account button */}
          <TouchableOpacity style={styles.button} onPress={createAccount}>
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size={24} color={ColorTheme.accent} />
              ) : (
                'Lumikha ng account'
              )}
            </Text>
          </TouchableOpacity>
          {/* End create account button */}
        </View>
        {/* end form */}
      </ScrollView>
    </View>
  );
};

export default StepOne;

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
});
