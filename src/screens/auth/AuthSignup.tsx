import WebViewContainer from '@/components/WebViewContainer';
import { DEFAULT_TARGET_URL } from '@/constants';

const AuthSignup = () => {
  const Component = WebViewContainer('Signup', `${DEFAULT_TARGET_URL}/user/register`);
  return <Component />;
};

export default AuthSignup;
