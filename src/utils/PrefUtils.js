import AsyncStorage from '@react-native-community/async-storage';

export default {
  async getBool(key) {
    const value = await AsyncStorage.getItem(key);
    return !value ? false : value.toLowerCase() == 'true';
  },

  async setBool(key, value) {
    await AsyncStorage.setItem(key, `${value}`);
  },

  async getInt(key) {
    const value = await AsyncStorage.getItem(key);
    return !value ? 0 : parseInt(value);
  },

  async setInt(key, value) {
    await AsyncStorage.setItem(key, `${value}`);
  },

  async getFloat(key) {
    const value = await AsyncStorage.getItem(key);
    return !value ? 0.0 : value;
  },

  async setFloat(key, value) {
    await AsyncStorage.setItem(key, `${value}`);
  },

  async getString(key) {
    const value = await AsyncStorage.getItem(key);
    return !value ? '' : value;
  },

  async setString(key, value) {
    await AsyncStorage.setItem(key, `${value}`);
  },
};
