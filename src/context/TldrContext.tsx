'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface TldrContextProps {
  isTldrMode: boolean;
  toggleTldrMode: () => void;
}

const TldrContext = createContext<TldrContextProps>({
  isTldrMode: false,
  toggleTldrMode: () => {},
});

export const TldrProvider = ({ children }: { children: ReactNode }) => {
  const [isTldrMode, setIsTldrMode] = useState<boolean>(false);

  const toggleTldrMode = () => {
    setIsTldrMode((prev) => !prev);
  };

  return (
    <TldrContext.Provider value={{ isTldrMode, toggleTldrMode }}>
      {children}
    </TldrContext.Provider>
  );
};

export const useTldr = () => {
  const context = useContext(TldrContext);
  if (context === undefined) {
    throw new Error('useTldr must be used within a TldrProvider');
  }
  return context;
};
