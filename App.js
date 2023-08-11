import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = {
  setData: async (key, data) => {
    await AsyncStorage.setItem(key, data);
  },
  getData: async (key) => {
    const data = await AsyncStorage.getItem(key);
    return data;
  },
  removeData: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};

const App = () => {
  const [user, setUser] = useState('');

  const handleGetUser = async () => {
    const user = await store.getData('user');
    const alertText = `저장된 유저${!user ? '가 없어요.' : '를 가져왔어요.'}`;
    Alert.alert(alertText);
    setUser(user);
  };

  const handleSetUser = async () => {
    const name = '파랑'; // TODO: input으로 바꿔보세요!
    await store.setData('user', name);
    Alert.alert('유저가 설정되었어요!');
    setUser(name);
  };

  const handleRemoveUser = async () => {
    await store.removeData('user');
    Alert.alert('저장된 유저를 삭제했어요.');
    setUser('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>AsyncStorage Usage</Text>
      <Button title="get storage data" onPress={handleGetUser} />
      <Button title="set storage data" onPress={handleSetUser} />
      <Button title="remove storage data" onPress={handleRemoveUser} />
      <Text style={styles.contentText}>userName: {user}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  headline: {
    marginBottom: 100,
    fontSize: 30,
    textAlign: 'center',
  },
  contentText: {
    fontSize: 20,
    marginTop: 100,
    textAlign: 'center',
  },
});
