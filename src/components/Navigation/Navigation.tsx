'use client';

import React, { Fragment } from 'react';
import { NavItems } from './NavItems';
import NavigationItem from './NavigationItem';
import ButtonSolid from '../Button/ButtonSolid';
import { signOut } from 'next-auth/react';
const Navigation = () => {
  const navItems = NavItems();

  return (
    <div className="flex w-72 flex-col rounded-[4px] border border-outline bg-highlight px-4 py-9">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div
          className="h-20 w-20 rounded-full bg-sky-500 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://avatar.iran.liara.run/public/50")'
          }}
        ></div>
        <span className="text-xl font-semibold text-on-surface">Leetone</span>
      </div>
      <span className="my-3 text-2xl font-semibold text-on-surface">
        Navigation
      </span>
      <div className="flex flex-col gap-3">
        {navItems.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <NavigationItem
                active={item.active}
                icon={item.icon}
                label={item.name}
                path={item.href}
              />
            </Fragment>
          );
        })}
      </div>
      {/* <ButtonSolid
        className="mt-20 w-full place-content-center rounded-md bg-on-primary text-white"
        content="Sign out"
        onClick={() => signOut({ callbackUrl: '/' })}
      /> */}
    </div>
  );
};

export default Navigation;
