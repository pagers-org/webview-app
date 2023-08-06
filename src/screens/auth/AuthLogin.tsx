import WebViewContainer from '@/components/WebViewContainer';
import { DEFAULT_TARGET_URL } from '@/constants';

const AuthLogin = () => {
  const Component = WebViewContainer('Login', `${DEFAULT_TARGET_URL}/user/login`);
  return <Component />;
};

export default AuthLogin;
