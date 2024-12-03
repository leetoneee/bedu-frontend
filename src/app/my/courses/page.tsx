import { Breadcrumb, NavHeader, Navigation } from '@/components';
import React from 'react';
import Image from 'next/image';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';

const MyCoursesPage = () => {
  const crumbs: Crumb[] = [
    {
      label: 'Homepage',
      href: '/'
    },
    {
      label: 'My Courses',
      href: '/my/courses'
    }
  ];

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex flex-row gap-4">
        <div className="w-72">
          <Navigation />
        </div>
      </div>
    </main>
  );
};

export default MyCoursesPage;
