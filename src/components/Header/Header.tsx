'use client';

import React from 'react';
import Image from 'next/image';
import SignInButton from '../Button/SignInButton';
import { signOut, useSession } from 'next-auth/react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import SignUpButton from '../Button/SignUpButton';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="flex h-16 shrink-0 items-center justify-between bg-b-primary px-4 drop-shadow md:px-6">
      <div className="flex min-w-max flex-row items-center">
        <Image src="../icons/logo.svg" alt="logo" width={100} height={100} />
        <span className="text-2xl font-bold text-on-primary">BEDU</span>
      </div>
      {/* <div className='flex flex-row bg-slate-400 h-full w-full'>

      </div> */}
      {session && session.user ? (
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-semibold">{session.user?.firstName}</span>
            <span className="capitalize">{session.user.role}</span>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://avatar.iran.liara.run/public/50")'
                }}
              ></div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="myprofile"
                onClick={() => router.replace('/my/profile')}
              >
                My profile
              </DropdownItem>
              <DropdownItem
                key="signout"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <SignInButton />
          <SignUpButton />
        </div>
      )}
    </header>
  );
};

export default Header;
