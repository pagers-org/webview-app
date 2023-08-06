import { DRAWER_SCREEN_OPTIONS } from '@/constants';
import { AuthLogin, AuthSignup } from '@/screens/auth';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigator } from '../bottom';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const AuthDrawerNavigator = () => {
  return (
    <Drawer.Navigator backBehavior="history" screenOptions={DRAWER_SCREEN_OPTIONS}>
      <Drawer.Screen
        name="Post"
        component={BottomTabNavigator}
        options={{
          title: '글 목록',
          headerTitle: 'Real World | 글 목록',
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="view-list" size={24} color={focused ? '#5cb85c' : '#5cb85c'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={AuthLogin}
        options={{
          title: '로그인',
          headerTitle: 'Real World | 로그인',
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="login" size={24} color={focused ? '#5cb85c' : '#5cb85c'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Signup"
        component={AuthSignup}
        options={{
          title: '회원가입',
          headerTitle: 'Real World | 회원가입',
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="person-add" size={24} color={focused ? '#5cb85c' : '#5cb85c'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthDrawerNavigator;
