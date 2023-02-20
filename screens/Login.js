/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Theme from '../theme.config';
import {TextInput} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UserService from '../services/UserService';
import TokenService from '../services/TokenService';
import {StackActions} from '@react-navigation/native';
import Validator from '../services/validator';
import {ActivityIndicator} from 'react-native';
0;
const {ColorTheme, FontFamily} = Theme;

const Login = ({navigation, route}) => {
  const [sessionId, setSessionId] = useState('');
  const [userId, setUserId] = useState('');

  const [loading, setLoading] = useState(false);

  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Promise.all([
      TokenService.getLocalSession(),
      TokenService.getLocalUser(),
    ]).then(([session, user]) => {
      if (!session || !user) return;

      setSessionId(session);
      setUserId(user);

      if (session && user) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      }
    });
  }, []);

  const onMobileNumberChange = text => {
    setMobileNumber(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  const togglePassowrdVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetErrors = () => {
    setMobileNumberError('');
    setPasswordError('');
  };

  const login = () => {
    setLoading(true);
    const validate = Validator.loginValidation({mobileNumber, password});
    const passes = validate.passes();
    if (!passes) {
      setMobileNumberError(validate.errors.first('mobileNumber'));
      setPasswordError(validate.errors.first('password'));
      setLoading(false);
      return;
    }

    UserService.login(mobileNumber, password)
      .then(async res => {
        // set user data in local storage
        const cookies = res.headers['set-cookie'];
        await TokenService.setLocalSession(
          TokenService.getFromCookieHeader(cookies, '_sid'),
        );
        await TokenService.setLocalUser(
          TokenService.getFromCookieHeader(cookies, '_uid'),
        );
        // navigate to home screen
        resetErrors();
        navigation.dispatch(StackActions.replace('Main'));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 4));
        if (err.response.status >= 400 && err.response.status < 500) {
          setMobileNumberError('Mali ang mobile number o password.');
          setPasswordError('Mali ang mobile number o password.');
        } else if (err.code === 'ERR_NETWORK') {
          Alert.alert('May problema sa koneksyon', 'Subukang muli mamaya.', [
            {text: 'OK'},
          ]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    // Whole page container
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo/oneid_128x128.png')}
        style={styles.logo}
      />
      {/* End logo section */}

      {/* Title */}
      <Text style={styles.title}>OneID Health Card</Text>
      {/* End title section */}

      {/* Subtitle */}
      <Text style={styles.subTitle}>Patient Portal</Text>
      {/* End subtitle section */}

      {/* Login form */}
      <View style={styles.form}>
        {/* Mobile number input*/}
        <TextInput
          variant="standard"
          label="Mobile Number"
          style={styles.input}
          inputStyle={styles.inputStyle}
          helperText={mobileNumberError}
          value={mobileNumber}
          onChangeText={onMobileNumberChange}
          keyboardType="numeric"
        />
        {/* End mobile number input */}

        {/* Password input */}
        <TextInput
          variant="standard"
          label="Password"
          style={styles.input}
          inputStyle={styles.inputStyle}
          helperText={passwordError}
          color={ColorTheme.primary}
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

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={login}>
          {
            // If loading is true, show loading indicator
            loading ? (
              <ActivityIndicator size="small" color={ColorTheme.accent} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )
          }
        </TouchableOpacity>
        {/* End login button */}

        {/* Forgot password section */}
        <Text style={[styles.forgotPassword, styles.textLink]}>
          Nakalimutan ang password?
        </Text>
        {/* End forgot password section */}

        {/* Register link */}
        <View style={styles.register}>
          <Text style={styles.text}>Wala ka pang account?</Text>
          <Text
            style={styles.textLink}
            onPress={() =>
              navigation.navigate('Signup', {
                newUser: true,
              })
            }>
            {' '}
            Mag-rehistro.
          </Text>
        </View>
        {/* End register link section */}
      </View>
      {/* End login form */}
    </View>
    // End whole page container
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontFamily: FontFamily.black,
    color: ColorTheme.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: FontFamily.italic,
    color: ColorTheme.primary,
  },
  form: {
    width: '100%',
    marginTop: 25,
    flex: 1,
    justifyContent: 'flex-start',
    alignitems: 'center',
    textAlign: 'center',
  },
  icon: {
    fontSize: 18,
    color: ColorTheme.primary,
  },
  input: {
    width: '100%',
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    fontSize: 18,
    backgroundColor: ColorTheme.primary,
    color: ColorTheme.primary,
    marginVertical: 10,
    paddingVertical: 5,
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
    marginTop: 10,
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
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: ColorTheme.primary,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  textLink: {
    color: ColorTheme.primary,
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.boldItalic,
    textAlign: 'center',
  },
  forgotPassword: {
    marginVertical: 10,
  },
  logo: {
    resizeMode: 'contain',
  },
});
export default Login;
