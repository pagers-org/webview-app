import { AuthStateContext, AuthDispatchContext } from '@/AuthContext';
import { useContext, useMemo } from 'react';

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState는 반드시 AuthProvider에서 사용해주세요.');
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error('useAuthDispatch는 반드시 AuthProvider에서 사용해주세요.');
  }
  return context;
};

export const useAuthStore = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  return useMemo(
    () => ({
      isAuthenticated: state.isAuthenticated,
      authenticate: (token: string) => {
        dispatch({ type: 'SET_AUTH', token });
      },
      logout: () => {
        dispatch({ type: 'REMOVE_AUTH' });
      },
    }),
    [state, dispatch],
  );
};
