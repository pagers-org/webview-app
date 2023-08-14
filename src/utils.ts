import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataToAsyncStorage = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('error = ', e);
  }
};

export const getAsyncStorageData = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ?? '';
  } catch (e) {
    console.log('error = ', e);
    return '';
  }
};
