/* eslint-disable prettier/prettier */
import {StackActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TokenService from '../services/TokenService';
import UserService from '../services/UserService';
import Loading from './loading/Loading';
import theme from '../theme.config';
import {Alert} from 'react-native';
import HomeNavigator from '../routes/HomeNavigator';
const {ColorTheme, FontFamily} = theme;

const Main = ({navigation, router}) => {
  const [sessionId, setSessionId] = useState('');
  const [userId, setUserId] = useState('');
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isAccountComplete, setIsAccountComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setIsSessionValid(false);
      setLoading(true);
      const session = await TokenService.getLocalSession();
      const user = await TokenService.getLocalUser();

      if (!session || !user) {
        setLoading(false);
        navigation.dispatch(StackActions.replace('Login'));
        return;
      }
      setSessionId(session);
      setUserId(user);
      UserService.getLoginInfo()
        .then(res => {
          if (res.status === 200) {
            setIsSessionValid(true);
            setIsAccountComplete(res.data.content.accountCompleted);
          }
        })
        .catch(err => {
          if (!err.response?.data?.authorized) {
            TokenService.removeLocalSession();
            TokenService.removeLocalUser();
            setIsSessionValid(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getSession();
  }, []);

  useEffect(() => {
    if (!loading && !isSessionValid && userId && sessionId) {
      Alert.alert('Session Expired', 'Please login again', [
        {
          text: 'OK',
          onPress: () => {
            logout();
            navigation.dispatch(StackActions.replace('Login'));
          },
        },
      ]);
    }
  }, [loading, isSessionValid]);

  // for no account complete
  useEffect(() => {
    if (!isAccountComplete && isSessionValid && loading) {
      let hasProfile = false;
      let hasMedical = false;

      Promise.all([
        UserService.getPersonalDetails(),
        UserService.getMedicalDetails(),
      ]).then(res => {
        let redirect = '';

        if (res[0].status === 200 && res[0].data.content) {
          hasProfile = true;
        }
        if (res[1].status === 200 && res[1].data.content) {
          hasMedical = true;
        }
        if (!hasProfile) {
          redirect = 'Personal Details';
        } else if (!hasMedical) {
          redirect = 'Medical Information';
        } else {
          return;
        }

        setTimeout(() => {
          Alert.alert(
            'May kulang ka pa!',
            'Magpatuloy sa pag-setup ng iyong account.',
            [
              {
                text: 'Logout',
                onPress: () => {
                  logout();
                  navigation.dispatch(StackActions.replace('Login'));
                },
              },
              {
                text: 'Okay',
                onPress: () => {
                  navigation.dispatch(
                    StackActions.replace('Signup', {
                      redirectTo: redirect,
                    }),
                  );
                },
              },
            ],
          );
        }, 1000);
      });
    }
  }, [isAccountComplete, isSessionValid]);

  const logout = () => {
    setLoading(true);

    UserService.logout();
    TokenService.removeLocalSession();
    TokenService.removeLocalUser();

    navigation.dispatch(StackActions.replace('Login'));

    setLoading(false);
  };

  const toId = () => {
    navigation.push('MyId');
  };

  return (
    <View style={styles.container}>
      {loading ? <Loading /> : <HomeNavigator logout={logout} toId={toId} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.background,
  },
  text: {
    fontSize: 20,
    color: 'pink',
  },
  button: {
    width: '50%',
    backgroundColor: '#252525',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});
export default Main;
