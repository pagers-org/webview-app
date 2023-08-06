import { DRAWER_SCREEN_OPTIONS } from '@/constants';
import NewPostScreen from '@/screens/NewPostScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigator } from '../bottom';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const AuthenticatedDrawerNavigator = () => {
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
        name="NewPost"
        component={NewPostScreen}
        options={{
          title: '글 작성하기',
          headerTitle: 'Real World | 글 작성',
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="border-color" size={24} color={focused ? '#5cb85c' : '#5cb85c'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '내 프로필',
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="person" size={24} color={focused ? '#5cb85c' : '#5cb85c'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthenticatedDrawerNavigator;
