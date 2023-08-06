import WebViewContainer from '@/components/WebViewContainer';
import { STACK_SCREEN_OPTIONS } from '@/constants';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

type NewPostStackParamList = {
  EditorNew: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<NewPostStackParamList>();

const NewPostScreen = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <Stack.Navigator initialRouteName="EditorNew" screenOptions={STACK_SCREEN_OPTIONS}>
        <Stack.Screen
          name="EditorNew"
          component={WebViewContainer('EditorNew', 'http://localhost:3000/editor/new')}
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

export default NewPostScreen;
