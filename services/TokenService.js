import * as Keychain from 'react-native-keychain';

const setLocalSession = async session => {
  await Keychain.setGenericPassword('_s', session, {
    service: 'session',
    storage: Keychain.STORAGE_TYPE.AES,
  });
};

const getLocalSession = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: 'session',
    storage: Keychain.STORAGE_TYPE.AES,
  });
  return credentials.password;
};

const setLocalUser = async userId => {
  // encrypt with aes
  await Keychain.setGenericPassword('_u', userId, {
    service: 'user',
    storage: Keychain.STORAGE_TYPE.AES,
  });
};

const getLocalUser = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: 'user',
    storage: Keychain.STORAGE_TYPE.AES,
  });
  return credentials.password;
};

const getFromCookieHeader = (header, key) => {
  const regex = new RegExp(`${key}=([^;]+)`);
  const match = header[0].match(regex);
  return match[1];
};

const removeLocalUser = async () => {
  await Keychain.resetGenericPassword({
    service: 'user',
    storage: Keychain.STORAGE_TYPE.AES,
  });
};

const removeLocalSession = async () => {
  await Keychain.resetGenericPassword({
    service: 'session',
    storage: Keychain.STORAGE_TYPE.AES,
  });
};

export default {
  setLocalSession,
  getLocalSession,
  setLocalUser,
  getLocalUser,
  removeLocalUser,
  removeLocalSession,
  getFromCookieHeader,
};
