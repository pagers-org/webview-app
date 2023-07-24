import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Details from './WebViewContainer';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Details"
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        >
          <Stack.Screen
            options={{
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
            }}
            name="Details"
            component={Details}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Constants.statusBarHeight,
  },
});
