'use client';

import { createContext, useContext, useState } from 'react';

type UserContextType = {
  response: string | null;
  mturkId: string;
  index: number;
  setResponse: (value: string) => void;
  setMturkId: (value: string) => void;
  setIndex: (value: number) => void;
};

const userContextDefaultValues: UserContextType = {
  response: null,
  mturkId: '',
  index: 0,
  setResponse: () => { },
  setMturkId: () => { },
  setIndex: () => { },
};

const UserContext = createContext<UserContextType>(userContextDefaultValues);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [mturkId, setMturkId] = useState('');
  const [index, setIndex] = useState<number>(0);

  return (
    <UserContext.Provider value={{ response, setResponse, mturkId, setMturkId, index, setIndex }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
