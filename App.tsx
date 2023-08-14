import 'react-native-gesture-handler';
import Navigation from '@/navigation';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, Alert } from 'react-native';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

const PROJECT_ID = Constants.expoConfig?.extra?.eas.projectId ?? '';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

const configurePushNotifications = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (finalStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('권한이 필요해요!', '푸시 알림을 보내기 위한 권한 설정을 허용해주세요.');
    return;
  }

  const pushTokenData = await Notifications.getExpoPushTokenAsync({ projectId: PROJECT_ID });
  console.log(pushTokenData);

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
};

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors },
};

const App = () => {
  useEffect(() => {
    void configurePushNotifications();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Navigation />
      </SafeAreaProvider>
    </PaperProvider>
  );
};
export default App;
