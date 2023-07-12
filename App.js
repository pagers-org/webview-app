import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://github.com/inseong-so' }} />
    </View>
  );
}

function ExploreScreen() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://github.com/explore' }} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://github.com/settings/profile' }} />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
