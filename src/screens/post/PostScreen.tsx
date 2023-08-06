import { STACK_SCREEN_OPTIONS } from '@/constants';
import PostList from '@/screens/post/PostList';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

type PostStackParamList = {
  List: undefined;
  Detail: {
    slug: string;
  };
};

const Stack = createStackNavigator<PostStackParamList>();

const PostScreen = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{ ...STACK_SCREEN_OPTIONS, headerShown: false }}
      >
        <Stack.Screen name="List" component={PostList} />
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

export default PostScreen;
