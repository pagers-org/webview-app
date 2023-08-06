import { useAuthStore } from '@/hooks/useAuthStore';
import AuthDrawerNavigator from './AuthDrawerNavigator';
import AuthenticatedDrawerNavigator from './AuthenticatedDrawerNavigator';

const DrawerNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  return <>{isAuthenticated ? <AuthenticatedDrawerNavigator /> : <AuthDrawerNavigator />}</>;
};

export default DrawerNavigator;
