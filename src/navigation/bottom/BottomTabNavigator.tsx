import { BOTTOM_TAB_SCREEN_OPTIONS } from '@/constants';
import SettingsScreen from '@/screens/SettingsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostScreen } from '@/screens/post';
import type { RootTabParamList } from '@/types';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={BOTTOM_TAB_SCREEN_OPTIONS}>
      <BottomTab.Screen
        name="Home"
        component={PostScreen}
        options={{
          title: '메인',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="home" size={24} color={focused ? 'black' : 'white'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '설정',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="settings" size={24} color={focused ? 'black' : 'white'} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
