import { APP_KEY_PREFIX } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, type Dispatch, type PropsWithChildren, useReducer } from 'react';

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
};

type AuthAction =
  | {
      type: 'SET_AUTH';
      token: string;
    }
  | {
      type: 'REMOVE_AUTH';
    };

const AUTH_KEY = `${APP_KEY_PREFIX}TOKEN`;

export const AuthStateContext = createContext<AuthState>({ token: null, isAuthenticated: false });
export const AuthDispatchContext = createContext<Dispatch<AuthAction> | null>(null);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'SET_AUTH': {
      try {
        void AsyncStorage.setItem(AUTH_KEY, action.token);
      } catch (error) {
        console.log(error);
      }
      return { ...state, token: action.token, isAuthenticated: true };
    }
    case 'REMOVE_AUTH': {
      try {
        void AsyncStorage.removeItem(AUTH_KEY);
      } catch (error) {
        console.log(error);
      }
      return { ...state, token: null, isAuthenticated: false };
    }
    default: {
      throw new Error(`Unhandled action`);
    }
  }
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, { token: null, isAuthenticated: false });
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
