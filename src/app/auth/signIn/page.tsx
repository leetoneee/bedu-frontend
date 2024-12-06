'use client';

import { classNames } from '@/components';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { Divider } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const onSubmit = async () => {
    const result = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false
    });
    router.replace('/manager/self-study-program');
    console.log('🚀 ~ onSubmit ~ result:', result);
  };

  return (
    <div className="absolute top-0 flex h-full w-full items-center justify-center bg-b-primary">
      <div className="container flex max-w-[540px] flex-col gap-3 rounded-[20px] border border-outline bg-b-secondary px-11 py-5 sm:w-96 sm:px-6">
        <span className="text-3xl font-bold text-outline-focus">Sign in</span>
        <Divider />
        <div className="flex flex-col gap-7">
          <div className="flex w-full flex-col gap-2">
            <span className="text-xl font-semibold text-black">
              Username<span className="text-danger">*</span>
            </span>
            <div className="relative">
              <input
                type="text"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                  !username ? 'pl-14' : ''
                )}
                placeholder="leetone"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {!username && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                  <UserIcon className="size-6 text-black/35" />
                </span>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <span className="text-blacl text-xl font-semibold">Password</span>
            <div className="relative">
              <input
                type="password"
                className={classNames(
                  'h-16 w-full rounded-[10px] border border-outline bg-b-primary p-5 text-2xl sm:h-12 sm:text-xl',
                  !password ? 'pl-14' : ''
                )}
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!password && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl text-outline sm:text-xl">
                  <LockClosedIcon className="size-6 text-black/35" />
                </span>
              )}
            </div>
          </div>
          <button
            className="h-16 w-full rounded-md bg-button-si sm:h-12"
            onClick={onSubmit}
          >
            <span className="text-2xl font-medium text-outline-focus">
              Sign in
            </span>
          </button>
        </div>
        <span className="hover:cursor-pointer hover:underline">
          Forgot password?
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
