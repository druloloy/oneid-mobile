import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserService from '../../../services/UserService';
import {Image} from 'react-native';
import {ActivityIndicator} from 'react-native';

import theme from '../../../theme.config';
import {Alert} from 'react-native';
const {ColorTheme} = theme;

const MyId = ({navigation}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    UserService.getId()
      .then(res => {
        setImageSrc(res.data.content);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'Maaaring may problem sa koneksyon sa aming server. Subukang muli mamaya.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <View style={styles.container}>
      {!loading ? (
        <Image
          source={{
            uri: `data:image/png;base64, ${imageSrc}`,
            cache: 'reload',
          }}
          style={styles.image}
        />
      ) : (
        <ActivityIndicator size="large" color={ColorTheme.primary} />
      )}
    </View>
  );
};

export default MyId;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    elevation: 2,
    borderRadius: 10,
  },
});
