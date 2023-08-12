import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';

const projectId = Constants.expoConfig.extra.eas.projectId;
const TARGET_APP_PROJECT_ID = '';

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
  const [userInfo, setUserInfo] = useState({ name: '', type: '' });

  useEffect(() => {
    const configurePushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowAnnouncements: true,
        },
      });
      let finalStatus = status;
      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('주의!', '권한이 필요합니다.');
        return;
      }

      // 여러 기기에 푸시 알림을 전송하도록 요청을 보낼 수 있는 서버
      // 이 앱을 실행하는 기기의 푸시 토큰을 반환
      const pushTokenData = await Notifications.getExpoPushTokenAsync({ projectId });
      console.log(pushTokenData);

      if (Platform.OS === 'android') {
        // 알림 채널 설정
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('알림이 도착했어요!');
      const { userName, type } = notification.request.content.data;
      setUserInfo({ name: userName, type });
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('알림을 터치했어요!');
      const { userName, type } = response.notification.request.content.data;
      Alert.alert(`도착한 유저 정보:\n${type} - ${userName}`);
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
        data: { userName: targetUserName, type: '로컬 알림' },
      },
      trigger: {
        seconds: 2,
      },
    });
  };

  const sendPushNotificationHandler = (targetUserName) => () => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: TARGET_APP_PROJECT_ID,
        title: '푸시 알림 타이틀이에요.',
        body: `푸시 알림에 들어갈 내용이에요, ${targetUserName}님.`,
        data: { userName: targetUserName, type: '푸시 알림' },
      }),
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headlineContainer}>
        <Text style={styles.subHeadline}>{userInfo.type.length > 0 && userInfo.type}</Text>
        <Text style={styles.headline}>
          {userInfo.name.length > 0 ? userInfo.name : '유저 이름을 터치해주세요.'}
        </Text>
      </View>
      <View>
        <Text style={styles.contentText}>로컬 알림</Text>
        <Button title="유저 이름: 파랑" onPress={scheduleNotificationHandler('파랑')} />
        <Button title="유저 이름: 29CM" onPress={scheduleNotificationHandler('29CM')} />
      </View>
      <View>
        <Text style={styles.contentText}>푸시 알림</Text>
        <Button title="유저 이름: 파랑" onPress={sendPushNotificationHandler('파랑')} />
        <Button title="유저 이름: 29CM" onPress={sendPushNotificationHandler('29CM')} />
      </View>
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
  headlineContainer: {
    marginBottom: 30,
  },
  subHeadline: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
  },
  contentText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
