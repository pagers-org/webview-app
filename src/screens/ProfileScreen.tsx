import WebViewContainer from '@/components/WebViewContainer';
import { STACK_SCREEN_OPTIONS } from '@/constants';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

type MyPageStackParamList = {
  UserSettings: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<MyPageStackParamList>();

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <Stack.Navigator initialRouteName="UserSettings" screenOptions={STACK_SCREEN_OPTIONS}>
        <Stack.Screen
          name="UserSettings"
          component={WebViewContainer('UserSettings', 'http://localhost:3000/user/settings')}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
  button: {
    color: 'white',
    fontSize: 12,
  },
});

export default ProfileScreen;
