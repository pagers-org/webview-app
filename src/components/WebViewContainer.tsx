import { DEFAULT_TARGET_URL, WEBVIEW_MESSAGE_TYPE } from '@/constants';
import { useAuthStore } from '@/hooks/useAuthStore';
import type { NativeEventParams, WebViewRoute } from '@/types';
import { ActivityIndicator, type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';

type WebViewContainerProps = {
  style?: StyleProp<ViewStyle>;
};

const WebViewContainer =
  (key: string, baseURI = DEFAULT_TARGET_URL) =>
  ({ style }: WebViewContainerProps) => {
    const { authenticate, logout, isAuthenticated } = useAuthStore();
    const route = useRoute<WebViewRoute>();
    const navigation = useNavigation();

    const url = route.params?.url ?? baseURI;

    const checkAuth = (token: string | null) => {
      if (token && !isAuthenticated) {
        authenticate(token);
        return;
      }

      if (!token && isAuthenticated) {
        logout();
        return;
      }
    };

    const requestOnMessage = async (event: WebViewMessageEvent): Promise<void> => {
      const nativeEvent = JSON.parse(event.nativeEvent.data) as NativeEventParams;

      if (nativeEvent.type === WEBVIEW_MESSAGE_TYPE.USER_AUTH) {
        checkAuth(nativeEvent.token);
      }

      if (nativeEvent.type === WEBVIEW_MESSAGE_TYPE.ROUTER_REFRESH) {
        // @ts-ignore
        navigation.navigate(key);
        return;
      }

      if (nativeEvent.type === WEBVIEW_MESSAGE_TYPE.ROUTER_BACK) {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
        return;
      }

      if (nativeEvent.type === WEBVIEW_MESSAGE_TYPE.ROUTER_EVENT) {
        const { path, screenName } = nativeEvent;
        if (screenName.length > 0) {
          const pathname = path.replace(`${DEFAULT_TARGET_URL}/`, '');
          // @ts-ignore
          navigation.navigate(screenName, { pathname });
          return;
        }

        if (key === 'Login' || key === 'Signup') {
          navigation.reset({ index: 0, routes: [{ name: 'Drawer' }] });
          return;
        }

        const pushAction = StackActions.push(key, { url: path, isStack: true });
        navigation.dispatch(pushAction);
        return;
      }

      if (nativeEvent.type === WEBVIEW_MESSAGE_TYPE.PUSH_NOTIFICATION) {
        const { to, title, body, data } = nativeEvent;
        console.log(to, title, body, data);
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to,
            title,
            body,
            data,
          }),
        });
      }
    };

    return (
      <WebView
        style={style}
        originWhitelist={['*']}
        source={{ uri: url }}
        onMessage={requestOnMessage}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator color="black" size="large" style={styles.flexContainer} />
        )}
      />
    );
  };

export default WebViewContainer;

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
