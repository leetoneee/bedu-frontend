'use client';

import { AppContext } from '@/contexts';
import { UserAuth } from '@/types';
import { useState } from 'react';



function AppProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<UserAuth>();

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
