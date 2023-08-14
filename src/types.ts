/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { RouteProp } from '@react-navigation/native';
import type { ParamListBase, NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Drawer: NavigatorScreenParams<RootTabParamList> | undefined;
  Detail: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type CommonScreenProps = StackScreenProps<ParamListBase, string> & {
  params?: Record<string, string>;
};

export type WebViewRoute = RouteProp<ParamListBase, string> & { params?: Record<string, string> };

export type NativeEventParams =
  | {
      type: 'USER_AUTH';
      token: string | null;
    }
  | {
      type: 'ROUTER_EVENT';
      path: string;
      screenName: string;
      data: Record<string, unknown>;
    }
  | {
      type: 'ROUTER_REFRESH' | 'ROUTER_BACK';
    }
  | {
      type: 'PUSH_NOTIFICATION';
      to: string;
      title: string;
      body: string;
      data: Record<string, unknown>;
    };
