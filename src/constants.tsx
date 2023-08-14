import { type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { type DrawerNavigationOptions, DrawerToggleButton } from '@react-navigation/drawer';
import { type StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';

export const APP_KEY_PREFIX = 'RW_APP_';

export const WEBVIEW_MESSAGE_TYPE = {
  USER_AUTH: 'USER_AUTH',
  ROUTER_EVENT: 'ROUTER_EVENT',
  ROUTER_REFRESH: 'ROUTER_REFRESH',
  ROUTER_BACK: 'ROUTER_BACK',
  PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
} as const;

export const DEFAULT_TARGET_URL = 'http://192.168.0.9:3000';

export const BOTTOM_TAB_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#5cb85c',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  tabBarInactiveTintColor: 'white',
  tabBarActiveTintColor: 'black',
  tabBarStyle: {
    backgroundColor: '#5cb85c',
    borderTopColor: 'transparent',
  },
};

export const DRAWER_SCREEN_OPTIONS: DrawerNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#5cb85c',
  },
  drawerPosition: 'right',
  headerLeft: () => null,
  headerRight: () => <DrawerToggleButton tintColor="#5cb85c" />,
  drawerInactiveTintColor: '#5cb85c',
  drawerActiveTintColor: '#5cb85c',
  drawerActiveBackgroundColor: '#d8ffd8',
};

export const STACK_SCREEN_OPTIONS: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'spring',
      config: {
        stiffness: 2000,
        damping: 1000,
      },
    },
    close: {
      animation: 'spring',
      config: {
        stiffness: 1000,
        damping: 500,
      },
    },
  },
};
