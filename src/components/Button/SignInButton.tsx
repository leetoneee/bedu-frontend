'use client';

import { signIn, useSession } from 'next-auth/react';
import React, { useContext } from 'react';
import ButtonSolid from './ButtonSolid';
import { AuthType, UserAuth } from '@/types';
import { AppContext } from '@/contexts';


const SignInButton = () => {
  const { auth } = useContext(
    AppContext
  ) as AuthType;
  
  if (!(auth)) {
    return (
      <ButtonSolid
        className="ml-auto w-24 rounded-md bg-[#295782] text-white place-content-center"
        content="Sign in"
        onClick={() => signIn()}
      />
    );
  }
};

export default SignInButton;
