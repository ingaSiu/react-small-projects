import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'Logout':
      return { user: null };
    default:
      return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  cinst[(state, dispatch)] = useReducer(authReducer, {
    user: null,
  });

  console.log('AuthContext state:', state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
