import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const DrawerNav = createDrawerNavigator();

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>로그인 페이지</Text>
      <Button onPress={() => navigation.navigate('Signup')} title="회원가입을 하시겠어요?" />
    </View>
  );
};
const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>로그인 페이지</Text>
      <Button onPress={() => navigation.navigate('Tab')} title="로그인을 수행합니다." />
    </View>
  );
};
const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>대시보드</Text>
      <Button title="로그아웃" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};
const Setting = () => {
  return (
    <View style={styles.container}>
      <Text>설정 페이지</Text>
    </View>
  );
};
const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>프로필 페이지</Text>
    </View>
  );
};
const Chat = () => {
  return (
    <View style={styles.container}>
      <Text>채팅 페이지</Text>
    </View>
  );
};
const Drawer = () => {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="DashboardMain" options={{ title: '대시보드' }} component={Dashboard} />
      <DrawerNav.Screen name="Profile" options={{ title: '프로필' }} component={Profile} />
      <DrawerNav.Screen name="Chat" options={{ title: '채팅' }} component={Chat} />
    </DrawerNav.Navigator>
  );
};
const Tab = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Dashboard"
        component={Drawer}
        options={{ headerShown: false, title: '대시보드' }}
      />
      <BottomTab.Screen name="Setting" component={Setting} options={{ title: '설정' }} />
    </BottomTab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" options={{ title: '탭' }} component={Tab} />
        <Stack.Screen name="Login" options={{ title: '로그인' }} component={Login} />
        <Stack.Screen name="Signup" options={{ title: '회원가입' }} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
