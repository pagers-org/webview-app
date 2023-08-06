import PostDetail from '@/screens/post/PostDetail';
import DrawerNavigator from '../drawer';
import NotFoundScreen from '@/screens/NotFoundScreen';
import { RootStackParamList } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NativeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={PostDetail} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
