import { PropsWithChildren, createContext, useState } from 'react';

const UserContext = createContext({});

const UserProvider = ({ children }: PropsWithChildren) => {
  return <UserContext.Provider value={}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
