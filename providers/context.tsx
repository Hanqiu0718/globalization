'use client';

import { createContext, useContext, useState } from 'react';

type UserContextType = {
    response: string | null;
    mturkId: string;
    setResponse: (value: string | null) => void;
    setMturkId: (value: string) => void;
    sec: number;
    min: number;
    setSec:  (value: number) => void;
    setMin: (value: number) => void;
    setHostFunction: (hostFunc: Function) => void;
    hostFunction: Function;
};
  
  const userContextDefaultValues: UserContextType = {
    response: null,
    mturkId: '',
    setResponse: () => {},
    setMturkId: () => {},
    sec: 0,
    min: 0,
    setSec:  () => {},
    setMin: () => {},
    setHostFunction: () => {},
    hostFunction: () => {},
};

const UserContext = createContext<UserContextType>(userContextDefaultValues);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [response, setResponse] = useState<string | null>(null);
  const [mturkId, setMturkId] = useState('');
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [hostFunction, setHostFunction] = useState<Function>(userContextDefaultValues.hostFunction);

  return (
    <UserContext.Provider value={{ response, setResponse, mturkId, setMturkId, min, setMin, sec, setSec, hostFunction, setHostFunction }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
