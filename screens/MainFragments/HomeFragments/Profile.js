import {Modal, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import UserService from '../../../services/UserService';
import {Alert} from 'react-native';
import {Image} from 'react-native';
import {b64_md5} from '../../../hash/md5';
import themeConfig from '../../../theme.config';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import UpdateProfileModal from '../../../components/UpdateProfileModal';

const {ColorTheme, FontFamily} = themeConfig;

const Profile = ({navigation}) => {
  const [imageData, setImageData] = useState(null);
  const [quote, setQuote] = useState('');
  const [user, setUser] = useState({});
  const [imageLoading, setImageLoading] = useState(true);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

  const getDayTime = () => {
    return new Date().getHours() < 12
      ? 'Morning'
      : new Date().getHours() >= 18
      ? 'Evening'
      : 'Afternoon';
  };

  const cmToFeet = cm => {
    let feet = Math.floor(cm / 30.48);
    let inches = Math.floor((cm - feet * 30.48) / 2.54);
    return `${feet}'${inches}`;
  };

  useEffect(() => {
    Promise.all([
      UserService.getPersonalDetails(),
      UserService.getMedicalDetails(),
    ])
      .then(([personalDetails, medicalDetails]) => {
        personalDetails.data.content.middleName =
          personalDetails.data.content.middleName &&
          ' ' + personalDetails.data.content.middleName;
        setUser({
          ...personalDetails.data.content,
          ...medicalDetails.data.content,
        });
      })
      .catch(error => {
        Alert.alert(
          'May problema',
          'May problema sa pagkuha ng impormasyon. Subukan ulit.',
          [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      });
  }, []);

  useEffect(() => {
    const seed = b64_md5(
      `${user.firstName}${user.middleName}${user.lastName}-${user.birthdate}`,
    );

    const uri = `https://avatars.dicebear.com/api/croodles-neutral/${seed}.png?b=${encodeURIComponent(
      ColorTheme.accent,
    )}`;

    const fetchImage = async () => {
      await axios
        .get(uri, {
          responseType: 'arraybuffer',
          headers: {
            'Cache-Control': 'max-age=31536000', // 1 year
          },
        })
        .then(response => {
          const base64 = response.request._response;
          setImageData(`data:image/svg;base64,${base64}`);
        })
        .finally(() => {
          setImageLoading(false);
        });
    };

    if (user.firstName && user.lastName) {
      fetchImage();
    }
  }, [user]);

  useEffect(() => {
    const fetchQuote = async () => {
      await axios
        .get('https://api.quotable.io/random?tags=life', {
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          setQuote(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{quote.content}</Text>
          <Text style={styles.bannerAuthor}>{quote.author}</Text>
        </View>
        <View style={styles.imageContainer}>
          {imageData ? (
            <Image
              style={styles.image}
              source={{
                uri: imageData,
                cache: 'reload',
              }}
            />
          ) : (
            <ActivityIndicator size="small" color={ColorTheme.primary} />
          )}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.hello}>👋 Good {getDayTime()}, </Text>
          <Text style={styles.name}>
            {user.firstName}
            {user.middleName} {user.lastName} {user.suffix}
          </Text>
        </View>
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setUpdateProfileModal(true)}>
            <Text style={styles.editButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.section.title}>Address</Text>
          <View>
            <Text style={styles.section.text}>
              {user.address?.houseNumber}, {user.address?.street},{' '}
              {user.address?.barangay}, {user.address?.city}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.section.title}>Medical</Text>
          <View style={styles.section.row}>
            <Text style={styles.section.subtitle}>Height</Text>
            <Text style={styles.section.text}>{cmToFeet(user.height)}</Text>
          </View>
          <View style={styles.section.row}>
            <Text style={styles.section.subtitle}>Weight</Text>
            <Text style={styles.section.text}>{user.weight} kg</Text>
          </View>
          <View style={styles.section.row}>
            <Text style={styles.section.subtitle}>Blood Type</Text>
            <Text style={styles.section.text}>{user.bloodGroup}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.section.title}>Allergies</Text>
          {user.allergies && user.allergies.length > 0 ? (
            <View style={styles.section.row}>
              <Text style={styles.section.text}>
                {user.allergies.join(', ')}
              </Text>
            </View>
          ) : (
            <View style={styles.section.row}>
              <Text style={styles.section.text}>Walang allergy</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        useNativeDriver={true}
        transparent={true}
        visible={updateProfileModal}
        onRequestClose={() => {
          setUpdateProfileModal(false);
        }}>
        <UpdateProfileModal
          user={user}
          setUser={setUser}
          setUpdateProfileModal={setUpdateProfileModal}
        />
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  banner: {
    height: 200,
    width: '100%',
    backgroundColor: ColorTheme.primary,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    padding: 20,
  },
  bannerText: {
    color: ColorTheme.accent,
    fontFamily: FontFamily.italic,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  bannerAuthor: {
    color: ColorTheme.accent,
    fontFamily: FontFamily.italic,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    width: 96,
    height: 96,
    borderRadius: 100,
    borderColor: ColorTheme.secondary,
    borderWidth: 5,
    backgroundColor: ColorTheme.secondary,
    overflow: 'hidden',
    alignSelf: 'center',
    elevation: 5,
    marginTop: -48,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 100,
  },
  nameContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  hello: {
    color: ColorTheme.secondary,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  name: {
    fontFamily: FontFamily.black,
    fontSize: 24,
    color: ColorTheme.secondary,
    textAlign: 'center',
  },
  editButtonsContainer: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  accentButton: {
    backgroundColor: ColorTheme.background,
  },
  accentText: {
    color: ColorTheme.primary,
  },
  editButton: {
    flex: 1,
    backgroundColor: ColorTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 20,
    padding: 10,
    alignSelf: 'center',
    elevation: 5,
    marginHorizontal: 5,
  },
  editButtonText: {
    color: ColorTheme.accent,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
  section: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    marginTop: 20,

    title: {
      color: ColorTheme.secondary,
      fontFamily: FontFamily.bold,
      fontSize: 18,
    },
    text: {
      color: ColorTheme.secondary,
      fontFamily: FontFamily.regular,
      fontSize: 16,
    },
    subtitle: {
      color: ColorTheme.secondary,
      fontFamily: FontFamily.regular,
      fontSize: 16,
      margin: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: ColorTheme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      marginTop: 5,
      padding: 10,
      alignSelf: 'center',
      elevation: 5,
      marginHorizontal: 5,
    },
    buttonText: {
      color: ColorTheme.accent,
      fontFamily: FontFamily.bold,
      fontSize: 16,
    },
  },
});
