'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

const Denied = () => {
  return (
    <div className="absolute top-0 h-screen w-screen place-content-center place-items-center">
      <div>
        <span className="text-2xl font-bold">401 </span>
        <span className="text-2xl">
          | UNAUTHORIZED, please{' '}
          <span
            className="text-2xl text-on-primary hover:cursor-pointer hover:underline"
            onClick={() => signIn()}
          >
            sign in
          </span>{' '}
          to continue or visit{' '}
          <a
            className="text-2xl text-on-primary hover:cursor-pointer hover:underline"
            href="/"
          >
            homepage
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default Denied;
