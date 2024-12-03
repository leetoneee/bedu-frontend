import { Breadcrumb, Navigation } from '@/components';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';
import React from 'react';
import EditInfo from './edit-info';

const EditInfoPage = () => {
  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'Profile',
      href: '/my/profile'
    },
    {
      label: 'Edit Profile',
      href: '/my/profile/edit'
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
        <EditInfo />
      </div>
    </main>
  );
};

export default EditInfoPage;
