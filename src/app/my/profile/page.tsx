import { Breadcrumb, NavHeader, Navigation } from '@/components';
import React from 'react';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';
import Profile from './profile';

const ProfilePage = () => {
  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'Profile',
      href: '/my/profile'
    }
  ];

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-row gap-4">
        <div className="w-72">
          <Navigation />
        </div>
        <Profile />
      </div>
    </main>
  );
};

export default ProfilePage;
