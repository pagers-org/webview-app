import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, View, Alert } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('알림이 도착했어요!');
      const userName = notification.request.content.data.userName;
      setUserName(userName);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('알림을 터치했어요!');
      const userName = response.notification.request.content.data.userName;
      Alert.alert(`도착한 유저 이름: ${userName}`);
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  const scheduleNotificationHandler = (targetUserName) => () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: '로컬 알림 타이틀이에요.',
        body: '로컬 알림에 들어갈 내용이에요.',
        data: { userName: targetUserName },
      },
      trigger: {
        seconds: 2,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="유저 이름: 파랑" onPress={scheduleNotificationHandler('파랑')} />
      <Button title="유저 이름: 29CM" onPress={scheduleNotificationHandler('29CM')} />
      <StatusBar style="auto" />
      <Text style={styles.headline}>{userName.length > 0 ? userName : '유저 이름을 터치해주세요'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 20,
  }
});
