'use client';

import { MyProgramContext } from '@/contexts';
import { useState } from 'react';

function MyProgramProvider({ children }: { children: React.ReactNode }) {
  const [programId, setProgramId] = useState<string>('');
  const [classId, setClassId] = useState<string>('');

  return (
    <MyProgramContext.Provider
      value={{
        programId,
        setProgramId,
        classId,
        setClassId
      }}
    >
      {children}
    </MyProgramContext.Provider>
  );
}

export default MyProgramProvider;
