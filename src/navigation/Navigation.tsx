import { NativeStackNavigator } from './stack';
import { AuthContextProvider } from '@/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <NativeStackNavigator />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default Navigation;
