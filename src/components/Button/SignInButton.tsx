'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import ButtonSolid from './ButtonSolid';

const SignInButton = () => {
  const { data: session } = useSession();

  if (!(session && session.user)) {
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
