"use client"

import { TypeContext } from '@/contexts';
import React, { useState } from 'react';

const TypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState();
  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  );
};

export default TypeProvider;
