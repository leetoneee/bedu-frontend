'use client';

import React, { Fragment } from 'react';
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
import { NavItems } from './NavItems';
import { useRouter } from 'next/navigation';
import { classNames } from '../classNames';

const NavHeader = () => {
  const { data: session } = useSession();
  const navItems = NavItems();
  console.log("🚀 ~ NavHeader ~ navItems:", navItems)
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between bg-primary px-4 drop-shadow md:px-6">
      <div className="flex min-w-max flex-row items-center">
        <Image src="../icons/logo.svg" alt="logo" width={100} height={100} />
        <span className="text-2xl font-bold text-on-primary">BEDU</span>
      </div>
      <div className="flex h-full w-full flex-row place-content-center place-items-center gap-5">
        {navItems.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <span
                className={classNames(
                  'text-xl font-medium',
                  item.active ? 'text-on-primary' : 'hover:cursor-pointer hover:underline text-on-surface'
                )}
                onClick={() => router.replace(item.href)}
              >
                {item.name}
              </span>
            </Fragment>
          );  
        })}
      </div>
      {session && session.user ? (
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-semibold">{session.user?.firstName}</span>
            <span className="capitalize">{session.user.email}</span>
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

export default NavHeader;