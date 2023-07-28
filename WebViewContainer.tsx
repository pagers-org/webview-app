import type { ComponentType } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { StackActions, NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

const targetUrl = 'http://localhost:3000';

const WebviewContainer: ComponentType<{
  route: RouteProp<ParamListBase, string> & { params?: Record<string, string> };
  navigation: NavigationProp<ParamListBase>;
}> = ({ navigation, route }) => {
  const url = route.params?.url ?? targetUrl;

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    if (nativeEvent?.type === 'ROUTER_EVENT') {
      const path: string = nativeEvent.path;
      if (path === 'back') {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
      } else {
        const pushAction = StackActions.push('Details', {
          url: path,
          isStack: true,
        });

        navigation.dispatch(pushAction);
      }
    }
  };

  return <WebView originWhitelist={['*']} source={{ uri: url }} onMessage={requestOnMessage} />;
};

export default WebviewContainer;
